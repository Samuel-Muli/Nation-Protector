import fetch from 'node-fetch';

let handler = async (m) => {
  let message = m.quoted ? m.quoted : m;
  let text = (message.text || '').trim();

  if (!text) {
    throw "✳️ Please provide text for the AI to process.";
  }

  await m.react('⏳');
  try {
    // Fetch the response from the API
    let response = await fetch(`https://bk9.fun/ai/aiimg?q=${encodeURIComponent(text)}`);
    let res = await response.json();

    // React with a success emoji
    await m.react('✅');

    // Extract the images from the response
    let images = res.BK9.aiImageData.map((img) => img.imageHighResolution.url);

    // Limit the number of images to 4 if more are available
    images = images.slice(0, 4);

    // Check if there are any images to send
    if (images.length === 0) {
      throw "❌ No images found in the AI response.";
    }

    // Send the images (up to 4) to the user
    for (let imageUrl of images) {
      await conn.sendMessage(
        m.chat,
        {
          image: { url: imageUrl },
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

handler.help = ['dalle <image prompt>'];
handler.tags = ['AI'];
handler.command = /^(dalle)$/i;

export default handler;
