import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Initialize sessionAI object
    conn.sessionAI = conn.sessionAI || {};

    if (!text) throw `🚩 Usage: *${usedPrefix + command} enable/disable*`;

    if (text.toLowerCase() === "enable") {
        conn.sessionAI[m.sender] = { sessionChat: [] };
        m.reply("✅ ‖⫷※•şɐɱʉ•※⫸‖ session has been successfully enabled!");
    } else if (text.toLowerCase() === "disable") {
        delete conn.sessionAI[m.sender];
        m.reply("❌ ‖⫷※•şɐɱʉ•※⫸‖ session has been successfully disabled!");
    } else {
        throw `🚩 Invalid input! Use *${usedPrefix + command} enable* or *${usedPrefix + command} disable*.`;
    }
};

handler.before = async (m, { conn }) => {
    conn.sessionAI = conn.sessionAI || {};

    // Ignore bot messages, empty messages, or messages with command prefixes
    //if (m.isBaileys && m.fromMe) return;
    if (!m.text) return;
    if (!conn.sessionAI[m.sender]) return;
    if ([".", "#", "!", "/", "\\"].some(prefix => m.text.startsWith(prefix))) return;

    if (conn.sessionAI[m.sender] && m.text) {
        const previousMessages = conn.sessionAI[m.sender].sessionChat || [];

        // Construct conversation history
        const messages = [
            ...previousMessages,
            m.text // Add the user's current message
        ];

        //try {
            // Function to interact with the BK9 Chatbot API
            const chat = async function (text) {
                const response = await axios.get(`https://bk9.fun/ai/chataibot?q=${encodeURIComponent(text)}`);
                return response.data; // The API returns plain text
            };

            // Concatenate conversation history
            let promptText = messages.join('\n');
            let res = await chat(promptText);

            if (res) {
                await m.reply(res);

                // Update session chat with user input and assistant's response
                conn.sessionAI[m.sender].sessionChat = [
                    ...conn.sessionAI[m.sender].sessionChat,
                    m.text,
                    res
                ];
            } else {
                m.reply("⚠️ An error occurred while fetching data from the chatbot.");
            }
        } /* catch (e) {
            console.error(e);
            m.reply("❌ An unexpected error occurred. Please try again later.");
        }
    } */
};

// Command metadata
handler.command = ['autoai'];
handler.tags = ['AI'];
handler.help = ['autoai'].map(cmd => `${cmd} enable/disable`);
handler.limit = true;

export default handler;
