let handler = async (_0x52bfb8, { text: _0x146a18, conn: _0x30e405, usedPrefix: _0xf281c9, command: _0x397f56 }) => {
    try {
        // Check if the user has provided a future date for the countdown
        if (!_0x146a18) {
            throw '❓ *Please provide a future date for the countdown. Example: ' + (_0xf281c9 + _0x397f56) + ' 2023-01-01*';
        }

        // Parse the provided date and check if it is in the future
        const futureDate = new Date(_0x146a18);
        const currentDate = new Date();
        if (futureDate <= currentDate) {
            throw '⚠️ *Please provide a future date for the countdown.*';
        }

        // Calculate the remaining time in days
        const timeDifference = futureDate - currentDate;
        const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

        // Prepare the countdown message
        const countdownMessage = `⏳ *Countdown to ${_0x146a18}*\n${remainingDays} days remaining`;

        // Send the countdown message back to the user
        _0x30e405.reply(_0x52bfb8.chat, countdownMessage, _0x52bfb8);
    } catch (error) {
        // In case of any error, log it and send an error message to the user
        console.error(error);
        _0x52bfb8.reply('⛔ *An error occurred: ' + error + '*');
    }
};

// Register the command and its associated help info
handler.command = ['countdown'];
handler.help = ['countdown'];
handler.tags = ['tools'];

export default handler;
