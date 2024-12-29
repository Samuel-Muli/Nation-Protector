const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const RATE_LIMIT_DELAY = 1000;  // 1 second delay to prevent rate-limiting

let handler = async (message, { conn }) => {
  try {
    // Check if the command is used in a group chat
    if (!message.isGroup) throw 'This command can only be used in group chats.';

    // Get group metadata (participants list)
    const groupMetadata = await conn.groupMetadata(message.chat);
    const participants = groupMetadata.participants;

    // Check if the user who sent the command is an admin
    const isUserAdmin = participants.find(participant => 
      participant.id === conn.user.jid && participant.admin
    );
    if (!isUserAdmin) throw 'Only group admins can use this command!';

    // Check if the target user is an admin
    const targetUser = participants.find(participant => 
      participant.id === message.sender && participant.admin
    );
    if (!targetUser) throw 'You need to be an admin to kick members!';

    // Find non-admin participants who are not the bot
    const nonAdmins = participants.filter(participant => 
      !participant.admin && participant.id !== conn.user.jid
    ).map(participant => participant.id);

    if (nonAdmins.length === 0) throw 'There are no non-admin members to kick.';

    // Kick the non-admin participants
    for (let userId of nonAdmins) {
      await conn.groupParticipantsUpdate(message.chat, [userId], 'remove');
      await delay(RATE_LIMIT_DELAY);  // Delay between requests to avoid rate-limiting
    }

    // Reply with success message
    message.reply(`Successfully kicked ${nonAdmins.length} member(s).`);
  } catch (error) {
    console.error(error);
    message.reply('Error: ' + (error.message || error));
  }
};

handler.help = ['kickall']; // Command name
handler.tags = ['group'];   // Command tag (category)
handler.command = /^kickall$/i; // Command pattern
handler.isGroup = true;     // Command can only be used in groups
handler.isAdmin = true;     // Command can only be used by admins

export default handler;
