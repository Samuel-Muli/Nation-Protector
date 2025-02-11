import ytSearch from "yt-search";
import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`Enter the title or YouTube link!\nExample: *${usedPrefix + command} Faded Alan Walker*`);
  }

  //await m.reply("🔄 Searching for the video...");
  try {
    const search = await ytSearch(text); // Search for the video
    if (!search || !search.videos || search.videos.length === 0) {
      return m.reply("❌ No results found! Please try again with a different query.");
    }

    const video = search.videos[0];
    if (!video) {
      return m.reply("❌ No video found! Please try again.");
    }

    if (video.seconds >= 3600) {
      return m.reply("❌ Video duration exceeds 1 hour. Please choose a shorter video!");
    }

    await m.reply(`🎶 Fetching MP3 for: *${video.title}*...`);

    // Function to fetch MP3     
    
    const fetchMP3FromSecondEndpoint = async (url) => {
      const response = await axios.get(`https://bk9.fun/download/youtube2?url=${url}`);
      if (!response.data || !response.data.BK9 || response.data.BK9.length === 0) {
        throw new Error("Second endpoint failed");
      }
      return response.data.BK9[0].mediaLink;
    };

    // fetch mp3
    let mp3Link = await fetchMP3FromSecondEndpoint(video.url);
   

    if (!mp3Link) {
      return m.reply("⚠️ Failed to retrieve MP3 link.");
    }

    // Send the MP3 file
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: mp3Link },
        mimetype: "audio/mpeg",
        contextInfo: {
          externalAdReply: {
            title: video.title,
            body: "",
            thumbnailUrl: video.image,
            sourceUrl: video.url,
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  } catch (error) {
    m.reply(`❌ Error: ${error.message}`);
  }
};

handler.help = ["play3"];
handler.tags = ["downloader"];
handler.command = /^play3$/i;

export default handler;
