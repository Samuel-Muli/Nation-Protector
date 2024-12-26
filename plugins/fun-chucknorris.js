import axios from 'axios';

let handler = async (m, { usedPrefix, command }) => {
    try {
        // Fetch a random joke
        const response = await axios.get('https://api.chucknorris.io/jokes/random');
        const data = response.data;

        // Extract the necessary fields
        const updatedAt = data.updated_at;
        const joke = data.value;

        // Construct the reply
        const reply = `🕒 *Updated At:* ${updatedAt}\n\n😂 *Joke:*\n${joke}`;
        m.reply(reply);
    } catch (e) {
        console.error(e);
        m.reply("❌ An error occurred while fetching a Chuck Norris joke. Please try again later.");
    }
};

// Command metadata
handler.command = ['chucknorris', 'norrisjoke', 'norris', 'cnj'];
handler.tags = ['fun'];
handler.help = ['norrisjoke'].map(cmd => `${cmd}`);
handler.limit = false;

export default handler;
