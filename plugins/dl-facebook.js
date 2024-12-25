import fg from 'api-dylux';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `✳️ Please send the link of a Facebook video\n\n📌 EXAMPLE :\n*${usedPrefix + command}* https://www.facebook.com/Ankursajiyaan/videos/981948876160874/?mibextid=rS40aB7S9Ucbxw6v`;
  }

  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  if (!urlRegex.test(args[0])) {
    throw '⚠️ PLEASE GIVE A VALID URL.';
  }

  m.react(rwait);

  try {
    const result = await fg.fbdl(args[0]);
    const tex = `
⊱ ─── {*‖⫷※•şɐɱʉ•※⫸‖*} ─── ⊰
↳ *VIDEO TITLE:* ${result.title}
⊱ ────── {⋆♬⋆} ────── ⊰`;

    const response = await fetch(result.videoUrl);
    const arrayBuffer = await response.arrayBuffer();
    const videoBuffer = Buffer.from(arrayBuffer);

    conn.sendFile(m.chat, videoBuffer, 'fb.mp4', tex, m);
    m.react(done);
  } catch (error) {
    console.log(error);
    m.reply('⚠️ An error occurred while processing the request. Please try again later.');
  }
};

handler.help = ['facebook <url>'];
handler.tags = ['downloader'];
handler.command = /^((facebook|fb)(downloder|dl)?)$/i;
handler.diamond = true;

export default handler;

// backup for facebook download not yet even tested

/* import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

let handler = async (m) => {
  let message = m.quoted ? m.quoted : m;
  let url = (message.text || '').trim();

  if (!url) {
    throw "✳️ Please provide a valid URL.";
  }

  await m.react('⏳');
  try {
    // Fetch the response from the API
    let response = await fetch(`https://bk9.fun/download/alldownload?url=${encodeURIComponent(url)}`);
    let res = await response.json();

    // Validate response success and extract the high-quality URL
    if (!res.status || !res.BK9 || !res.BK9.high) {
      throw "❌ No high-quality download URL found in the API response.";
    }

    let highQualityUrl = res.BK9.high;

    // React with a success emoji
    await m.react('✅');

    // Download the file
    let fileResponse = await fetch(highQualityUrl);
    let buffer = await fileResponse.buffer();

    // Define a temporary file path
    let tempFilePath = path.join(__dirname, 'tempfile');

    // Save the file to disk temporarily
    fs.writeFileSync(tempFilePath, buffer);

    // Send the file to the user
    await conn.sendMessage(
      m.chat,
      {
        document: { url: tempFilePath },
        fileName: res.BK9.title || 'downloaded_file',
      },
      {
        quoted: m,
      }
    );

    // Delete the temporary file after sending
    fs.unlinkSync(tempFilePath);
  } catch (error) {
    await m.react('❌');
    throw error;
  }
};

handler.help = ['fb <url>'];
handler.tags = ['tools'];
handler.command = /^(fbdl|fb|facebook)$/i;

export default handler; */
