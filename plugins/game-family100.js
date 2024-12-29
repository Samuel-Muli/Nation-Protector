import { family100 } from '@bochilteam/scraper'
const winScore = 4999

async function handler(m) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (id in this.game) {
        this.reply(m.chat, 'There is still an unanswered quiz in this chat', this.game[id].msg)
        throw false
    }
    const json = await family100()
    let caption = `
*Question:* ${json.soal}
There are *${json.jawaban.length}* answers${json.jawaban.find(v => v.includes(' ')) ? `
(some answers contain spaces)
`: ''}
+${winScore} XP for each correct answer
    `.trim()
    this.game[id] = {
        id,
        msg: await this.sendButton(m.chat, caption, author, null, [['Give up', 'nyerah']], m),
        ...json,
        answered: Array.from(json.jawaban, () => false),
        winScore,
    }
}

handler.help = ['family100']
handler.tags = ['game']
handler.command = ['family100']

export default handler
