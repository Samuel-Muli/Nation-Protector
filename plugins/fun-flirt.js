import fetch from 'node-fetch';

let handler = async (m) => {
  await m.react('⏳');
  try {
    // Fetch random flirt line from the API
    let response = await fetch(`https://api.giftedtech.my.id/api/fun/flirt?apikey=gifted`);
    
    if (!response.ok) {
      throw `❌ Failed to fetch flirt message. API response: ${response.status} - ${response.statusText}`;
    }

    // Parse the JSON response
    let data = await response.json();

    if (!data.success || !data.result) {
      throw "❌ Unexpected API response format.";
    }

    // Extract the flirt message
    let flirtMessage = data.result;

    // Send the flirt message to the chat
    await m.react('✅');
    await conn.sendMessage(
      m.chat,
      {
        text: `💌 *Here's a sweet line for you:*\n\n_${flirtMessage}_`,
      },
      { quoted: m }
    );
  } catch (error) {
    await m.react('❌');
    throw `An error occurred: ${error}`;
  }
};

handler.help = ['flirt'];
handler.tags = ['fun'];
handler.command = /^(flirt)$/i;

export default handler;