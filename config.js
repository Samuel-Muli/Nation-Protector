import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'

// Global variables
global.owner = [
  ['254725074352', '‖⫷※•şɐɱʉ•※⫸‖', true], 
] 
//global.pairingNumber = '254725074352';
global.mods = [ '254725074352'] 
global.prems = ['254725074352']
global.allowed = ['254725074352' ]
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = global.keysZens[Math.floor(global.keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = global.keysxteammm[Math.floor(global.keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = global.keysneoxrrr[Math.floor(global.keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['GataDios']
global.beta = 'mLxstUwm'

global.APIs = {
  xteam: 'https://api.xteam.xyz', 
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://zenzapis.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api-fgmods.ddns.net'
}

global.APIKeys = { 
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
  'https://api.neoxr.my.id': global.keysneoxr,
  'https://violetics.pw': 'beta',
  'https://zenzapis.xyz': global.keysxxx, 
  'https://api-fgmods.ddns.net': 'fg-dylux'
}

// Sticker WM
global.botname = '‖⫷※•şɐɱʉ•※⫸‖'
global.premium = 'true'
global.packname = '‖⫷※•şɐɱʉ•※⫸‖' 
global.author = '@Samuel Muli' 
global.menuvid = 'https://telegra.ph/file/75ccac4f44375d552c60d.mp4'
global.igfg = '▢✓ Follow Our channel\nhttps://chat.whatsapp.com/FV96nX6l7iCGmBeunOFPa0' 
global.dygp = 'https://chat.whatsapp.com/FV96nX6l7iCGmBeunOFPa0'
global.fgsc = 'https://github.com/muli-tech/The-Great' 
global.fgyt = 'https://youtube.com/'
global.fgpyp = 'https://youtube.com/'
global.fglog = './samu1.jpg' 
global.thumb = fs.readFileSync('./samu1.jpg')

global.wait = '*🕣 _‖⫷※•şɐɱʉ•※⫸‖ IS LOADING..._*\n*▰▰▰▱▱▱▱▱⭐*'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✔️'
global.error = '❌' 
global.xmoji = '🔥' 

global.multiplier = 69 
global.maxwarn = '3'

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
