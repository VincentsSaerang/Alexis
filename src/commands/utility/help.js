const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
const { readdirSync } = require("fs")
const path = require("path")
 
module.exports = {
    command: "help",
    name: "Help",
    usage: "help [command]",
    description: "Shows a list with all available commands",
    category: "utility",
    accessible: "Members",
run: async (client, message, args) => {
    const db = await client.db.collection("guilds").doc(message.guild.id).get()

    if(!args[0]) {
        const categories = readdirSync(path.join(__dirname, '../../commands/'))

        let embed = new MessageEmbed()
        .setTitle(`List of available commands (${client.commands.size})`)
        .setColor(good)
        .setFooter(`Do ${db.data().prefix}help (command) for getting more information`)

        categories.forEach(category => {
            const dir = client.commands.filter(c => c.category === category)
            const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)

            try {
                embed.addField(`${capitalise} [${dir.size}]:`, dir.map(c => `${c.name}`).join(", "))
            } catch(e) {
                console.log(e)
            }
        })
        return message.channel.send(embed)
    }

    if(args[0]) {
        let usercmd = args.join(" ").toLowerCase()
        let cmd = client.commands.find(c => c.name.toLowerCase() === usercmd)

        if(!cmd) {
            let embed = new MessageEmbed()
            .setTitle(`Error!`)
            .setDescription(`**ERROR:** The command ${usercmd} doesnt exist!\nRun \`${db.data().prefix}help\` for a list of available commands!`)
            .setColor(error)

            return message.channel.send(embed)
        }

        let embed = new MessageEmbed()
        .setTitle(`Information for command ${cmd.name}`)
        .addField(`Name`, cmd.name)
        .addField(`Description`, cmd.description)
        .addField(`Usage`, `${db.data().prefix}${cmd.usage}`)
        .addField(`Accessible by`, cmd.accessible)
        .addField(`Aliases`, `${cmd.aliases ? cmd.aliases.join(", ") : "None"}`)
        .setColor(good)
        .setFooter(`In the usage field, arguments between round brackets are required, and arguments between square brackets are optional.`)
        return message.channel.send(embed)
    }
}
}