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

const nicknames = Object.keys(nicknameCharIdDict);

// Function to handle the processing of incoming messages
export async function before(message, { conn, isOwner, isAdmin, isROwner }) {
  if (message.text && message.text.includes('.')) {
    const parts = message.text.split(' ');
    const command = parts[0].slice(1);  // Extracts the command (removes the first character)
    
    if (nicknames.includes(command)) {
      conn.sendPresenceUpdate('composing', message.chat);  // Notify that the bot is composing a message
      const nicknameId = nicknameCharIdDict[command];  // Get the character ID for the nickname
      const messageText = parts.slice(1).join(' ');  // Get the rest of the message (after the command)
      
      try {
        // Send a request to the character AI service
        const response = await fetch(`https://animecafe-characterai-indratensei.cloud.okteto.net/cai?char=${nicknameId}&message=${encodeURIComponent(messageText)}`);
        const data = await response.json();
        const replyText = data.text;
        
        // Reply with the response from the character AI
        message.reply(replyText);
      } catch (error) {
        console.error('Error sending request:', error);
      }
    }
  }
}
