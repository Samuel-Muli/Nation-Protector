import displayLoadingScreen from '../lib/loading.js';
import fetch from 'node-fetch';
import { delay } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
    if (!text) throw `Please specify a query. For example: *${usedPrefix}${command} Zoro*`;

    m.react('🤖'); // React to indicate processing
    await displayLoadingScreen(conn, m.chat); // Display a loading screen while fetching data

    const prompt = encodeURIComponent(text);
    const apiUrl = `https://bk9.fun/ai/you?q=${prompt}`;

    // Fetch the response from the API
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Failed to fetch from API: ${response.statusText}`);

    const data = await response.json();
    if (!data?.status) throw new Error('Invalid response from API.');

    const overview = data.BK9; // Extract the main content from the response

    // Reply with the content
    await typewriterEffect(conn, m, m.chat, overview);

  } catch (error) {
    console.error(error);
    m.reply('Oops! Something went wrong. We are working hard to fix it ASAP.');
  }
};

// Command metadata
handler.help = ['zoro <text>'];
handler.tags = ['AI'];
handler.command = /^(zoro)$/i;

export default handler;

/**
 * Simulates a typewriter effect when sending a message.
 * @param {object} conn - The WhatsApp connection object.
 * @param {object} quoted - The quoted message object.
 * @param {string} from - The chat ID to send the message to.
 * @param {string} text - The text to display in a typewriter effect.
 */
async function typewriterEffect(conn, quoted, from, text) {
  const { key } = await conn.sendMessage(from, { text: 'Thinking...' }, { quoted });

  for (let i = 0; i < text.length; i++) {
    const partialText = text.slice(0, i + 1); // Slice the text up to the current index
    await conn.relayMessage(
      from,
      {
        protocolMessage: {
          key: key,
          type: 14,
          editedMessage: {
            conversation: partialText,
          },
        },
      },
      {}
    );

    await delay(25); // Adjust the delay as needed (in milliseconds)
  }
}
