// Import necessary modules from the '@whiskeysockets/baileys' library
// - MessageType: Used to identify the type of message (e.g., text, image, etc.)
// - generateWAMessageFromContent: Used to generate a WhatsApp message from content
import MessageType from '@whiskeysockets/baileys';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

// Define an asynchronous handler function for the command
// - m: The message object containing details about the incoming message
// - conn: The connection object used to interact with the WhatsApp API
// - text: The text provided after the command
// - participants: An array of participants in the group
let handler = async (m, { conn, text, participants }) => {
  // Extract user IDs from the participants array and decode them using conn.decodeJid
  let users = participants.map(u => conn.decodeJid(u.id));

  // Check if the message is a quoted message or a regular message
  // - q: The quoted message (if any)
  // - c: The content of the quoted message or the original message
  let q = m.quoted ? m.quoted : m;
  let c = m.quoted ? m.quoted : m.msg;

  // Generate a modified WhatsApp message using generateWAMessageFromContent
  // - m.chat: The chat ID where the message will be sent
  // - Content of the message: If the message is JSON-serializable, use its JSON representation; otherwise, use the text content
  // - Options: Include the quoted message and the bot's user ID
  const msg = conn.cMod(
    m.chat,
    generateWAMessageFromContent(
      m.chat,
      {
        [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? c.toJSON() : {
          text: c || '', // Use the text content if available
        },
      },
      {
        quoted: m, // Include the quoted message
        userJid: conn.user.id, // Include the bot's user ID
      }
    ),
    text || q.text, // Use the provided text or the quoted message's text
    conn.user.jid, // The bot's user ID
    { mentions: users } // Mention all participants in the group
  );

  // Relay the modified message to the group
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

// Define help, tags, and command information for the handler
handler.help = ['hidetag']; // Help text for the command
handler.tags = ['group']; // Tags to categorize the command
handler.command = ['hidetag', 'hdtag']; // The command name (users can trigger this with !hidetag or /hidetag)

// Set handler properties
handler.group = true; // Restrict the command to group chats only
handler.admin = true; // Restrict the command to group admins only

// Export the handler as the default export of this module
export default handler;