let handler = async (m, { conn, args, command }) => {
	let group = m.chat
        await m.reply('Byee Guys bot will leave now , , ! (≧ω≦👋)ゞ', m.chat) 
        await  conn.groupLeave(group)
        }
handler.help = ['leavegc']
handler.tags = ['owner']
handler.command = /^(out|leavegc)$/i

handler.rowner = true

export default handler