// Export an asynchronous function named 'before' that runs before processing a message
// - message: The incoming message object
// - conn: The connection object for interacting with the WhatsApp API
// - isAdmin: Boolean indicating if the sender is an admin
// - isBotAdmin: Boolean indicating if the bot is an admin in the chat
export async function before(message, { conn, isAdmin, isBotAdmin }) {
    // Check if the incoming message is from a status broadcast
    // If not, exit the function early by returning false
    if (message.key.remoteJid !== 'status@broadcast') return false;

    // Initialize the 'story' array if it doesn't already exist
    // This array will store status updates (e.g., audio, video, or text messages)
    this.story = this.story ? this.story : [];

    // Destructure necessary properties from the message and connection
    const { mtype, text, sender } = message; // Extract message type, text, and sender
    const { jid: userJid } = conn.user; // Extract the bot's user ID
    const senderId = message.key.participant.split('@')[0]; // Extract the sender's ID (without the @s.whatsapp.net suffix)
    const chatData = global.db.data.chats[message.chat]; // Access chat-specific data from the global database

    // Handle different types of messages (audio, video, text, etc.)
    if (mtype === 'audioMessage' || mtype === 'videoMessage') {
        // Create a caption for the media message
        const caption = `status from ${senderId}`;
        try {
            // Download the media (audio or video) from the message
            let mediaBuffer = await message.download();
            // Send the downloaded media to the bot's user ID with a caption
            await this.sendFile(userJid, mediaBuffer, '', caption, message, false, { mentions: [message.sender] });
            // Store the media message in the 'story' array for later reference
            this.story.push({ type: mtype, quoted: message, sender: message.sender, caption: caption, buffer: mediaBuffer });
        } catch (error) {
            // Log any errors that occur during media download or sending
            console.log(error);
            // If sending the media fails, send a text reply with the caption instead
            await this.reply(userJid, caption, message, { mentions: [message.sender] });
        }
    } else if (mtype === 'extendedTextMessage') {
        // Handle extended text messages (e.g., messages with additional metadata)
        try {
            // Download the text message (if applicable)
            let textBuffer = await message.download();
            // Send the downloaded text message to the bot's user ID
            await this.sendFile(userJid, textBuffer, '', '', message, false, { mimetype: message.mimetype });
            // Store the text message in the 'story' array for later reference
            this.story.push({ type: mtype, quoted: message, sender: message.sender, buffer: textBuffer });
        } catch (error) {
            // Log any errors that occur during text message download or sending
            console.log(error);
        }
    } else if (mtype === 'textMessage') {
        // Handle plain text messages
        const replyText = text ? text : ''; // Use the message text if available, otherwise use an empty string
        // Send a reply with the text message to the bot's user ID
        await this.reply(userJid, replyText, message, { mentions: [message.sender] });
        // Store the text message in the 'story' array for later reference
        this.story.push({ type: mtype, quoted: message, sender: message.sender, message: replyText });
    }

    // If the chat has specific properties in the database, return true
    // This indicates that the message was processed successfully
    if (chatData) return true;
}