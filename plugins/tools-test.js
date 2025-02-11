import fs from 'fs'
import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix: _p }) => {
    let img = "https://i.imgur.com/zTeGZ9B.jpeg"
let info = `*‖⫷※•şɐɱʉ•※⫸‖ BOT IS ACTIVE* type *${process.env.PREFIX}menu* to see the available commands`
await conn.reply(m.chat, info, m, { contextInfo: { mentionedJid: [m.sender],forwardingScore: 256,
      isForwarded: true, externalAdReply: { title: author, body: botname, sourceUrl: fgyt, thumbnail: await conn.getFile(img) }}})
}
handler.customPrefix = /^(alive)$/i
handler.command = new RegExp

export default handler
