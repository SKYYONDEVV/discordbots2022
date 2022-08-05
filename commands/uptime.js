const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

        let Days = Math.floor(client.uptime / 86400000);
        let Hours = Math.floor(client.uptime / 3600000) % 24;
        let Minutes = Math.floor(client.uptime / 60000) % 60;
        let Seconds = Math.floor(client.uptime / 1000) % 60;    
        const RemoveUseless = (Duration) => {
      return Duration.replace("0 Dagen\n", "").replace("0 Uren\n", "").replace("0 Minuten\n", "");
    };
    let Uptime = await RemoveUseless(`\`${Days}\` ${Days > 1 ? "Dagen" : "Dagen"} \`${Hours}\` ${Hours > 1 ? "Uren" : "Uren"} \`${Minutes}\` ${Minutes > 1 ? "Minuten" : "Minuten"} \`${Seconds}\` ${Seconds > 1 ? "Seconden" : "Seconden"}`);
    
    const embed = new Discord.MessageEmbed() 
    .setTitle(`De Bot is op dit moment:`)
    .setDescription(`${Uptime} Online!`)
    .setTimestamp();

    await message.channel.send({ embeds: [embed]})

}

module.exports.help = {
    name: 'up'
}