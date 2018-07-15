const {RichEmbed} = require('discord.js');
const settings = require('../settings.json');
const package = require('../package.json');
const imgs = require('../imgs.json');

exports.run = async (client, message) => {
  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(`Ivy, ${package.description}`)
    .setTimestamp()
    .setImage(imgs.splash)
    .setThumbnail(`${client.user.avatarURL}`)
    .setDescription(`${settings.description}\n\n (Psst! For command details, type \`${settings.prefix}help\` or \`${settings.prefix}help <commandname>\`. The prefix \`${settings.prefix2}\` is fine too if you prefer calling me by my name~ Pinging me with a command works just as fine)`)
    .addField('Prefix(es):', `\`${settings.prefix}\`,   \`${settings.prefix2}\`,   \`${settings.prefix3}\``, true)
    .addField('Bot\'s Version:', `${package.version}`, true)
    .addField('Program language:', 'Javascript', true)
    .addField('Library:', 'Discord.js', true)
    .addField('Engine:', 'Node.js', true)
    .addField('Github:', 'https://github.com/icw-Numen/ivy-bot')
    .setFooter(`Bot and images made with care by ${package.author}`);
  return message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['intro', 'botinfo', 'ivyinfo', 'bot', 'ivy', 'about'],
  permLevel: 0
};

exports.help = {
  name: 'info',
  description: 'Sends an embed with information about the bot',
  usage: 'info',
  type: 'bot'
};