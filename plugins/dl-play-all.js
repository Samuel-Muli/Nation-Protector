/* import {fbdown, igdl, ttdl, twitter } from "btch-downloader";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Simulate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Enter the title or link!\nExample: *${usedPrefix + command} https://example.com/video*`);

  switch (command) {
    case 'fb':
      await handleFacebook(m, conn, text);
      break;

    case 'ig':
      await handleInstagram(m, conn, text);
      break;

    case 'tt':
      await handleTikTok(m, conn, text);
      break;

    case 'x':
      await handleTwitter(m, conn, text);
      break;

    default:
      m.reply("❌ Unsupported command.");
  }
};

// Helper function to download and save file
const downloadFile = async (url, filename) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download file: ${response.statusText}`);

  const tempDir = path.resolve(__dirname, "../tmp");
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  const tempPath = path.join(tempDir, filename);
  const fileStream = fs.createWriteStream(tempPath);

  return new Promise((resolve, reject) => {
    response.body.pipe(fileStream);
    response.body.on("error", reject);
    fileStream.on("finish", () => resolve(tempPath));
  });
};

// YouTube Handler //keep this just incase the btch-downlader API wakes up
const handleYoutube = async (m, conn, text) => {
  await m.reply("🔄 Searching for the video...");
  try {
    const search = await ytSearch(text);
    const video = search.videos[0];

    if (!video) return m.reply("❌ No results found! Please try again with a different query.");
    if (video.seconds >= 3600) return m.reply("❌ Video duration exceeds 1 hour. Please choose a shorter video!");

    let videoData = await youtube(video.url);

    const filePath = await downloadFile(videoData.mp4, `${video.id}.mp4`);
    await conn.sendMessage(
      m.chat,
      {
        video: { url: filePath },
        caption: `🎥 *Title*: ${video.title}\n👀 *Views*: ${video.views}\n📅 *Published*: ${video.ago}\n🔗 [Watch on YouTube](${video.url})`,
      },
      { quoted: m }
    );

    // Clean up the file after sending
    fs.unlinkSync(filePath);
  } catch (error) {
    m.reply(`❌ Error: ${error.message}`);
  }
};

// Facebook Handler
const handleFacebook = async (m, conn, text) => {
  await m.reply("🔄 Fetching Facebook video...");
  try {
    const videoData = await fbdown(text);
    const filePath = await downloadFile(videoData.HD, `facebook_video.mp4`);

    await conn.sendMessage(
      m.chat,
      {
        video: { url: filePath },
        caption: `📹 Facebook Video`,
      },
      { quoted: m }
    );

    fs.unlinkSync(filePath);
  } catch (error) {
    m.reply(`❌ Error: ${error.message}`);
  }
};

// Add similar functions for Instagram, TikTok, and Twitter


// Instagram Handler
const handleInstagram = async (m, conn, url) => {
  await m.reply("🔄 Fetching Instagram content...");
  try {
    let data = await igdl(url);

    if (!data[0]?.url) throw "❌ Failed to fetch Instagram content.";

    const filePath = await downloadFile(data[0].url, "instagram_video.mp4");
    await conn.sendMessage(
      m.chat,
      {
        video: fs.readFileSync(filePath),
        caption: `📷 *Instagram Content*\n🔗 [Original Post](${url})`,
      },
      { quoted: m }
    );

    fs.unlinkSync(filePath);
  } catch (error) {
    m.reply(`❌ Error: ${error.message}`);
  }
};

// TikTok Handler
const handleTikTok = async (m, conn, url) => {
  await m.reply("🔄 Fetching TikTok video...");
  try {
    let data = await ttdl(url);

    if (!data.video[0]) throw "❌ Failed to fetch TikTok video.";

    const filePath = await downloadFile(data.video[0], "tiktok_video.mp4");
    await conn.sendMessage(
      m.chat,
      {
        video: fs.readFileSync(filePath),
        caption: `🎥 *Title*: ${data.title}\n🎭 *Creator*: ${data.creator}\n🔗 [Original Post](${url})`,
      },
      { quoted: m }
    );

    fs.unlinkSync(filePath);
  } catch (error) {
    m.reply(`❌ Error: ${error.message}`);
  }
};

// Twitter Handler
const handleTwitter = async (m, conn, url) => {
  await m.reply("🔄 Fetching Twitter video...");
  try {
    let data = await twitter(url);

    if (!data.url[0]?.hd) throw "❌ Failed to fetch Twitter video.";

    const filePath = await downloadFile(data.url[0].hd, "twitter_video.mp4");
    await conn.sendMessage(
      m.chat,
      {
        video: fs.readFileSync(filePath),
        caption: `🐦 *Twitter Post*\n📄 *Description*: ${data.title}\n🔗 [Original Post](${url})`,
      },
      { quoted: m }
    );

    fs.unlinkSync(filePath);
  } catch (error) {
    m.reply(`❌ Error: ${error.message}`);
  }
};

// Command Configurations
handler.help = ["fb", "ig", "tt", "x"];
handler.tags = ["downloader"];
handler.command = /^(ytmp4|fb|ig|tt|x)$/i;

export default handler;
 */