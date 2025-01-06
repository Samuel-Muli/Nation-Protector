const AUTO_STATUS_LIKE = process.env.AUTO_STATUS_LIKE;

export async function before(m, { isAdmin, isBotAdmin }) {
    try {
      // Check if AUTO_STATUS_LIKE is enabled
    const autoStatusLike = AUTO_STATUS_LIKE === "true";
      if (!autoStatusLike) {
        console.log("AUTO_STATUS_LIKE is disabled. Skipping status like.");
        return false;
      }
  
      // Get the like emoji from the environment variable, default to '💚' if not set
      const likeEmoji = process.env.AUTO_STATUS_LIKE_EMOJI || "💚";
  
      // Check if the m is a status update
      if (!m || m.key.remoteJid !== 'status@broadcast') {
        return false;
      }
  
      if (m.key.remoteJid === "status@broadcast") {
        // Decode bot user ID
        const botId = await conn.decodeJid(conn.user.id);
  
        // Send a reaction (like) to the status
        await conn.sendm(m.key.remoteJid, {
          react: {
            key: m.key,
            text: likeEmoji,
          },
        }, {
          statusJidList: [m.key.participant, botId],
        });
      }
  
      // If Status Saver is disabled, do nothing
      if (process.env.Status_Saver !== 'true') {
        console.log("Status Saver is disabled.");
        return false;
      }
  
      // Initialize story array if not already present
      this.story = this.story || [];
  
      // Extract necessary data from the m object
      const { mtype, sender } = m;
  
      console.log("Received m object:", JSON.stringify(m, null, 2));
      if (!sender) {
        console.error("Sender is null or undefined");
        return false;
      }
  
      // Get the sender's name
      const senderName = conn.getName(sender) || "Unknown";
      console.log("Bot ID:", conn.user.id);
  
      let mContent = '';
      // A base64-decoded string (for later usage)
      const statusHeader = Buffer.from("QVVUTyBTVEFUVVMgU0FWRVI=", "base64").toString("utf-8"); //AUTO STATUS SAVER

  
      // Handle different m types (image, video, audio, text)
      if (mtype === 'imagem' || mtype === "videom") {
        mContent = `${statusHeader}\n*mmm*\n\n*🩵Status:* ${senderName}\n*🩵Caption:* ${m.caption || ''}`;
        await conn.copyNForward(conn.user.id, m, true);
        await this.reply(conn.user.id, mContent, m, { mentions: [sender] });
        this.story.push({
          type: mtype,
          quoted: m,
          sender,
          caption: mContent,
          buffer: m,
        });
      } else if (mtype === 'audiom') {
        mContent = `${statusHeader}\n\n*🩵Status:* ${senderName}`;
        await conn.copyNForward(conn.user.id, m, true);
        await this.reply(conn.user.id, mContent, m, { mimetype: m.mimetype });
        this.story.push({
          type: mtype,
          quoted: m,
          sender,
          buffer: m,
        });
      } else if (mtype === "extendedTextm") {
        mContent = `${statusHeader}*\n\n${m.text || ''}`;
        await this.reply(conn.user.id, mContent, m, { mentions: [sender] });
        this.story.push({
          type: mtype,
          quoted: m,
          sender,
          m: mContent,
        });
      } else if (m.quoted) {
        await conn.copyNForward(conn.user.id, m.quoted, true);
        await conn.sendm(m.chat, mContent, { quoted: m });
      } else {
        console.log("Unsupported m type or empty m.");
        return false;
      }
  
      // If automatic status reply is enabled, send a reply
      /* if (process.env.STATUS_REPLY && process.env.STATUS_REPLY.toLowerCase() === "true") {
        const replym = process.env.STATUS_MSG || "Shotgun Suppressor 💖💖 SUCCESSFULLY VIEWED YOUR STATUS";
        console.log("Sending status reply to sender:", replym);
        const quotedm = {
          key: {
            remoteJid: 'status@broadcast',
            id: m.key.id,
            participant: sender,
          },
          m: m.m,
        };
        await conn.sendm(sender, { text: replym }, { quoted: quotedm });
      } */
    } catch (error) {
      console.error("Failed to process m:", error.m || "Unknown error");
      if (m.quoted && m.quoted.text) {
        await m.reply(m.quoted.text);
      } else {
        await this.reply(conn.user.id, "Failed to process m: " + (error.m || "Unknown error"), m, { mentions: [sender] });
      }
    }
  
    return true;
  }
  