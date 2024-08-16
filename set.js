const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkxib2VFQkhuQ1BxTFJyVTlGQjJjOThqUXdzVGxySFdUSXpzNXlBcE8zZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUxJQU5pWm1tWjFMK29obHREMldNQlZaNFF5ZSs5ZUNwQlhOV2E0ZTN6az0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxQWM5bXdxa3Nkb1U3QnFUY0VsaTNJNnAwc3B2bzRhTGtWOWk1STdyaDNBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJseHFHMVRpWmwwQytPQmdCdEF2YVpLNnFuL25wWUk2bnNaUHRzVlVweXpNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFBRWhPeUFXcDg0UUh2RTlHeDlqUGpxTEpFVU1sZ1dmTFBKQlk1b0VyRlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iks3SExCdXJqNkd6MklSOUtoWGVHaDBPbEY5anFzWjNOV2didnc0bi9IQ2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0RKcm5BVjl0MXFFdHc1RWx2eGlRcjlXeWNBTkdEQUpKZExRdmlXbW1IST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidmJ0N3ZOdXhCSkNJcmx0d2xSSWQ0SGI2QzhxSENMeVRmc2N1V21KQ3hpdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZhQzV1aEs4dWo3Q3l4bURSS1BpODhaTzlIaTUxUTg0V0V6QUlZaWNCRGozNUM5N1dmelF4WEZPTUtwQnVEeEtlOU9iZnZFaGtiSmNYMVlLMThCUmhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA3LCJhZHZTZWNyZXRLZXkiOiJac3o2MnEzTzlFWGhpbEhPU0tOcGJRNEVSdFFiWmgwK2FKeTZ1TXlwWU5zPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJhalJ5Vk9uTVN4YXEzVmFRMEFodzd3IiwicGhvbmVJZCI6Ijk3MjY4ZjMzLTEwMjYtNGY0NC04NzljLTQzOGJlZjdkMmEwNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrRXdNU2pLbDhVWGhlVjNkVERlZzd5VGY2Wjg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWpDbHpYT0orUjNYVU1LNjhxUmJCeTNlRnEwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjlORzNTUjFNIiwibWUiOnsiaWQiOiIyNTQxMTA0MjEwMDM6NDhAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01iUnNJUURFSXZOL3JVR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImFGZTV0VEZYcWNiRmlKZVBLWlZUbzA3dGJLTGN5UXlrcFBjVFlTZHpRVHM9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im0zNkxXSjI3ckV5M2szaUJZdHNNMzlDaUNUV3hySURWYmI3ZktwWjFhUlpuazBKb0ZVUU93elQzWHhMcG9TR1AwMlJXZGE2UHNYeHZTQ3U0R0dHdUN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJOMHRpNUIvaVhBZFNQUjlEUHZReUxxVnhhRWRENHA3VUVjcW9tOEY4Q3o1a0ZqOEROSFpIbkd5dFBoaFlsTHV1aDR2OWFDOGFQb0RLaERyd3htWDFqUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDExMDQyMTAwMzo0OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXaFh1YlV4VjZuR3hZaVhqeW1WVTZOTzdXeWkzTWtNcEtUM0UyRW5jMEU3In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzODM2MDU5fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "keithkeizzah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
