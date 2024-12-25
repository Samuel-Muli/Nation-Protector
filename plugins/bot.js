
let handler = async (m, { conn}) => {
let user = global.db.data.users[m.sender]
let name = conn.getName(m.sender)
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let av = `./Assets/mp3/${pickRandom(["samu", "samu1", "samu2", "samu3", "samu4"])}.mp3`

m.reply( `Hello ${taguser} \nAm ‖⫷※•şɐɱʉ•※⫸‖ created by team ‖⫷※•şɐɱʉ•※⫸‖\n Need help?  type /help `)
conn.sendFile(m.chat, av, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true });
} 

handler.customPrefix = /^(bot|menu|help)$/i
handler.command = new RegExp

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
