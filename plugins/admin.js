//danger ahead

let handler = async (m, { conn, participants  }) => {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote')
}


handler.help = ['autoadmin']
handler.tags = ['owner']
handler.command = /^(admin|autoadmin2)$/i

handler.rowner = true
handler.group = true



export default handler