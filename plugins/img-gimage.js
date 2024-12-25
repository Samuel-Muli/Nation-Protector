import fetch from 'node-fetch';

let handler = async (m) => {
  let message = m.quoted ? m.quoted : m;
  let text = (message.text || '').trim();
    // Step 2: Remove the special character and the following word (command + space)
  text = text.replace(/^[^\w\s]+(\w+)\s*/, '');

  // Step 3: Trim any remaining leading/trailing spaces from the actual message
  text = text.trim();

  if (!text) {
    throw "✳️ Please provide text for the AI to process.";
  }

  await m.react('⏳');
  try {
    // Fetch the response from the API
    let response = await fetch(`https://api.giftedtech.my.id/api/search/googleimage?apikey=gifted&query=${encodeURIComponent(text)}`);
    let res = await response.json();

    // React with a success emoji
    await m.react('✅');

    // Validate response success and extract images
    if (!res.success || !res.results || res.results.length === 0) {
      throw "❌ No images found in the API response.";
    }

    // Shuffle the images and limit to 4
    let images = res.results.sort(() => 0.5 - Math.random()).slice(0, 4);
    //m.reply(text) // set it to help me to debug the text trim 
    // Send the images (up to 4) to the user
    for (let imageUrl of images) {
      await conn.sendMessage(
        m.chat,
        {
          image: { url: imageUrl },
          caption: `googled Image for: "${text}"`,
        },
        {
          quoted: m,
        }
      );
    }
  } catch (error) {
    await m.react('❌');
    throw error;
  }
};

handler.help = ['googleimg <query>'];
handler.tags = ['img'];
handler.command = /^(googleimg|gimg)$/i;

export default handler;
