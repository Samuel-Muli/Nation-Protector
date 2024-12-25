import { exec } from 'child_process';
import _0xbf8510 from 'performance-now';

// Function to handle the command execution
let handler = async (_0x522480, { conn: _0x56505d }) => {
    let pingMessage = 'ping'; // Replacing the obfuscated string with decoded value
    let contactMessage = {
        'key': { 'fromMe': false, 'participant': 'status@broadcast', 'remoteJid': 'status@broadcast' },
        'message': {
            'contactMessage': {
                'displayName': '‖⫷※•şɐɱʉ•※⫸‖', // Display Name
                'vcard': 'BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:‖⫷※•şɐɱʉ•※⫸‖\nitem1.TEL;waid=...'
            }
        }
    };

    let pingResult = await _0x56505d.sendMessage(_0x522480.chat, { 'text': 'Pinging...' }, { 'quoted': contactMessage });

    // Get the time of execution before the command runs
    let startTime = _0xbf8510();

    await exec('neofetch --stdout', async (_0x3af436, _0x3214b5) => {
        let executionTime = (_0xbf8510() - startTime).toFixed(4);
        
        // Relay the message back with the latency information
        await _0x56505d.relayMessage(_0x522480.chat, {
            'protocolMessage': {
                'key': pingResult.key,
                'type': 0xe,
                'editedMessage': { 'conversation': `as fast as i can\n Latency: ${executionTime} ms` }
            }
        });
    });
};

// Command handlers
handler.command = ['ping'];
handler.help = ['ping'];
handler.tag = ['tools'];

export default handler;
