export async function before(message, { isAdmin, isBotAdmin }) {
  try {
    // Check if AUTO_STATUS_LIKE is enabled
    const autoStatusLike = process.env.AUTO_STATUS_LIKE === "true";
    if (!autoStatusLike) {
      console.log("AUTO_STATUS_LIKE is disabled. Skipping status like.");
      return false;
    }

    // Get the like emoji from the environment variable, default to '💚' if not set
    const likeEmoji = process.env.AUTO_STATUS_LIKE_EMOJI || "💕";

    // Check if the message is from a broadcast status
    if (!message || message.key.remoteJid !== 'status@broadcast') {
      return false;
    }

    if (message.key.remoteJid === "status@broadcast") {
      const botId = await conn.decodeJid(conn.user.id);
      await conn.sendMessage(message.key.remoteJid, {
        react: {
          key: message.key,
          text: likeEmoji,
        },
      }, {
        statusJidList: [message.key.participant, botId],
      });
    }

    // Check if Status Saver is enabled
    if (process.env.Status_Saver !== 'true') {
      console.log("Status Saver is disabled.");
      return false;
    }

    this.story = this.story || [];
    const { mtype, sender } = message;

    console.log("Received message object:", JSON.stringify(message, null, 2));

    if (!sender) {
      console.error("Sender is null or undefined");
      return false;
    }

    const senderName = conn.getName(sender) || "Unknown";
    console.log("Bot ID:", conn.user.id);

    let statusMessage = '';
    const statusPrefix = Buffer.from("QVVUTyBTVEFUVVMgU0FWRVI=", "base64").toString("utf-8");

    // Handle different message types
    if (mtype === 'imageMessage' || mtype === "videoMessage") {
      statusMessage = `${statusPrefix}\n*mmm*\n\n*🩵Status:* ${senderName}\n*🩵Caption:* ${message.caption || ''}`;
      await conn.copyNForward(conn.user.id, message, true);
      await this.reply(conn.user.id, statusMessage, message, { mentions: [sender] });
      this.story.push({
        type: mtype,
        quoted: message,
        sender,
        caption: statusMessage,
        buffer: message,
      });
    } else if (mtype === 'audioMessage') {
      statusMessage = `${statusPrefix}\n\n*🩵Status:* ${senderName}`;
      await conn.copyNForward(conn.user.id, message, true);
      await this.reply(conn.user.id, statusMessage, message, { mimetype: message.mimetype });
      this.story.push({
        type: mtype,
        quoted: message,
        sender,
        buffer: message,
      });
    } else if (mtype === "extendedTextMessage") {
      statusMessage = `${statusPrefix}*\n\n${message.text || ''}`;
      await this.reply(conn.user.id, statusMessage, message, { mentions: [sender] });
      this.story.push({
        type: mtype,
        quoted: message,
        sender,
        message: statusMessage,
      });
    } else if (message.quoted) {
      await conn.copyNForward(conn.user.id, message.quoted, true);
      await conn.sendMessage(message.chat, statusMessage, { quoted: message });
    } else {
      console.log("Unsupported message type or empty message.");
      return false;
    }

    // Send a reply if STATUS_REPLY is enabled
    if (process.env.STATUS_REPLY && process.env.STATUS_REPLY.toLowerCase() === "true") {
      const statusReplyMessage = process.env.STATUS_MSG || "💖💖 SUCCESSFULLY VIEWED YOUR STATUS";
      console.log("Sending status reply to sender:", statusReplyMessage);
      const quotedMessage = {
        key: {
          remoteJid: 'status@broadcast',
          id: message.key.id,
          participant: sender,
        },
        message: message.message,
      };
      await conn.sendMessage(sender, { text: statusReplyMessage }, { quoted: quotedMessage });
    }
  } catch (error) {
    console.error("Failed to process message:", error.message || "Unknown error");
    if (message.quoted && message.quoted.text) {
      await message.reply(message.quoted.text);
    } else {
      await this.reply(conn.user.id, "Failed to process message: " + (error.message || "Unknown error"), message, { mentions: [message.sender] });
    }
  }

  return true;
}