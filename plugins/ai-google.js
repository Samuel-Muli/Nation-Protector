import fetch from 'node-fetch';
import { delay } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
    if (!text) {
      throw `Please provide a query. For example: *${usedPrefix}${command} Naruto*`;
    }

    m.react('🤖'); // React to indicate processing

    const query = encodeURIComponent(text);
    const apiUrl = `https://bk9.fun/ai/ai-search?q=${query}`;

    // Fetch the response from the API
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch from API: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data?.status || !data.BK9) {
      throw new Error('Invalid response from API.');
    }

    const answer = data.BK9.trim(); // Extract and trim the answer

    // Send the answer with a typewriter effect
    await typewriterEffect(conn, m, m.chat, answer);
  } catch (error) {
    console.error(error);
    m.reply('Oops! Something went wrong. Please try again later.');
  }
};

// Command metadata
handler.help = ['search <query>'];
handler.tags = ['AI'];
handler.command = /^(search|aisearch)$/i;

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
    //const partialText = text.slice(0, i + 1); // Slice the text up to the current index
    const randomIncrement = Math.floor(Math.random() * 20) + 1; // Generate a random increment up to 10
    const partialText = text.slice(0, i + randomIncrement); // Slice the text up to the current index with random increment
    i += randomIncrement - 1; // Adjust the loop index to account for the random increment
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

    await delay(5); // Adjust the delay as needed (in milliseconds)
  }
}
