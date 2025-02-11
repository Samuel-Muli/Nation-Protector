import util from 'util';

const userLastMessageMap = new Map();

export async function all(m, { conn }) {
  const busy = 5 * 60 * 1000; // 5 minutes cooldown
  const currentTime = Date.now();
  const userId = m.sender;

  // Cooldown check
  if (userLastMessageMap.has(userId)) {
    const lastMessageTime = userLastMessageMap.get(userId);
    if (currentTime - lastMessageTime < busy) {
      return;
    }
  }

  // Greetings list (case-insensitive)
  const greetings = new Set([
    'hello', 'hi', 'mambo', 'bro', 'hie', 'hey', 'sam', 
    'muli', 'niaje', 'yoh'
  ]);

  // Normalize message text
  const msgText = m.text?.trim().toLowerCase();

  if (greetings.has(msgText) && !m.isBaileys && !m.isGroup) {
    const welcomeMessage = `*WELCOME*\n*Am ‖⫷※•şɐɱʉ•※⫸‖ personal assistant*\n\nHello 💕🥰\nSaMu may be away, but he will be back soon 😇\nType *${process.env.PREFIX}menu* to enjoy some awesome commands as you wait.`;

    // Send a button message
    const buttons = [
      { buttonId: '/menu', buttonText: { displayText: '📜 Menu' }, type: 1 },
      { buttonId: '/help', buttonText: { displayText: '🆘 Help' }, type: 1 },
      { buttonId: '/alive', buttonText: { displayText: '💡 Alive' }, type: 1 }
    ];

    const buttonMessage = {
      text: welcomeMessage,
      footer: 'Choose an option below:',
      buttons: buttons,
      headerType: 1
    };

    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });

    // React with 💕 emoji
    m.react('💕');

    // Update last message timestamp
    userLastMessageMap.set(userId, currentTime);
  }

  return true;
}