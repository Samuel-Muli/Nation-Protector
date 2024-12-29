import similarity from 'similarity'
import db from '../lib/database.js'

const threshold = 0.72 // the higher the value, the more similar the answers
export async function before(m) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (!(id in this.game))
        return !0
    let room = this.game[id]
    let text = m.text.toLowerCase().replace(/[^\w\s\-]+/, '')
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
    if (!isSurrender) {
        let index = room.jawaban.indexOf(text)
        if (index < 0) {
            if (Math.max(...room.jawaban.filter((_, index) => !room.terjawab[index]).map(answer => similarity(answer, text))) >= threshold)
                m.reply('Almost there!')
            return !0
        }
        if (room.terjawab[index])
            return !0
        let users = db.data.users[m.sender]
        room.terjawab[index] = m.sender
        users.exp += room.winScore
    }
    let isWin = room.terjawab.length === room.terjawab.filter(v => v).length
    let caption = `
*Question:* ${room.soal}
There are *${room.jawaban.length}* answers${room.jawaban.find(v => v.includes(' ')) ? `
(some answers contain spaces)
` : ''}
${isWin ? `*ALL ANSWERS ARE CORRECT*` : isSurrender ? '*GAVE UP!*' : ''}
${Array.from(room.jawaban, (answer, index) => {
        return isSurrender || room.terjawab[index] ? `(${index + 1}) ${answer} ${room.terjawab[index] ? '@' + room.terjawab[index].split('@')[0] : ''}`.trim() : false
    }).filter(v => v).join('\n')}
${isSurrender ? '' : `+${room.winScore} XP for each correct answer`}
    `.trim()
    const msg = await this.sendButton(m.chat, caption, author, null, [[`${(isWin || isSurrender) ? 'Family 100' : 'Give up'}`, `${(isWin || isSurrender) ? '.family100' : 'nyerah'}`]], null, {
        mentions: this.parseMention(caption)
    })
    room.msg = msg
    if (isWin || isSurrender)
        delete this.game[id]
    return !0
}
