const main = require('../app.js');
const {RichEmbed} = require('discord.js');
const reactions = require('../reactions.json');
const moment = require('moment');

exports.run = async (client, message) => {
  const user = message.author;
  main.scores.findOne({ userId : { $gte: user.id }}, function (err, res) {
    if (err) return console.log(err);
    var row = res;
    if (row) {
      runDailies(row, message);
    } else {
      main.scores.insertOne({userId: user.id, exp: 0, level: 0, credits: 0, claimed: null}, function (error) {
        if (error) return console.log(err);
        runDailies(row, message);
        return;
      });
    }
  });
};


// Helper method
function runDailies(row, message) {
  const user = message.author;
  if (row['claimed'] === moment().format('L')) {
    return message.channel.send(`You have already claimed your dailies today, ${user.username}`).catch(console.error);
  }

  main.scores.update({ userId:user.id }, { $set: { claimed: moment().format('L') } }).catch(error => console.log(error));

  const money = row['credits'];

  main.scores.update({ userId:user.id }, { $set: { credits: (row['credits'] + 100) } }).catch(error => console.log(error));

  const embed = new RichEmbed()
    .setColor(0xF18E8E)
    .setTitle(`${user.username}\'s dailies~`)
    .setThumbnail(reactions.closedeyes)
    .setDescription(`${user.username}, **$100** has been added to your account! You now have **\$${money + 100}** 💰`);
  message.channel.send({embed});
}

// Command metadata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hollahollagetdolla'],
  permLevel: 0
};

exports.help = {
  name: 'dailies',
  description: 'Gives you $100. You can claim it again the next day as soon as the date changes',
  usage: 'dailies',
  type: 'level/credits system'
};
