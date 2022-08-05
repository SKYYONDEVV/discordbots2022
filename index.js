const { Client, Intents, Collection, Interaction } = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const Discord = require("discord.js");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log(`🔨 || Het Bestand: ${command.help.name}.js Is Succesvol opgestart! || 🔨`);

}

client.on("ready", async () => {
    console.log(`${client.user.username} is online!`);
    let statuses = [`Bot gemaakt in JS`, `Word ingesteld`]
    setInterval(function () {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, { type: "WATCHING" });
    }, 5000)
});

client.on("messageCreate", async message => {

    if (message.author.bot) return;

    var prefix = config.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    const commandData = client.commands.get(command.slice(prefix.length));

    if (!commandData) return;

    var arguments = messageArray.slice(1);

    try {

        await commandData.run(client, message, arguments);

    } catch (error) {
        console.log(error);
        await message.reply("Er is iets fout gegaan met het uitvoeren van deze command!\n\nProbeer later opnieuw!");
    }
});

client.on('guildMemberAdd', guildMember => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'YOUR ROLE');
    const embed = new Discord.MessageEmbed()
        .setColor("#9e85f0")
        .setTitle('👋 **Welkom bij YOUR NAME**!')
        .setThumbnail("YOUR THUMBNAIL LINK")
        .setDescription(`Welkom <@${guildMember.user.id}>, leuk dat je __**YOUR NAME**__ gejoined bent!`)
        .addField('👤 __**Members:**__', `Wij hebben nu: **${guildMember.guild.memberCount}** leden!`, true)
        .setFooter('© YOUR NAME', 'YOUR LOGO LINK') 
        .setTimestamp()
    guildMember.guild.channels.cache.get('CHANNEL ID').send(embed)
    guildMember.roles.add(welcomeRole);
});

client.login(config.token);