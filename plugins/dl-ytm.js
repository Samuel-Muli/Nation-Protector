import axios from 'axios';
const fetch = (await import('node-fetch')).default;

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) throw '✳️ What do you want me to search for on YouTube?';

  try {
    await m.react('⏳');

    const query = encodeURIComponent(text);
    const response = await axios.get(`https://weeb-api.vercel.app/ytsearch?query=${query}`);
    const results = response.data;

    if (!results || results.length === 0) {
      throw 'No results found for the given query.';
    }

    const firstResult = results[0];

    const forwardMessage = `*✨ ${firstResult.title} ✨*\n───────────────\n🖇️ *Link*: ${firstResult.url}  \n⏱️ *Duration*: ${firstResult.timestamp}  \n📅 *Published*: ${firstResult.ago}  \n👁️ *Views*: ${firstResult.views}  \n     *MADE WITH LOVE*`;

    let musicUrl;
    try {
      const downloadResponse = await axios.get(`https://dark-shan-yt.koyeb.app/download/ytmp3?url=${encodeURIComponent(firstResult.url)}`, { timeout: 10000 });
      const downloadResult = downloadResponse.data;

      if (!downloadResult.status || !downloadResult.data?.download || !downloadResult.data?.title) {
        throw 'Primary API failed';
      }

      musicUrl = downloadResult.data.download;
    } catch (primaryError) {
      const fallbackResponse = await axios.get(`https://api.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(firstResult.url)}`, { timeout: 10000 });
      const fallbackResult = fallbackResponse.data;

      if (!fallbackResult.success || !fallbackResult.result?.download_url) {
        throw 'Both APIs failed to fetch audio.';
      }

      musicUrl = fallbackResult.result.download_url;
    }

    const abrahamResponse = await fetch('https://api.github.com/users/Samuel-Muli');
    const abrahamData = await abrahamResponse.json();
    const abrahamImageUrl = abrahamData.avatar_url || '';

    const combinedMessage = {
      audio: { url: musicUrl },
      mimetype: 'audio/mpeg',
      caption: forwardMessage,
      jpegThumbnail: await fetch(abrahamImageUrl).then(res => res.buffer()),
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          //newsletterJid: '120363230794474148@newsletter',
          newsletterName: global.author,
          serverMessageId: -1,
        },
        externalAdReply: {
          title: "↺ |◁   II   ▷|   ♡",
          body: forwardMessage,
          thumbnailUrl: abrahamImageUrl,
          sourceUrl: 'https://chat.whatsapp.com/FV96nX6l7iCGmBeunOFPa0',
          mediaType: 2,
          mediaUrl: 'https://samuel-muli.onrender.com',
          showAdAttribution: true,
          renderLargerThumbnail: true,
        },
        audioPlaybackContext: {
          musicUrl,
          caption: "Listen to this music!",
        },
      },
    };

    await conn.sendMessage(m.chat, combinedMessage, { quoted: m });
    await m.react('✅');
  } catch (error) {
    await m.react('❌');
    console.error('Error:', error.message || error);
    throw 'An error occurred while processing your request.';
  }
};

handler.help = ['play2 <query>'];
handler.tags = ['downloader'];
handler.command = ['ytm', 'playmusic', 'play2', 'music'];

export default handler;