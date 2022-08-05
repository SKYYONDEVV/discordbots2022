const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix) => {

    if(!message.member.permissions.has('MANAGE_SERVER')){
        const failedEmbed = new Discord.MessageEmbed()
            .setDescription(`U heeft geen rechten om een serverbericht te verzenden!`)
            .setColor("#DD0000")
        return message.channel.send({ embeds: [failedEmbed] })
    }

    message.delete()

    const missingArgs = new Discord.MessageEmbed()
        .setDescription(`U bent vergeten tekst in te voeren! Probeer het opnieuw.\nGebruik: \`!announce uw-bericht\``)
        .setColor("#DD0000")   

    const text = args.join(" ")
    if(!text){ return message.channel.send({ embeds: [missingArgs] })}

    const embed = new Discord.MessageEmbed()
        .setDescription(text)
        .setColor("#DD0000")
    message.channel.send({ embeds: [embed] })

}

module.exports.help = {
    name: 'announce'
}