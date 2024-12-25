import fetch from 'node-fetch';

let handler = async (m) => {
  await m.react('⏳');
  try {
    // Fetch random advice from the API
    let response = await fetch(`https://api.giftedtech.my.id/api/fun/advice?apikey=gifted`);
    
    if (!response.ok) {
      throw `❌ Failed to fetch advice. API response: ${response.status} - ${response.statusText}`;
    }

    // Parse the JSON response
    let data = await response.json();

    if (!data.success || !data.result) {
      throw "❌ Unexpected API response format.";
    }

    // Extract the advice
    let advice = data.result;

    // Send the advice to the chat
    await m.react('✅');
    await conn.sendMessage(
      m.chat,
      {
        text: `💡 *Here's a piece of advice for you:*\n\n_${advice}_`,
      },
      { quoted: m }
    );
  } catch (error) {
    await m.react('❌');
    throw `An error occurred: ${error}`;
  }
};

handler.help = ['advice'];
handler.tags = ['fun'];
handler.command = /^(advice)$/i;

export default handler;
