var mineflayer = require('mineflayer');
var fs = require('fs');
const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
const keepAlive = require("./server");
const superagent = require("superagent")
const util = require('minecraft-server-util');
const ms = require('ms');
require('dotenv').config();
const { username, livechat } = require('./config.json');

const config = { // woah!! .env!!
  token: process.env.DISCORD_TOKEN,
  pin: process.env.PIN
};

client.on('ready', () => {
  console.log(`${client.user.tag} đang hoạt động`);
});

createBot();
function createBot() {
  const bot = mineflayer.createBot({
    host: 'anarchyvn.net',
    port: 25565,
    username: username,
    version: "1.17.1"
  });
  bot.on('windowOpen', async (window) => { // login cơ bản.
    window.requiresConfirmation = false;
    bot.clickWindow(config.pin.split(" ")[0], 0, 0)
    bot.clickWindow(config.pin.split(" ")[1], 0, 0)
    bot.clickWindow(config.pin.split(" ")[2], 0, 0)
    bot.clickWindow(config.pin.split(" ")[3], 0, 0)
    setTimeout(() => { bot.chat('/anarchyvn') }, ms(`5s`))
    setTimeout(() => { bot.clickWindow(13, 0, 0); }, ms(`5s`));
 // setInterval(() => { bot.chat (`Hãy sử dụng lệnh ,help để có commands! [${randomnum}]`)},ms(`1200s`)); (add this neu ban muon)
  });
  bot.once('login', () => {
    bot.once('spawn', () => {
      const spawn = new MessageEmbed()
        .setDescription(`**Bot đã đăng nhập vào server**`)
        .setColor('GREEN')
      client.channels.cache.get(livechat).send(spawn)
      console.log("Bot đã đăng nhập vào server");
      setInterval(() => {
        bot.swingArm("left");
        bot.look(Math.floor(Math.random() * Math.floor("360")), 0, true, null);
      }, 1 * 60 * 1000);
    });
  });
  var reconnect = 1;
  bot.on('end', (reason) => {
    const end = new MessageEmbed()
      .setDescription(`**Bot mất kết nối server, lý do: \`${reason}\`\, kết nối lại sau ${reconnect} giây**`)
      .setColor('RED')
    client.channels.cache.get(livechat).send(end)
    console.log(`Bot mất kết nối server, lý do: ${reason}, kết nối lại sau ${reconnect}s`);
    setTimeout(() => {
      const relog = new MessageEmbed()
        .setDescription(`**Đang kết nối lại server...**`)
        .setColor('YELLOW')
      client.channels.cache.get(livechat).send(relog)
      console.log("Đang kết nối lại server...");
      createBot();
    }, ms(`${reconnect}s`))
  });
  bot.on('message', message => {
    console.log(message.toString())
    const embed = new MessageEmbed()
      .setDescription(message.toString())
      .setColor('WHITE')
    client.channels.cache.get(livechat).send(embed)
  });
// an example of an command
bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if (message === ',bulon') { // input tu chat
      bot.chat(`them bu lon qua!! | | ${randomnum}`) // output tu chat ban hieu chua
    }
  })

  client.on('message', async message => { // discord to minecraft
    if (!message.guild) return;
    if (message.author.bot || message.author.id === client.user.id) return;
    if (message.channel.id === livechat) {
      message.react('❤');
      bot.chat(`[${message.author.tag}] ${message.content}`) // Yêu cầu bot bật sẵn MESSAGE CONTENT INTENT không thì Discord -> Minecraft chat sẽ không được.
    }

// TRASH CODE INCOMING ALLAHU AKBAR!!!!
			var string = `1 2 3 4 5 6 6 7 8 9 0`;
			var words = string.split(' ');
            let random1 = words[Math.floor(Math.random() * words.length)];
            let random2 = words[Math.floor(Math.random() * words.length)];
            let random3 = words[Math.floor(Math.random() * words.length)];
            let random4 = words[Math.floor(Math.random() * words.length)];
            let random5 = words[Math.floor(Math.random() * words.length)];
            let random6 = words[Math.floor(Math.random() * words.length)];
            let random7 = words[Math.floor(Math.random() * words.length)];
            let random8 = words[Math.floor(Math.random() * words.length)];
            let random9 = words[Math.floor(Math.random() * words.length)];
            let random10 = words[Math.floor(Math.random() * words.length)];
            var randomnum = `${random1}${random2}${random3}${random4}${random5}${random6}${random7}${random8}${random9}${random10}`
            // example :
            // bot.chat(`[${message.author.tag}] ${message.content} | ${randomnum}`) thi output ra
            // output : [thuy#5407] uk toi yeu sex | 1234567890

keepAlive();
client.login(config.token);
