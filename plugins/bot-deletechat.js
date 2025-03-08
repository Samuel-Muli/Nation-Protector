/* import { delay } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
    try {
        const jid = m.chat; // Get the chat ID
        const lastMsgInChat = await getLastMessageInChat(jid, conn); // Fetch last message

        if (!lastMsgInChat) {
            return m.reply('⚠ No messages found to delete.');
        }

        // Delete the last message
        await conn.chatModify(
            {
                delete: true,
                lastMessages: [
                    {
                        key: lastMsgInChat.key,
                        messageTimestamp: lastMsgInChat.messageTimestamp
                    }
                ]
            },
            jid
        );

        m.reply('✅ Last message deleted successfully!');
    } catch (err) {
        console.error('❌ Error deleting last message:', err);
        m.reply('❌ Failed to delete last message.');
    }
};

handler.help = ['delmsg'];
handler.tags = ['admin'];
handler.command = ['delmsg', 'deletechat'];

export default handler;

// Function to get the last message in the chat
async function getLastMessageInChat(jid, conn) {
    try {
        const chat = await conn.loadMessages(jid, 5); // Load last 5 messages for safety
        return chat.messages.length ? chat.messages[chat.messages.length - 1] : null;
    } catch (error) {
        console.error(`Error fetching last message for ${jid}:`, error);
        return null;
    }
}
 */