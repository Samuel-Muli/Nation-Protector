/* const userLastMessageMap = new Map();

export async function all(m) {
  const busy = 5 * 60 * 1000;  // If I'm out for more than five minutes, this will cool you down

  const currentTime = Date.now();
  const userId = m.sender;

  if (userLastMessageMap.has(userId)) {
    const lastMessageTime = userLastMessageMap.get(userId);
    if (currentTime - lastMessageTime < busy) {
      return;
    }
  }

  // Greetings list (case-insensitive)
  const greetings = new Set([
    'hello', 'hi', 'mambo', 'bro', 'hie', 'hey', 'sam', 
   'niaje', 'yoh'
  ]);

  if (greetings.includes(m.text) && !m.isBaileys && !m.isGroup) {
    m.reply(
      `*WELCOME*\n *Am ‖⫷※•şɐɱʉ•※⫸‖ personal assistant*\n\n\nHello 💕🥰 \n SaMu may be away, but He will be back soon 😇\n type *${process.env.PREFIX}menu* to enjoy some awesome commands as you wait`
    );
    m.react('💕');
    userLastMessageMap.set(userId, currentTime);
  }

  // Check if the message is "samuel"
  if (m.text.toLowerCase() === 'samuel' && !m.isBaileys && !m.isGroup) {
    const buttonMessage = {
      text: "Hello! I'm Samuel's personal assistant. How can I help you?",
      footer: "Choose an option below:",
      buttons: [
        { buttonId: `${process.env.PREFIX}menu`, buttonText: { displayText: '/menu' }, type: 1 },
        { buttonId: `${process.env.PREFIX}help`, buttonText: { displayText: '/help' }, type: 1 },
        { buttonId: `${process.env.PREFIX}alive`, buttonText: { displayText: '/alive' }, type: 1 },
      ],
      headerType: 1,
    };

    await m.reply(buttonMessage);
    userLastMessageMap.set(userId, currentTime);
  }

  return !0;
} */