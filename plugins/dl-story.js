// Decode function to get human-readable values
const handler = async (message, { conn }) => {
    // Ensure the message has the status property and its correct value
    if (message.status?.type !== 'quoted') throw 'Quote Status message';
  
    try {
      // Get the quoted text from the message
      let quotedMessage = await message.status?.getQuotedMessage();
      
      // Send the quoted message back to the same chat
      await conn.sendMessage(
        message.chat,
        quotedMessage,  // the quoted message
        '',             // empty text
        message.status?.text || '', // fallback text from the status
        null,
        true,           // not a regular message
        { quoted: message } // set the original message as quoted
      );
    } catch (error) {
      console.error(error);
      // If there's an error, just send the original text
      await conn.sendMessage(message.chat, message.status?.text, message);
    }
  };
  
  // Define help and tags for the handler
  handler.help = ['statusdownload'];
  handler.tags = ['downloader'];
  //handler.command = ['status', 'statusdownload'];
  
  // Define the regular expression that this handler will respond to
  handler.command = /^((sw|status)(dl|download)|(dl|download)(sw|status))$/i;
  
  export default handler;
  