import fetch from 'node-fetch';

let handler = async (m, { args }) => {
  // Extract the query from the user's input
  if (!args || args.length === 0) {
    return m.reply("Please provide a song name or lyrics to search for.");
  }

  const query = args.join(" ");
  const apiKey = "gifted";
  const endpoint = `https://api.giftedtech.my.id/api/search/lyrics?apikey=${apiKey}&query=${encodeURIComponent(query)}`;

  //try {
    // Send a GET request to the API
    const response = await fetch(endpoint);
    const result = await response.json();

    if (!response.ok || result.error) {
      return m.reply("Failed to fetch lyrics. Please try again later.");
    }

    // Check if lyrics were found
    if (!result.data || result.data.length === 0) {
      return m.reply("No lyrics found for the given query.");
    }

    // Format the response for the user
    const lyrics = result.data[0]; // Assuming the first result is the most relevant
    const replyMessage = `🎵 *${lyrics.title}* by *${lyrics.artist}*\n\n${lyrics.lyrics}`;

    // Send the reply to the user
    await m.reply(replyMessage);

  }/*  catch (error) {
    console.error("Error fetching lyrics:", error);
    m.reply("An error occurred while fetching the lyrics. Please try again later.");
  } 
};*/

// Command metadata
handler.help = ["lyrics"];
handler.tags = ["downloader"];
handler.command = /^(lyrics|lyric)$/i;

export default handler;
