/*let handler = m => m
handler.all = async function (m, conn) {
    var vn = "./Assets/ALIVE.mp3"
    let url = "https://github.com/Samuel-Muli"
    let murl = "https://www.instagram.com/"
    let hash = global.botname
    let img = "https://telegra.ph/file/087410e10ba5b08083295.jpg"
    let num = ["254725074352"]

    let doc = {
        audio: {
          url: vn
        },
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform: [0,99,0,99,0,99,0],
        fileName: "‖⫷※•şɐɱʉ•※⫸‖",
    
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
          title: "↺ |◁   II   ▷|   ♡",
          body: hash,
          thumbnailUrl: img,
          sourceUrl: url,
          mediaType: 2,
          mediaUrl: murl,
         // renderLargerThumbnail: true,
          showAdAttribution: true
          }}
      };
	
    let phoneNumber = '';
    if (m.mentionedJid && m.mentionedJid[0]) {
        phoneNumber = m.mentionedJid[0].replace(/[^0-9]/g, '');
        if (num.includes(phoneNumber)) {
          return this.sendMessage(m.chat, doc, { quoted: m });
        }
      } else {
        return
      }
}
export default handler
 */
