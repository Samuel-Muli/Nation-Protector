import fetch from 'node-fetch';
import displayLoadingScreen from '../lib/loading.js';

const endpoint = 'https://api.giftedtech.my.id/api/ai/gpt4v2?apikey=gifted&q=';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  //try {
    if (!text && !(m.quoted && m.quoted.text)) {
      throw `Please provide some text or quote a message to get a response.`;
    }

    if (!text && m.quoted && m.quoted.text) {
      text = m.quoted.text;
    } else if (text && m.quoted && m.quoted.text) {
      text = `${text} ${m.quoted.text}`;
      if (m.quoted.text.length > 9) {
        text = text.slice(9); // Trim the first 9 characters
      }
    }

    // Display a loading screen
    await displayLoadingScreen(conn, m.chat);
    conn.sendPresenceUpdate('composing', m.chat);

    // Notify the user that the AI is thinking
    //let emsg = await conn.sendMessage(m.chat, { text: 'Thinking...' });

    // Prepare and make the API request
    const prompt = encodeURIComponent(text);
    const response = await fetch(endpoint + prompt);

    // Check if the API response is OK
    if (!response.ok) {
      throw `Received an error response from the server: ${response.status} - ${response.statusText}`;
    }

    // Parse the API response and extract the "result" field
    const data = await response.json();
    const result = data.result; // Extract the "result" field
    m.reply(result);
    m.react(done)
    // Relay the result to the user
    /* await conn.relayMessage(
      m.chat,
      {
        protocolMessage: {
          key: emsg.key,
          type: 14,
          editedMessage: {
            conversation: result, // Send the extracted result
          },
        },
      },
      {}
    ); */
  } /* catch (error) {
    // Log the error and notify the user
    console.error('Error:', error);
    m.reply(`An error occurred while processing your request. Please try again later.`);
  } 
};*/

handler.help = ['aisearch'];
handler.tags = ['AI'];
handler.command = ['aisearch'];

export default handler;
