import fetch from 'node-fetch';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Please provide some text or quote a message to get a response.`;
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    m.react(rwait); 
    
    conn.sendPresenceUpdate('composing', m.chat);
    const prompt = encodeURIComponent(text);

    const guru1 = `https://api.gurusensei.workers.dev/llama?prompt=${prompt}`;

    try {
      let response = await fetch(guru1);
      let data = await response.json();
      let result = data.response.response;

      if (!result) {
        throw new Error('No valid JSON response from the first API');
      }

      
      await conn.sendMessage(m.chat, {
        text: result,
        contextInfo: {
          externalAdReply: {
            title: "Your AI Response",
            body: "Powered by ‖⫷※•şɐɱʉ•※⫸‖",
            thumbnailUrl: "https://telegra.ph/file/087410e10ba5b08083295.jpg",
            sourceUrl: "https://github.com/muli-tech/The-Great",
          }
        }
      }, { quoted: m });

      m.react(done); 
    } catch (error) {
      console.error('Error from the first API:', error);

      const guru2 = `https://ultimetron.guruapi.tech/gpt3?prompt=${prompt}`;

      let response = await fetch(guru2);
      let data = await response.json();
      let result = data.completion;

      
      await conn.sendMessage(m.chat, {
        text: result,
        contextInfo: {
          externalAdReply: {
            title: "Fallback AI Response",
            body: "Powered by ‖⫷※•şɐɱʉ•※⫸‖",
            thumbnailUrl: "https://telegra.ph/file/087410e10ba5b08083295.jpg",
            sourceUrl: "https://github.com/Samuel-Muli/Nation-Protector",
          }
        }
      }, { quoted: m });

      m.react(done); 
    }
  } catch (error) {
    console.error('Error:', error);
    throw `*ERROR*`;
  }
};

handler.help = ['chatgpt'];
handler.tags = ['AI'];
handler.command = ['bro', 'chatgpt', 'ai', 'gpt'];

export default handler;