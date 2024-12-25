import sharp from 'sharp';

let handler = async (m, { conn }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let name = conn.getName(who)
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './samu1.jpg')

  // Regular expression to match any special character prefix
  const prefixRegex = /[^a-zA-Z0-9]/;

  // Check if the message starts with a special character prefix (any non-alphanumeric character)
  let command = m.text.trim().split(' ')[0];

  if (prefixRegex.test(command)) {
      // Remove the prefix and extract the actual command
      command = command.replace(prefixRegex, '').toLowerCase();
      
      // Construct API URL for the appropriate overlay
      let apiUrl = '';
      let fileName = '';
      let caption = '';

      // Set values based on the command
      switch (command) {
          case 'discord':
              apiUrl = '/canvas/overlay/discord';
              fileName = 'discord.png';
              caption = `*Discord Overlay for ${name}*`;
              break;
          case 'welcome':
              apiUrl = '/canvas/overlay/welcome';
              fileName = 'welcome.png';
              caption = `*Welcome, ${name}!*`;
              break;
          case 'gay':
              apiUrl = '/canvas/overlay/gay';
              fileName = 'gay.png';
              caption = `*You're fabulous, ${name}!*`;
              break;
          case 'imposter':
              apiUrl = '/canvas/overlay/imposter';
              fileName = 'imposter.png';
              caption = `*Imposter alert: ${name}*`;
              break;
          case 'rip':
              apiUrl = '/canvas/overlay/rip';
              fileName = 'rip.png';
              caption = `*Rest in peace, ${name}...*`;
              break;
          case 'wasted':
              apiUrl = '/canvas/overlay/wasted';
              fileName = 'wasted.png';
              caption = `*Wasted, ${name}...*`;
              break;
          case 'phub':
              apiUrl = '/canvas/overlay/phub';
              fileName = 'phub.png';
              caption = `*Oh no, ${name}! You've been spotted on PHub!*`;
              break;
          case 'trash':
              apiUrl = '/canvas/overlay/trash';
              fileName = 'trash.png';
              caption = `*Trash for ${name}...*`;
              break;
          case 'ohno':
              apiUrl = '/canvas/overlay/ohno';
              fileName = 'ohno.png';
              caption = `*Oh no, ${name}! Something went wrong...*`;
              break;
          case 'clyde':
              apiUrl = '/canvas/overlay/clyde';
              fileName = 'clyde.png';
              caption = `*Clyde says hi to ${name}!*`;
              break;
          case 'ko':
              apiUrl = '/canvas/overlay/ko';
              fileName = 'ko.png';
              caption = `*Knockout for ${name}! K.O.!*`;
              break;
          case 'facepalm':
              apiUrl = '/canvas/overlay/facepalm';
              fileName = 'facepalm.png';
              caption = `*Facepalm for ${name}...*`;
              break;
          case 'youtube':
              apiUrl = '/canvas/overlay/youtube';
              fileName = 'youtube.png';
              caption = `*YouTube vibe for ${name}!*`;
              break;
          case 'imposterwith':
              apiUrl = '/canvas/overlay/imposterwith';
              fileName = 'imposterwith.png';
              caption = `*Imposter with ${name}*`;
              break;
          case 'captcha':
              apiUrl = '/canvas/overlay/captcha';
              fileName = 'captcha.png';
              caption = `*Captcha for ${name}*`;
              break;
          case 'jail':
              apiUrl = '/canvas/overlay/jail';
              fileName = 'jail.png';
              caption = `*Jail for ${name}...*`;
              break;
          case 'hitler':
              apiUrl = '/canvas/overlay/hitler';
              fileName = 'hitler.png';
              caption = `*Hitler's favorite for ${name}*`;
              break;
          case 'triggered':
              apiUrl = '/canvas/overlay/triggered';
              fileName = 'triggered.png';
              caption = `*Triggered for ${name}!*`;
              break;
          case 'spank':
              apiUrl = '/canvas/overlay/spank';
              fileName = 'spank.png';
              caption = `*Spank for ${name}!*`;
              break;
          case 'punch':
              apiUrl = '/canvas/overlay/punch';
              fileName = 'punch.png';
              caption = `*Punch for ${name}!*`;
              break;
          case 'snowflake':
              apiUrl = '/canvas/overlay/snowflake';
              fileName = 'snowflake.png';
              caption = `*Snowflake for ${name}*`;
              break;
          case 'beautiful':
              apiUrl = '/canvas/overlay/beautiful';
              fileName = 'beautiful.png';
              caption = `*You're beautiful, ${name}!*`;
              break;
          case 'bed':
              apiUrl = '/canvas/overlay/bed';
              fileName = 'bed.png';
              caption = `*Time for bed, ${name}!*`;
              break;
          case 'affect':
              apiUrl = '/canvas/overlay/affect';
              fileName = 'affect.png';
              caption = `*Affect for ${name}*`;
              break;
          case 'wanted':
              apiUrl = '/canvas/overlay/wanted';
              fileName = 'wanted.png';
              caption = `*Wanted for ${name}*`;
              break;
          case 'batslap':
              apiUrl = '/canvas/overlay/batslap';
              fileName = 'batslap.png';
              caption = `*Batslap for ${name}*`;
              break;
          case 'kiss':
              apiUrl = '/canvas/overlay/kiss';
              fileName = 'kiss.png';
              caption = `*Kiss for ${name}*`;
              break;
          case 'online':
              apiUrl = '/canvas/overlay/online';
              fileName = 'online.png';
              caption = `*Online status for ${name}*`;
              break;
          default:
              return conn.reply(m.chat, `*Unknown command: ${command}*`, m);
      }

      // Fetch the image from the API
      try {
          let imageBuffer = await global.API('https://some-random-api.com', apiUrl, {
              avatar: pp,
          });

          // Send the image with the correct format
          conn.sendFile(m.chat, imageBuffer, fileName, caption, m);
      } catch (error) {
          console.error(error);
          return conn.reply(m.chat, `*Failed to generate the image for ${name}*`, m);
      }
  }
}

handler.help = ['gay', 'wasted','jail'];
handler.tags = ['fun'];
handler.command = ['gay', 'wasted','jail'];

export default handler;
