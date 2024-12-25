async function handler(m, { conn }) {



  conn.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, m.chat)

  //let a = await m.reply("‖⫷※•şɐɱʉ•※⫸‖ bot Successfully deleted this chat!") 
  m.react('🦜')



}

handler.help = ['deletechat'],

handler.tags = ['owner'],

handler.command = /^(deletechat|delchat|dchat|clearchat|clear)$/i

handler.owner = true

export default handler

  
