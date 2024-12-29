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

    await m.reply(`🎥 Fetching the video: *${video.title}*...`);

    // Function to fetch video from the first endpoint
    const fetchFromFirstEndpoint = async (url) => {
      const response = await axios.get(`https://bk9.fun/download/youtube?url=${url}`);
      if (!response.data || !response.data.BK9 || !response.data.BK9.BK8 || response.data.BK9.BK8.length === 0) {
        throw new Error("First endpoint failed");
      }
      return response.data.BK9;
    };

    // Function to fetch video from the second endpoint
    const fetchFromSecondEndpoint = async (url) => {
      const response = await axios.get(`https://bk9.fun/download/youtube2?url=${url}`);
      if (!response.data || !response.data.BK9 || response.data.BK9.length === 0) {
        throw new Error("Second endpoint failed");
      }
      return response.data.BK9[0];
    };

    // Try the first endpoint, fallback to the second if it fails
    let videoData;
    try {
      videoData = await fetchFromFirstEndpoint(video.url);
    } catch (error) {
      videoData = await fetchFromSecondEndpoint(video.url);
    }

    // Select the best video quality
    const bestVideo = videoData.BK8
      ? videoData.BK8.filter((v) => v.quality === "720p" || v.quality === "360p").sort((a, b) => (b.quality === "720p" ? 1 : -1))[0]
      : { quality: "720p", link: videoData.mediaLink };

    if (!bestVideo || !bestVideo.link) {
      return m.reply("⚠️ No suitable video quality found.");
    }

    // Send the video file
    await conn.sendMessage(
      m.chat,
      {
        video: { url: bestVideo.link },
        caption: `🎬 *${videoData.title}*\n📥 Quality: ${bestVideo.quality}`,
      },
      { quoted: m }
    );
  } catch (error) {
    m.reply(`❌ Error: ${error.message}`);
  }
};

handler.help = ["video"];
handler.tags = ["downloader"];
handler.command = /^video$/i;

export default handler;
