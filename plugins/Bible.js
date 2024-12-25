import axios from 'axios';

let handler = async (m, { usedPrefix, command, text }) => {
    if (!text) throw `🚩 Please specify a verse! Usage:\n\n*${usedPrefix + command} <book chapter:verse>*\n\nExample:\n${usedPrefix + command} John 3:16`;

    try {
        // Fetch the verse from the API
        const response = await axios.get(`https://bible-api.com/${encodeURIComponent(text)}`);
        const data = response.data;

        // Extract the necessary fields
        const reference = data.reference;
        const verseText = data.text.trim();
        const translationName = data.translation_name;

        // Construct the reply
        const reply = `📖 *Reference:* ${reference}\n\n✝️ *Verse:*\n"${verseText}"\n\n📝 *Translation:* ${translationName}`;
        m.reply(reply);
    } catch (e) {
        console.error(e);
        m.reply("❌ An error occurred while fetching the Bible verse. Please ensure the reference is correct (e.g., John 3:16).");
    }
};

// Command metadata
handler.command = ['bibleverse', 'verse', 'inspire', 'bible', 'bv'];
handler.tags = ['religion'];
handler.help = ['bible <book chapter:verse>'].map(cmd => `${cmd}`);
handler.limit = false;

export default handler;
