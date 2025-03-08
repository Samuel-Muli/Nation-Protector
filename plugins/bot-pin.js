import { delay } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  try {
    let messageToPin = m.quoted ? m.quoted : m; // If a quoted message exists, pin that; otherwise, pin the command message
    if (!messageToPin) throw '⚠ Please reply to a message you want to pin.';

    await conn.sendMessage(m.chat, {
      pin: {
        type: 1, // 1 to pin, 0 to unpin
        time: 86400, // Pin duration in seconds (1 day)
        key: messageToPin.key
      }
    });

    m.reply('✅ Message pinned successfully!');
  } catch (e) {
    console.error('❌ Error pinning message:', e);
    m.reply('❌ Failed to pin the message.');
  }
};

handler.help = ['pin'];
handler.tags = ['owner'];
handler.command = ['pin', 'pinmsg'];

export default handler;
