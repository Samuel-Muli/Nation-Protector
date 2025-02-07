/* export async function before(message, { isAdmin, isBotAdmin }) {
  try {
    // Check if AUTO_STATUS_LIKE is enabled
    const autoStatusLike = process.env.AUTO_STATUS_LIKE === "true";
    if (!autoStatusLike) {
      console.log("AUTO_STATUS_LIKE is disabled. Skipping status like.");
      return false;
    }

    // Get the like emoji from the environment variable, default to '💚' if not set
    const likeEmoji = process.env.AUTO_STATUS_LIKE_EMOJI || "💕";

    if (!message || message.key.remoteJid !== 'status@broadcast') {
      return false;
    }

    if (message.key.remoteJid === "status@broadcast") {
      const botJid = await conn.decodeJid(conn.user.id);
      await conn.sendMessage(message.key.remoteJid, {
        react: {
          key: message.key,
          text: likeEmoji,
        },
      }, {
        statusJidList: [message.key.participant, botJid],
      });
    }

    if (process.env.STATUS_SAVER !== 'true') {
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

    let replyText = '';
    const base64String = Buffer.from("QVVUTyBTVEFUVVMgU0FWRVI=", "base64").toString("utf-8");

    if (mtype === 'imageMessage' || mtype === "videoMessage") {
      replyText = `${base64String}\n*mmm*\n\n*🩵Status:* ${senderName}\n*🩵Caption:* ${message.caption || ''}`;
      await conn.copyNForward(conn.user.id, message, true);
      await this.reply(conn.user.id, replyText, message, { mentions: [sender] });
      this.story.push({
        type: mtype,
        quoted: message,
        sender,
        caption: replyText,
        buffer: message,
      });
    } else if (mtype === 'audioMessage') {
      replyText = `${base64String}\n\n*🩵Status:* ${senderName}`;
      await conn.copyNForward(conn.user.id, message, true);
      await this.reply(conn.user.id, replyText, message, { mimetype: message.mimetype });
      this.story.push({
        type: mtype,
        quoted: message,
        sender,
        buffer: message,
      });
    } else if (mtype === "extendedTextMessage") {
      replyText = `${base64String}*\n\n${message.text || ''}`;
      await this.reply(conn.user.id, replyText, message, { mentions: [sender] });
      this.story.push({
        type: mtype,
        quoted: message,
        sender,
        message: replyText,
      });
    } else if (message.quoted) {
      await conn.copyNForward(conn.user.id, message.quoted, true);
      await conn.sendMessage(message.chat, replyText, { quoted: message });
    } else {
      console.log("Unsupported message type or empty message.");
      return false;
    }

    if (process.env.STATUS_REPLY && process.env.STATUS_REPLY.toLowerCase() === "true") {
      const statusReplyText = process.env.STATUS_MSG || "💖💖 SUCCESSFULLY VIEWED YOUR STATUS";
      console.log("Sending status reply to sender:", statusReplyText);
      const quotedMessage = {
        key: {
          remoteJid: 'status@broadcast',
          id: message.key.id,
          participant: sender,
        },
        message: message.message,
      };
      await conn.sendMessage(sender, { text: statusReplyText }, { quoted: quotedMessage });
    }
  } catch (error) {
    console.error("Failed to process message:", error.message || "Unknown error");
    if (message.quoted && message.quoted.text) {
      await message.reply(message.quoted.text);
    } else {
      await this.reply(conn.user.id, "Failed to process message: " + (error.message || "Unknown error"), message, { mentions: [sender] });
    }
  }

  return true;
}
 */

let bot = global.db.data.settings[this.user.jid] || {};
async function handleStatusReaction(m, conn) {
  if (m.key.remoteJid === "status@broadcast" && !m.fromMe) {
    await conn.readMessages([m.key]);
    const samu = [
      "🌟", "🚀", "🔥", "💎", "✨", "🎉", "😎", "🤩", "🥳", 
      "💡", "🌈", "🌸", "⚡", "🎶", "🏆", "❤️‍🔥", "🎯", "📸",
      "🪄", "🌍", "🎵", "🧠", "🌌", "🎮", "🪐"
    ];
    const randomEmoji = samu[Math.floor(Math.random() * samu.length)];
    const me = await conn.decodeJid(conn.user.id);
    await conn.sendMessage(
      m.key.remoteJid,
      { react: { key: m.key, text: randomEmoji } },
      { statusJidList: [m.key.participant, me] }
    );
  }
}
if (process.env.STATUSVIEW && process.env.STATUSVIEW.toLowerCase() === "true") {
  await handleStatusReaction(m, conn);
} else if (bot.statusview) {
  await handleStatusReaction(m, conn);
}