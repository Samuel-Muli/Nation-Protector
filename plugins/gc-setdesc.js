let handler = async (m, { conn, args }) => {
    await conn.groupUpdateDescription(m.chat, `${args.join(" ")}`);
    m.reply('*✅Success changing The description of the group*')
    }
    handler.help = ['setdesc <text>']
    handler.tags = ['group']
    handler.command = /^setdesk|setdesc$/i
    handler.group = true
    handler.admin = true
    handler.botAdmin = true
    export default handler