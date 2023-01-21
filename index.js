
var mineflayer = require('mineflayer');
var fs = require('fs');
const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
const tpsPlugin = require('mineflayer-tps')(mineflayer); // tps plugin for command !tps
const keepAlive = require("./server");
const superagent = require("superagent")
const util = require('minecraft-server-util');
const ms = require('ms');
require('dotenv').config();
const { username, livechat } = require('./config.json');

const config = {
  token: process.env.DISCORD_TOKEN,
  pin: process.env.PIN,
  prefix: process.env.PREFIX
};

client.on('ready', () => {
  console.log(`${client.user.tag} đang hoạt động...`);
  client.user.setActivity('anarchyvn.', { type: 'PLAYING' }); // discord status
});

createBot();
function createBot() {
  const bot = mineflayer.createBot({
    host: 'anarchyvn.net',
    port: 25565,
    username: username,
    version: "1.17.1"
  });
  bot.on('windowOpen', async (window) => {
    window.requiresConfirmation = false;
    bot.clickWindow(config.pin.split(" ")[0], 0, 0)
    bot.clickWindow(config.pin.split(" ")[1], 0, 0)
    bot.clickWindow(config.pin.split(" ")[2], 0, 0)
    bot.clickWindow(config.pin.split(" ")[3], 0, 0)
    setTimeout(() => { bot.chat('/anarchyvn') }, ms(`5s`))
    setTimeout(() => { bot.clickWindow(13, 0, 0); }, ms(`5s`));
  });

bot.loadPlugin(tpsPlugin) // load plugin

  bot.once('login', () => {
    bot.once('spawn', () => {
      const spawn = new MessageEmbed()
        .setDescription(`**Bot đã thành công truy cập vào server.**`)
        .setColor('GREEN')
      client.channels.cache.get(livechat).send(spawn)
      console.log("Đã đăng nhập. Bắt đầu làm việc.");
      setInterval(() => {
        bot.swingArm("left");
        bot.look(Math.floor(Math.random() * Math.floor("360")), 0, true, null);
      }, 1 * 60 * 1000);
    });
  });
  var reconnect = 1;
  bot.on('end', (reason) => {
    const end = new MessageEmbed()
      .setDescription(`**Bot đã bị mất kết nối, lý do: \`${reason}\`\, kết nối lại sau ${reconnect} giây**`)
      .setColor('RED')
    client.channels.cache.get(livechat).send(end)
    console.log(`Đụ mẹ owner, lý do mất kết nối: ${reason}, kết nối lại sau ${reconnect}s`);
    setTimeout(() => {
      const relog = new MessageEmbed()
        .setDescription(`**Đang kết nối lại với server...**`)
        .setColor('YELLOW')
      client.channels.cache.get(livechat).send(relog)
      console.log("oke tao vào lại đây");
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
  
  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if (message === config.prefix + 'tps') {
      bot.chat('ronaldo siuuu btw the tps is : ' + bot.getTps ())
    }
  })

  bot.on('chat', (username, message) => { // co thang bao dung meteor de lay ping how wtf
    if (username === bot.username) return
    if (message === config.prefix + 'ping') {
      bot.chat(`your ping is : ${bot.player.ping}ms`)
    }
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if (message === config.prefix + 'help') {
      bot.chat(`/w ${username} tps, ping | | mrdambot`)
    }
  })

  client.on('message', async message => {
    if (!message.guild) return;
    if (message.author.bot || message.author.id === client.user.id) return;
    if (message.channel.id === livechat) {
      message.react('❤');
      bot.chat(`[${message.author.tag}] ${message.content} | mrdambot`)
    }
  })
}

keepAlive();
client.login(config.token);
