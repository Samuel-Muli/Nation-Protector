import axios from 'axios';

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `🚩 Usage: *${usedPrefix + command} <word>*\n\nExample:\n*${usedPrefix + command} hello*`;

    try {
        // API request to fetch word details
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(text)}`);
        const data = response.data[0]; // Get the first result

        // Extract word details
        const word = data.word;
        const phonetic = data.phonetic || "N/A";
        const origin = data.origin || "No origin information available.";
        const meanings = data.meanings.map(meaning => {
            const definitions = meaning.definitions.map(def => `- ${def.definition}`).join('\n');
            return `\n*${meaning.partOfSpeech}*\n${definitions}`;
        }).join('\n\n');

        // Construct reply message
        const reply = `📖 *Word:* ${word}\n\n` +
                      `🔊 *Phonetic:* ${phonetic}\n\n` +
                      `📜 *Origin:* ${origin}\n\n` +
                      `📚 *Meanings:*\n${meanings}`;

        m.reply(reply);

    } catch (e) {
        console.error(e);
        if (e.response && e.response.status === 404) {
            m.reply("❌ Word not found. Please check your spelling and try again.");
        } else {
            m.reply("❌ An unexpected error occurred. Please try again later.");
        }
    }
};

// Command metadata
handler.command = ['dictionary', 'meaning', 'dict'];
handler.tags = ['tools'];
handler.help = ['dictionary <word>'].map(cmd => `${cmd}`);
handler.limit = false;

export default handler;
