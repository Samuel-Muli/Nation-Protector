export async function before(m, { conn }) {
    try {
      console.log("Processing incoming message...");
  
      // Ignore invalid or irrelevant messages
      const irrelevantTypes = ["protocolMessage", "pollUpdateMessage", "reactionMessage", "stickerMessage"];
      if (irrelevantTypes.includes(m.mtype) || m.isBaileys || m.fromMe) {
        console.log("Ignoring irrelevant or bot/system message.");
        return true;
      }
  
      // Ensure the message is valid (contains text or meaningful content)
      if (!m.text && !m.caption) {
        console.log("Message has no text or caption, skipping.");
        return true;
      }
  
      console.log(`Processing message from chat: ${m.chat}`);
      console.log(`Message content: ${m.text || m.caption}`);
  
      // Show "Recording" presence in the chat
      await conn.sendPresenceUpdate("recording", m.chat);
      console.log("Presence set to 'Recording'.");
  
      // Reset presence to "typing" after 30 seconds
      setTimeout(async () => {
        await conn.sendPresenceUpdate("typing", m.chat);
        console.log("Presence reset to 'typing'.");
      }, 300000); // 30 seconds
    } catch (error) {
      console.error("Error processing message:", error.m);
    }
  
    return true;
  }