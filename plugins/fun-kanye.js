import axios from 'axios';

let handler = async (m, { usedPrefix, command }) => {
    try {
        // Fetch Kanye West quote
        const response = await axios.get('https://api.kanye.rest/');
        const quote = response.data.quote;

        if (quote) {
            // Reply with the quote
            m.reply(`🎤 Kanye says:\n\n"${quote}"`);
        } else {
            m.reply("⚠️ Failed to fetch Kanye's wisdom. Please try again later.");
        }
    } catch (e) {
        console.error(e);
        m.reply("❌ An unexpected error occurred. Please try again later.");
    }
};

// Command metadata
handler.command = ['kanyequote', 'kanye'];
handler.tags = ['fun'];
handler.help = ['kanye'].map(cmd => `${cmd}`);
handler.limit = false;

export default handler;
