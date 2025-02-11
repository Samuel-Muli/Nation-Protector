import fetch from 'node-fetch';//working
import { delay } from '@whiskeysockets/baileys';
import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
    // Check if the user provided a description for the image
    if (!text) {
      throw `Please provide a description for the image. For example: *${usedPrefix}${command} a red sports car in the mountains*`;
    }

    // React to indicate the process has started
    m.react('🎨');

    // Encode the user's input to be used in the API URL
    const query = encodeURIComponent(text);
    const apiUrl = `https://bk9.fun/ai/magicstudio?prompt=${query}`;

    // Fetch the image from the API
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from API: ${response.statusText}`);
    }

    // Save the image to a temporary file
    const tempFilePath = path.join(process.cwd(), `temp_${Date.now()}.jpg`);
    const fileStream = fs.createWriteStream(tempFilePath);
    response.body.pipe(fileStream);

    // Wait for the file to finish writing
    await new Promise((resolve, reject) => {
      fileStream.on('finish', resolve);
      fileStream.on('error', reject);
    });

    // Send the downloaded image to the user
    const caption = `🎨 *Generated Image*\n🌟 *Prompt*: ${text}`;
    await conn.sendMessage(
      m.chat,
      {
        image: fs.readFileSync(tempFilePath), // Send the downloaded image
        caption, // Add the caption
      },
      { quoted: m } // Quote the original message
    );

    // Delete the temporary file after sending
    fs.unlinkSync(tempFilePath);

    // React to indicate success
    m.react('✅');
  } catch (error) {
    console.error(error);
    m.react('❌'); // React to indicate failure
    m.reply('Oops! Something went wrong while generating the image. Please try again later.');
  }
};

// Command metadata
handler.help = ['img <description>'];
handler.tags = ['AI'];
handler.command = /^(img)$/i;

export default handler;