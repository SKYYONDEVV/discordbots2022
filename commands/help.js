const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    const embed = new discord.MessageEmbed()
    .setColor('RED')
    .setTitle('YOUR NAME')
    .setDescription('Help Desk van YOUR NAME')
    .addFields(
        {name: 'Ban Member:', value: '>ban'},
        {name: 'Kick Member:', value: '>kick'},
        {name: 'Announce:', value: '>announce'},
        {name: 'uptime:', value: '>up'},
        {name: 'Chats Verwijderen', value: '>clear'},
        {name: 'Avatar Profiel', value: '>avatar'},
    )
    .setImage('')
    message.channel.send({ embeds: [embed]})

}

module.exports.help = {
    name: 'help'
}