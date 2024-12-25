'use strict';

import os from 'os';
import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import cfonts from 'cfonts';

const { say } = cfonts;

// Styled terminal output
say("SaMu ", {
  font: "block",
  align: "center",
  colors: ['#ff9900'],
  background: "transparent",
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: '15'
});

say("SaMu-BOT By SaMu", {
  font: "chrome",
  align: "center",
  colors: ["red", "magenta"],
  background: "transparent",
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: '30'
});

// Initialize Express
const app = express();
const port = process.env.PORT || 8080;

// Ensure cross-platform compatibility for file paths
const __dirname = path.dirname(decodeURIComponent(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1'));

// Serve static HTML files from "Assets" folder
const htmlDir = path.join(__dirname, 'Assets');
app.use(express.static(htmlDir));

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(htmlDir, "thegreat.html"));
});

// Start the server
app.listen(port, () => {
  console.log(chalk.green(`Server is running on port ${port}`));
});

let isRunning = false;

// Function to start/restart the child process
async function start(scriptName) {
  if (isRunning) return;
  isRunning = true;

  const scriptPath = path.join(__dirname, scriptName);

  const childProcess = spawn(process.argv[0], [scriptPath, ...process.argv.slice(2)], {
    stdio: ["inherit", "inherit", "inherit", "ipc"]
  });

  // Handle messages from child process
  childProcess.on("message", msg => {
    console.log(chalk.cyan(`✔️ RECEIVED: ${msg}`));
    if (msg === "reset") {
      childProcess.kill();
      isRunning = false;
      start(scriptName);
    }
  });

  // Handle child process exit
  childProcess.on("exit", exitCode => {
    isRunning = false;
    console.error(chalk.red(`❌ Process exited with code: ${exitCode}`));
    if (exitCode !== 0) {
      fs.watchFile(scriptPath, () => {
        fs.unwatchFile(scriptPath);
        start(scriptName);
      });
    }
  });

  // Handle errors
  childProcess.on("error", err => {
    console.error(chalk.red(`Error: ${err}`));
    childProcess.kill();
    isRunning = false;
    start(scriptName);
  });

  // Plugins Management
  const pluginsDir = path.join(__dirname, "plugins");
  fs.readdir(pluginsDir, async (err, files) => {
    if (err) {
      console.error(chalk.red(`Error reading plugins folder: ${err}`));
      return;
    }
    console.log(chalk.yellow(`Installed ${files.length} plugins`));
    try {
      const { default: baileys } = await import("@whiskeysockets/baileys");
      const latestBaileysVersion = (await baileys.fetchLatestBaileysVersion()).version;
      console.log(chalk.yellow(`Using Baileys version ${latestBaileysVersion}`));
    } catch (err) {
      console.error(chalk.red("Baileys library is not installed or failed to fetch version."));
    }
  });
}

// Start the bot
start('./thegreat.js');

// Graceful error handling
process.on("unhandledRejection", err => {
  console.error(chalk.red("Unhandled promise rejection:", err));
  start("./thegreat.js");
});

process.on("exit", code => {
  console.error(chalk.red(`Process exited with code: ${code}. Restarting...`));
  start("./thegreat.js");
});
