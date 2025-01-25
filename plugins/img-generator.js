import fetch from 'node-fetch';

let handler = async (m) => {
  let message = m.quoted ? m.quoted : m;
  let text = (message.text || '').trim();

  // Remove any command prefix or special characters
  text = text.replace(/^[^\w\s]+(\w+)\s*/, '').trim();

  if (!text) {
    throw "✳️ Please provide a prompt for the AI to generate an image.";
  }

  await m.react('⏳');
  try {
    // Fetch data from the provided API
    let response = await fetch(`https://bk9.fun/ai/aiimg?q=${encodeURIComponent(text)}`);
    
    if (!response.ok) {
      throw `❌ Failed to fetch images. API response: ${response.status} - ${response.statusText}`;
    }

    // Parse the response as JSON
    let data = await response.json();

    // Check for valid response and images
    if (data?.status !== true || !data.BK9?.aiImageData || data.BK9.aiImageData.length === 0) {
      throw "❌ No images found for the given prompt.";
    }

    // Iterate through the AI-generated images and send them to the chat
    for (let imageData of data.BK9.aiImageData) {
      let imageUrl = imageData.imageHighResolution?.url || imageData.images[0]?.url;

      if (imageUrl) {
        await conn.sendMessage(
          m.chat,
          {
            image: { url: imageUrl },
            caption: `🎨 Generated Image for: "${text}"\nSource: ${data.owner || 'Unknown'}`,
          },
          { quoted: m }
        );
      }
    }

    await m.react('✅');
  } catch (error) {
    await m.react('❌');
    throw `An error occurred: ${error}`;
  }
};

handler.help = ['imggen <prompt for image>'];
handler.tags = ['AI'];
handler.command = /^(text2img|imggen)$/i;

export default handler;
