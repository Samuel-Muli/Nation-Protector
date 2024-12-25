import fetch from 'node-fetch';
import fs from 'fs';

let nicknameCharIdDict = {};
const storageFilePath = 'cai_nicknames.json';

// Load nickname data if the file exists
if (fs.existsSync(storageFilePath)) {
  try {
    const fileData = fs.readFileSync(storageFilePath, 'utf-8');
    nicknameCharIdDict = JSON.parse(fileData);
  } catch (error) {
    console.error('Error loading JSON file:', error);
  }
}

// Main handler function
let handler = async (A, { text, usedPrefix, command }) => {
  if (typeof text !== 'string') {
    throw 'Invalid input. Expected a string.';
  }

  // If the text starts with `.cai search`
  if (text.startsWith('.cai search')) {
    const query = text.slice(12).trim();
    const searchUrl = `https://animecafe-characterai-indratensei.cloud.okteto.net/search?query=${encodeURIComponent(query)}`;
    
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      const searchResults = data.search_results.slice(0, 5).map(item => ({
        external_id: item.external_id,
        participant_name: item.participant_name,
        title: item.title,
      }));
      A.reply(JSON.stringify(searchResults, null, 2));
    } catch (error) {
      console.error('Error fetching data from the API.', error);
      throw 'Error fetching data from the API.';
    }

  } else if (text.startsWith('.cai new')) {
    // If the text starts with `.cai new`
    const nickname = text.slice(9).trim();
    const charId = nicknameCharIdDict[nickname];
    
    if (charId) {
      const newChatUrl = `https://animecafe-characterai-indratensei.cloud.okteto.net/cai-newchat?char=${charId}`;
      
      try {
        const response = await fetch(newChatUrl);
        const data = await response.json();
        A.reply(data);
      } catch (error) {
        console.error('Error fetching new chat data from the API.', error);
        throw 'Error fetching new chat data from the API.';
      }
    } else {
      A.reply(`No character found with the nickname "${nickname}"`);
    }

  } else if (text.startsWith('.cai add')) {
    // If the text starts with `.cai add`
    const [nickname, charId] = text.slice(9).split(':');
    nicknameCharIdDict[nickname] = charId;
    fs.writeFileSync(storageFilePath, JSON.stringify(nicknameCharIdDict, null, 2));
    A.reply(`Added nickname "${nickname}" for character ID "${charId}"`);

  } else if (text === '.cai trending') {
    // If the text is `.cai trending`
    const trendingUrl = 'https://animecafe-characterai-indratensei.cloud.okteto.net/trending';
    
    try {
      const response = await fetch(trendingUrl);
      const data = await response.json();
      const trendingCharacters = data.trending_characters.map(item => ({
        external_id: item.external_id,
        participant_name: item.participant_name,
        title: item.title,
      }));
      A.reply(JSON.stringify(trendingCharacters, null, 2));
    } catch (error) {
      console.error('Error fetching trending data from the API.', error);
      throw 'Error fetching trending data from the API.';
    }
  } else {
    throw 'Invalid .cai command.';
  }
};

// Export the handler function
export default handler;
