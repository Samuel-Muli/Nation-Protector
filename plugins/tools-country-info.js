import axios from 'axios';

const restcountriesApi = 'https://restcountries.com/v3.1/name/';

let handler = async (m, { text, conn }) => {
  try {
    if (!text) {
      throw `❓ *Please provide the name of the country you want information about. Example: ${usedPrefix + command} Canada*`;
    }

    const response = await axios.get(`${restcountriesApi}${text}`);
    const country = response.data[0];

    if (!country) {
      throw `⚠️ *Country not found. Please check the name and try again.*`;
    }

    const countryInfo = 
      `🌍 *Country Information for ${country.name.common} (${country.cca2}):*\n` +
      `*Capital:* ${country.capital?.join(', ') || 'N/A'}\n` +
      `*Population:* ${country.population.toLocaleString()}\n` +
      `*Area:* ${country.area.toLocaleString()} square kilometers\n` +
      `*Region:* ${country.region}\n` +
      `*Subregion:* ${country.subregion || 'N/A'}\n` +
      `*Languages:* ${Object.values(country.languages || {}).join(', ')}\n` +
      `*Currencies:* ${Object.values(country.currencies || {}).map(c => c.name).join(', ')}\n` +
      `*Timezones:* ${country.timezones.join(', ')}\n` +
      `*Flag:* ${country.flags.svg}`;

    conn.reply(m.chat, countryInfo, m);
  } catch (error) {
    console.error(error);
    m.reply(`⛔ *An error occurred: ${error.message || error}*`);
  }
};

handler.help = ['cninfo'];
handler.tags = ['information'];
handler.command = ['cninfo'];

export default handler;
