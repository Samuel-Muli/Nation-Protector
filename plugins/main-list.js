let handler = async (m, { conn, usedPrefix, command}) => {
      let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
      if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`;
    
      let pp = './samu1.jpg'
      let more = String.fromCharCode(8206);
      let readMore = more.repeat(850); 
    
      let lkr;
      switch (command) {
        case 'list':
lkr = "*Get excited, here are your options:*\n\n" +
"🤖 *" + usedPrefix + "botmenu* - The Bot's secret control panel. What's your command, oh great one?\n\n" +
"👑 *" + usedPrefix + "ownermenu* - The sacred scroll only for the chosen one. Yep, that's you, Boss!\n\n" +    
"🧑‍🤝‍🧑 *" + usedPrefix + "groupmenu* - Group shenanigans central! Unite, chat, conquer!\n\n" +  
"📥 *" + usedPrefix + "dlmenu* - 'DL' stands for 'Delicious Loot'. Come grab your goodies!\n\n" +   
"🎉 *" + usedPrefix + "funmenu* - The bot's party hat. Games, jokes and instant ROFLs. Let's get this party started!\n\n" +   
"💰 *" + usedPrefix + "economymenu* - Bling bling! Your personal vault of virtual economy. Spend or save? Choose wisely!\n\n" +    
"🎮 *" + usedPrefix + "gamemenu* - Enter the gaming arena. May the odds be ever in your favor!\n\n" +     
"🎨 *" + usedPrefix + "stickermenu* - A rainbow of stickers for your inner artist. Make your chats pop!\n\n" +    
"🧰 *" + usedPrefix + "toolmenu* - Your handy-dandy toolkit. What's your pick, genius?\n\n" +    
"🎩 *" + usedPrefix + "logomenu* - Create a logo that screams YOU. Or whispers. You choose the volume.\n\n" ;
break;

          
        
        

        case 'botmenu':
          lkr = `
╭─────────────────⍟
┃  ‖⫷※•şɐɱʉ•※⫸‖ 𝘽𝙊𝙏 𝙈𝙀𝙉𝙐  
╰───‖⫷※•şɐɱʉ•※⫸‖─────────⍟   

┏━━━ʕ•㉨•ʔ━━━
┃➣🗂️ _${usedPrefix}gita_
┃➣🗂️ _${usedPrefix}ping_
┃➣🗂️ _${usedPrefix}uptime_
┃➣🗂️ _${usedPrefix}bot_
┃➣🗂️ _${usedPrefix}owner_
┃➣🗂️ _${usedPrefix}script_
┃➣🗂️ _${usedPrefix}runtime_
┃➣🗂️ _${usedPrefix}infobot_
┃➣🗂️ _${usedPrefix}donate_
┃➣🗂️ _${usedPrefix}groups_
┃➣🗂️ _${usedPrefix}blocklist_
┃➣🗂️ _${usedPrefix}listprem_
┃➣    *_‖⫷※•şɐɱʉ•※⫸‖_*
┗━━━ʕ•㉨•ʔ━━━┛`; // Your bot menu message here
          break;
        case 'ownermenu':
          lkr = `
╭─────────────────⍟
┃ ‖⫷※•şɐɱʉ•※⫸‖ 𝙊𝙒𝙉𝙀𝙍 𝙈𝙀𝙉𝙐  
╰───‖⫷※•şɐɱʉ•※⫸‖─────────⍟

┏━━━ʕ•㉨•ʔ━━━┓
┃➣📁 _${usedPrefix}banchat_
┃➣📁 _${usedPrefix}unbanchat_
┃➣📁 _${usedPrefix}banuser_
┃➣📁 _${usedPrefix}unbanuser_
┃➣📁 _${usedPrefix}Broadcast_
┃➣📁 _${usedPrefix}Broadcastgc_
┃➣📁 _${usedPrefix}join_
┃➣📁 _${usedPrefix}setppbot_
┃➣📁 _${usedPrefix}setprefix_
┃➣📁 _${usedPrefix}resetprefix_
┃➣📁 _${usedPrefix}getfile_
┃➣📁 _${usedPrefix}getplugin_
┗━━━ʕ•㉨•ʔ━━━┛`; // 
          break;
          case 'groupmenu':
            case 'gpmenu':
          lkr = `
╭─────────────────⍟
┃ ‖⫷※•şɐɱʉ•※⫸‖ 𝙂𝙍𝙊𝙐𝙋 𝙈𝙀𝙉𝙐 
╰───‖⫷※•şɐɱʉ•※⫸‖─────────⍟

┏━━━ʕ•㉨•ʔ━━━┓🤖
┃➣👾_${usedPrefix}kick *<@tag>*_
┃➣👾_${usedPrefix}promote *<@tag>*_
┃➣👾 _${usedPrefix}demote *<@tag>*_
┃➣👾 _${usedPrefix}infogroup_
┃➣👾 _${usedPrefix}resetlink_
┃➣👾 _${usedPrefix}link_
┃➣👾 _${usedPrefix}setpp *<image>*_
┃➣👾 _${usedPrefix}setname *<text>*_
┃➣👾 _${usedPrefix}setdesc *<text>*_
┃➣👾 _${usedPrefix}setwelcome *<text>*_
┃➣👾 _${usedPrefix}setbye *<text>*_
┃➣👾 _${usedPrefix}hidetag *<text/image/audio/vid>*_
┃➣👾 _${usedPrefix}warn *<@tag>*_
┃➣👾 _${usedPrefix}unwarn *<@tag>*_
┃➣👾 _${usedPrefix}group *<open/close>*_
┃➣👾 _${usedPrefix}enable_
┗━━━ʕ•㉨•ʔ━━━┛`; // 
          break;
          case 'downloadermenu':
            case 'dlmenu' :
              case 'downloadmenu':
          lkr = `
╭─────────────────⍟
┃ ‖⫷※•şɐɱʉ•※⫸‖ 𝘿𝙇📱 𝙈𝙀𝙉𝙐 
╰───‖⫷※•şɐɱʉ•※⫸‖─────────⍟

┏━━━ʕ•㉨•ʔ━━━┓
┃➣📡 _${usedPrefix}play_
┃➣📡 _${usedPrefix}song_
┃➣📡 _${usedPrefix}gimage_
┃➣📡 _${usedPrefix}x <link>_
┃➣📡 _${usedPrefix}tt <link>_
┃➣📡 _${usedPrefix}tiktokstalk_
┃➣📡 _${usedPrefix}ig <link>_
┃➣📡 _${usedPrefix}spotify_
┃➣📡 _${usedPrefix}fb <link>_
┗━━━ʕ•㉨•ʔ━━━┛`; // 
          break;
          case 'economymenu':
          lkr = `
╭─────────────────⍟
┃‖⫷※•şɐɱʉ•※⫸‖ 𝙀𝘾𝙊𝙉𝙊𝙈𝙔 
╰───‖⫷※•şɐɱʉ•※⫸‖─────────⍟

┏━━━ʕ•㉨•ʔ━━━┓
┃➣👑 _${usedPrefix}daily_
┃➣👑 _${usedPrefix}bank_
┃➣👑 _${usedPrefix}leaderboard_
┃➣👑 _${usedPrefix}rob_
┃➣👑 _${usedPrefix}work_
┃➣👑 _${usedPrefix}transfer_
┗━━━ʕ•㉨•ʔ━━━┛`; // 
          break;
          case 'funmenu':
          lkr = `
╭─────────────────⍟
┃ ‖⫷※•şɐɱʉ•※⫸‖ 𝙁𝙐𝙉 𝙈𝙀𝙉𝙐
╰───‖⫷※•şɐɱʉ•※⫸‖─────────⍟

┏━━━ʕ•㉨•ʔ━━━┓
┃➣👻 _${usedPrefix}character_
┃➣👻 _${usedPrefix}truth_
┃➣👻 _${usedPrefix}dare_
┃➣👻 _${usedPrefix}flirt_
┃➣👻 _${usedPrefix}gay_
┃➣👻 _${usedPrefix}advice_
┃➣👻 _${usedPrefix}pickupline_
┃➣👻 _${usedPrefix}waste_
┃➣👻 _${usedPrefix}simpcard_
┃➣👻 _${usedPrefix}hornycard_
┃➣👻 _${usedPrefix}kanye_
┃➣👻 _${usedPrefix}stupid_
┃➣👻 _${usedPrefix}lolicon_
┗━━━ʕ•㉨•ʔ━━━┛`; // 
          break;
          case 'animemenu':
          lkr = `
╭─────────────────⍟
┃ ‖⫷※•şɐɱʉ•※⫸‖ 𝐴𝑁𝐼𝑀𝐸 𝑀𝐸𝑁𝑈
╰───‖⫷※•şɐɱʉ•※⫸‖─────────⍟

┏━━━ʕ•㉨•ʔ━━━┓
┃➣❄️ _${usedPrefix}waifu_
┃➣❄️ _${usedPrefix}neko_
┃➣❄️ _${usedPrefix}loli_
┃➣❄️ _${usedPrefix}couplepp_
┃➣❄️ _${usedPrefix}toanime_
┃➣❄️ _${usedPrefix}naruto_
┃➣❄️ _${usedPrefix}itachi_
┃➣❄️ _${usedPrefix}akira_
┃➣❄️ _${usedPrefix}asuna_
┃➣❄️ _${usedPrefix}akiyama_
┃➣❄️ _${usedPrefix}boruto_
┃➣❄️ _${usedPrefix}hornycard_
┃➣❄️ _${usedPrefix}ayuzawa_
┃➣❄️ _${usedPrefix}anna_
┃➣❄️ _${usedPrefix}chiho_
┃➣❄️ _${usedPrefix}chitoge_
┃➣❄️ _${usedPrefix}deidara_
┃➣❄️ _${usedPrefix}erza_
┃➣❄️ _${usedPrefix}elaina_
┃➣❄️ _${usedPrefix}emilia_
┃➣❄️ _${usedPrefix}hestia_
┃➣❄️ _${usedPrefix}hinata_
┃➣❄️ _${usedPrefix}inori_
┃➣❄️ _${usedPrefix}isuzu_
┃➣❄️ _${usedPrefix}kagura_
┃➣❄️ _${usedPrefix}kaori_
┃➣❄️ _${usedPrefix}keneki_
┃➣❄️ _${usedPrefix}kurumi_
┃➣❄️ _${usedPrefix}madara_
┃➣❄️ _${usedPrefix}mikasa_
┃➣❄️ _${usedPrefix}miku_
┃➣❄️ _${usedPrefix}minato_
┃➣❄️ _${usedPrefix}nezuko_
┃➣❄️ _${usedPrefix}sagiri_
┃➣❄️ _${usedPrefix}sasuke_
┃➣❄️ _${usedPrefix}sakura_
┃➣❄️ _${usedPrefix}kotori_
┗━━━ʕ•㉨•ʔ━━━┛`; 
          break;
          case 'gamemenu':
          lkr = `
╭─────────────────⍟
┃ ‖⫷※•şɐɱʉ•※⫸‖ 𝙂𝘼𝙈𝙀 𝙈𝙀𝙉𝙐 
╰───‖⫷※•şɐɱʉ•※⫸‖─────────⍟

┏━━━ʕ•㉨•ʔ━━━┓
┃➣🎮 _${usedPrefix}tictactoe_
┃➣🎮 _${usedPrefix}delttt_
┃➣🎮 _${usedPrefix}math_
┃➣🎮 _${usedPrefix}roulette_
┃➣🎮 _${usedPrefix}ppt_
┃➣🎮 _${usedPrefix}slot_
┃➣🎮 _${usedPrefix}guessflag_
┃➣🎮 _${usedPrefix}cock-fight <amount>_
┃➣🎮 _${usedPrefix}gamble <amoount> <red|black>_
┃➣🎮 _${usedPrefix}chess_
┗━━━ʕ•㉨•ʔ━━━┛`; // 
          break;
          case 'stickermenu':
          lkr = `
╭─────────────────⍟
┃ ‖⫷※•şɐɱʉ•※⫸‖ 𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝙈𝙀𝙉𝙐
╰───‖⫷※•şɐɱʉ•※⫸‖─────────⍟

┏━━━ʕ•㉨•ʔ━━━┓
┃➣👾 _${usedPrefix}sticker_
┃➣👾 _${usedPrefix}take_
┃➣👾 _${usedPrefix}scircle_
┃➣👾 _${usedPrefix}smaker_
┃➣👾 _${usedPrefix}sremovebg_
┃➣👾 _${usedPrefix}getsticker_
┃➣👾 _${usedPrefix}emojimix_
┃➣👾 _${usedPrefix}toimg_
┃➣👾 _${usedPrefix}tovid_
┃➣👾 _${usedPrefix}ttp_
┃➣👾 _${usedPrefix}telesticker_
┃➣👾 _${usedPrefix}attp_
┃➣👾 _${usedPrefix}attp2_
┃➣👾 _${usedPrefix}attp3_
┗━━━ʕ•㉨•ʔ━━━┛`; 

       break;
        case 'animemenu2':
          lkr = `
┌─⦿『 *_anime_* 』⦿
┃⬡▸ .anime
┃⬡▸ .akira
┃⬡▸ .akiyama
┃⬡▸ .anna
┃⬡▸ .asuna
┃⬡▸ .ayuzawa
┃⬡▸ .boruto
┃⬡▸ .chiho
┃⬡▸ .chitoge
┃⬡▸ .deidara
┃⬡▸ .erza
┃⬡▸ .elaina
┃⬡▸ .eba
┃⬡▸ .emilia
┃⬡▸ .hestia
┃⬡▸ .hinata
┃⬡▸ .inori
┃⬡▸ .isuzu
┃⬡▸ .itachi
┃⬡▸ .itori
┃⬡▸ .kaga
┃⬡▸ .kagura
┃⬡▸ .kaori
┃⬡▸ .keneki
┃⬡▸ .kotori
┃⬡▸ .kurumi
┃⬡▸ .madara
┃⬡▸ .mikasa
┃⬡▸ .miku
┃⬡▸ .minato
┃⬡▸ .naruto
┃⬡▸ .nezuko
┃⬡▸ .sagiri
┃⬡▸ .sasuke
┃⬡▸ .sakura
┃⬡▸ .akira
┃⬡▸ .amv  Ⓛ
┃⬡▸ .waifu
┃⬡▸ .neko
┃⬡▸ .zerotwo
┃⬡▸ .loli
┃⬡▸ .jjanime  Ⓛ
┃⬡▸ .pokedex <pokemon>
┃⬡▸ .trace
>-----------------------<
┃ -MADE BY ‖⫷※•şɐɱʉ•※⫸‖ -TEAM
>-----------------------<
╰─────────────────⦿
`; 



                  
          break;
          case 'toolmenu':
          lkr = `
╭─────────────────⍟
┃ ‖⫷※•şɐɱʉ•※⫸‖ 𝙏𝙊𝙊𝙇𝙎 𝙈𝙀𝙉𝙐
╰───‖⫷※•şɐɱʉ•※⫸‖─────────⍟

┏━━━ʕ•㉨•ʔ━━━┓
┃➣🧰 _${usedPrefix}whatmusic_
┃➣🧰 _${usedPrefix}calc_
┃➣🧰 _${usedPrefix}google_
┃➣🧰 _${usedPrefix}lyrics_
┃➣🧰 _${usedPrefix}readmore_
┃➣🧰 _${usedPrefix}ssweb_
┃➣🧰 _${usedPrefix}tts_
┃➣🧰 _${usedPrefix}tourl_
┃➣🧰 _${usedPrefix}wikipedia_
┃➣🧰 _${usedPrefix}nowa_
┃➣🧰 _${usedPrefix}weather_
┃➣🧰 _${usedPrefix}dalle_
┃➣🧰 _${usedPrefix}tocartoon_
┃➣🧰 _${usedPrefix}quote_
┃➣🧰 _${usedPrefix}technews_
┃➣🧰 _${usedPrefix}define_
┗━━━ʕ•㉨•ʔ━━━┛`; // 
          break;
          case 'nsfwmenu':
          lkr = `use command ${usedPrefix}nsfw`; // 
          break;
          case 'logomenu':
          lkr = `use ${usedPrefix}logo to see all options \ngfx cmd upto 12`; // 
          break;
        default:
          lkr = `Invalid command. Type ${usedPrefix}list to see available options.`;
      }
    
      conn.sendFile(m.chat, pp, 'perfil.jpg', lkr, m, false, { mentions: [who] });
    
      let done = '👍';
      m.react(done);
    };
    
    handler.help = ['list', 'botmenu', 'ownermenu', 'groupmenu', 'downloadmenu', 'economymenu', 'funmenu', 'gamemenu', 'stickermenu', 'logomenu', 'toolmenu','animemenu'];
    handler.tags = ['list'];
    handler.command = ['list', 'botmenu', 'ownermenu', 'groupmenu', 'dlmenu', 'downloadermenu', 'economymenu', 'funmenu', 'gamemenu', 'stickermenu', 'logomenu', 'toolmenu','animemenu'];
    
    export default handler
    
