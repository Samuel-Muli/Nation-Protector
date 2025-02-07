let handler = async (m, { conn }) => {
  // Get user data from the global database (if needed)
  let user = global.db.data.users[m.sender];
  // Get the sender's name
  let name = conn.getName(m.sender);
  // Create a mention tag for the sender
  let taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
  // Randomly select an audio file from the list
  let av = `./Assets/mp3/${pickRandom(['samu', 'samu1', 'samu2'])}.mp3`;

  // Send a button message with a greeting
  await conn.sendMessage(
    m.chat,
    {
      text: `*Hi*      
Good morning or evening, ${taguser}!
You summoned me!! 😇`.trim(),
      mentions: [m.sender], // Mention the sender
      footer: 'Powered by YourBotName', // Optional footer
      buttons: [
        { buttonId: '/owner', buttonText: { displayText: 'OWNER HELP' }, type: 1 },
        { buttonId: '/repo', buttonText: { displayText: 'GET SC' }, type: 1 },
      ],
    },
    { quoted: m }
  );

  // Send the randomly selected audio file
  await conn.sendFile(
    m.chat,
    av, // Path to the audio file
    'audio.mp3', // File name
    null, // Caption (optional)
    m, // Quoted message
    true, // Send as a document (false for audio)
    { ptt: true } // Send as a push-to-talk audio message
  );
};

// Set a custom prefix for the command
handler.customPrefix = /^(bot|Nation)$/i;
// Set the command handler (empty regex to avoid conflicts)
handler.command = new RegExp();

// Export the handler
export default handler;

// Helper function to pick a random item from a list
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}