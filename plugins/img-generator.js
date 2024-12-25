import fetch from 'node-fetch';

let handler = async (m) => {
  let message = m.quoted ? m.quoted : m;
  let text = (message.text || '').trim();
    // Step 2: Remove the special character and the following word (command + space)
  text = text.replace(/^[^\w\s]+(\w+)\s*/, '');

  // Step 3: Trim any remaining leading/trailing spaces from the actual message
  text = text.trim();

  /* if (!text) {
    throw "✳️ Please provide a prompt for the AI to generate an image.";
  } */

  // Trim the command portion from the text
  /* let text = rawText.indexOf(' ') >= 0
    ? rawText.slice(rawText.indexOf(' ') + 1).trim() // Remove up to the first space
    : rawText.slice(9).trim(); // Fallback: Remove the first 9 characters */

  if (!text) {
    throw "✳️ The prompt after the command cannot be empty.";
  }

  await m.react('⏳');
  try {
    // Fetch the image directly from the API
    let response = await fetch(`https://api.giftedtech.my.id/api/ai/text2img?apikey=gifted&prompt=${encodeURIComponent(text)}`);

    if (!response.ok) {
      throw `❌ Failed to fetch image. API response: ${response.status} - ${response.statusText}`;
    }

    // Buffer the image from the response
    let imageBuffer = await response.buffer();

    // React with success and send the image
    await m.react('✅');
    await conn.sendMessage(
      m.chat,
      {
        image: imageBuffer,
        caption: `🎨 Generated Image for: "${text}"`,
      },
      { quoted: m }
    );
  } catch (error) {
    await m.react('❌');
    throw `An error occurred: ${error}`;
  }
};

handler.help = ['imggen <prompt for image>'];
handler.tags = ['AI'];
handler.command = /^(text2img|imggen)$/i;

export default handler;
