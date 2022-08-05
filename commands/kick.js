const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

   if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("U Heeft geen Toestemming om deze command uit te voeren!");

   if (!args[0]) return message.reply("Geef een Gebruiker op.");

   if (!args[1]) return message.reply("Geef een reden op.");

   var kickUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id);

   if (!kickUser) return message.reply("Gebruiker niet gevonden.");

   if(kickUser.permissions.has("MANAGE_MESSAGES")) return message.reply("Je kan Staff leden niet kicken uit de server!");

   var reason = args.slice(1).join(" ");

   var embed = new discord.MessageEmbed()
       .setTitle("Persoon Gekickt!")
       .setColor("RED")
       .setDescription(`${kickUser} Is Succesvol **Gekicked** van de server!`)
       .addFields(
        {name: 'Reden:', value: `${reason}`},
    )

    message.channel.send({ embeds: [embed] })

    kickUser.kick(reason).catch(err => {
        if (err) return message.channel.send("Er is iets fout gegaan waardoor de command niet werkte! Laat dit weten aan de Developers!");
    });
}

module.exports.help = {
    name: 'kick'
}