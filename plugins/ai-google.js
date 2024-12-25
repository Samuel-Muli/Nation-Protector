import fetch from 'node-fetch';

let handler = async (m, { args }) => {
  // Extract the query from the user's input
  if (!args || args.length === 0) {
    return m.reply("Please provide a query to search for.");
  }

  const query = args.join(" ");
  const apiKey = "gifted";
  const endpoint = `https://api.giftedtech.my.id/api/search/google?apikey=${apiKey}&query=${encodeURIComponent(query)}`;

  try {
    // Send a GET request to the API
    const response = await fetch(endpoint);
    const result = await response.json();

    if (!response.ok || result.error) {
      return m.reply("Failed to fetch search results. Please try again later.");
    }

    // Check if results were found
    if (!result.data || result.data.length === 0) {
      return m.reply("No results found for the given query.");
    }

    // Format the response for the user
    const firstResult = result.data[0]; // Assuming the first result is the most relevant
    const replyMessage = `🔍 *Search Result for:* "${query}"\n\nTitle: *${firstResult.title}*\nURL: ${firstResult.url}`;

    // Send the reply to the user
    await m.reply(replyMessage);

  } catch (error) {
    console.error("Error fetching search results:", error);
    m.reply("An error occurred while fetching the results. Please try again later.");
  }
};

// Command metadata
handler.help = ["google"];
handler.tags = ["AI"];
handler.command = /^(google)$/i;

export default handler;
