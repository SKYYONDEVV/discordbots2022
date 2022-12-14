const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    let target;

    if (message.mentions.users.first()) {
      target = message.mentions.users.first();
    } else if (args[0]) {
      target = message.guild.members.cache.get(args[0]).user;
    } else {
      target = message.author;
    }

    let avatar = target.displayAvatarURL({ dynamic: true, size: 2048 });

    let embed = new Discord.MessageEmbed();

    embed.setDescription(`[Download Avatar](${avatar})`);
    embed.setImage(avatar);
    embed.setColor("RANDOM");
    message.channel.send({ embeds: [embed]})
  }

module.exports.help = {
    name: 'avatar'
}