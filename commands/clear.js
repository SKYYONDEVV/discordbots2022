const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    let cr = args[0]
  if(!cr)return message.reply("Hoeveel Oude Berichten wil je verwijderen?")
  if(isNaN(cr))return message.reply("Argument is geen nummer")
  if(cr > 100)return message.reply("Je kunt het bericht niet verwijderen dan 100 berichten")
  if(cr < 1)return message.reply("Je kunt het bericht niet verwijderen dan 1 bericht")
  
  message.channel.bulkDelete(cr)
  message.channel.send(`${message.author} Heeft ${cr} berichten`).then(m => {
    m.delete({timeout: 3000})
  })
}

module.exports.help = {
    name: 'clear'
}