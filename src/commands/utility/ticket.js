const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 
module.exports = {
    command: "ticket",
    name: "Ticket",
    usage: "ticker (type) (message)",
    description: "Sends an idea or a bug to the developer team",
    category: "utility",
    accessible: "Members",
run: async (client, message, args) => {
    const q = await client.db.collection("guilds").doc(message.guild.id).get()

    if(!args[0] || args[0] !== ("bug" || "idea")) {
        let embed = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`Please, please provide a valid type of ticket (\`idea\` or \`bug\`)`)
        .setColor(error)
        message.channel.send(embed)
    }
    if(args[0] === "idea") {
        if(!args[1]) {
            let embed = new MessageEmbed()
            .setTitle(`Error!`)
            .setDescription(`**ERROR:** You need to provide a valid idea!`)
            .setColor(error)
            return message.channel.send(embed)
        }
        let embed = new MessageEmbed()
        .setTitle(`Done!`)
        .setDescription(`Your idea has been sent to our dev team and they will answer you ASAP!`)
        .setColor(good)
        message.channel.send(embed)
        client.channels.cache.get("681266588963700736").send(
            new MessageEmbed()
            .setTitle(`New ticket!`)
            .addField(`Type`, `Idea / Suggestion`)
            .addField(`Content`, `\`${args.slice(1).join(" ")}\``)
            .addField(`Sent by`, `${message.author} **User ID:** ${message.author.id}`)
            .addField(`Sent from`, `${message.guild.name} (${message.guild.id})`)
            .setColor(good)
            .setTimestamp()
            .setFooter(`Answer to this ticket by doing \`${q.data().prefix}aticket ${message.author.id} <answer>\` (you need to be a developer)`, message.author.displayAvatarURL())
          )
    } else if(args[0] === "bugs") {
        if(!args[1]) {
            let embed = new MessageEmbed()
            .setTitle(`Error!`)
            .setDescription(`**ERROR:** You need to provide a valid bug / issue!`)
            .setColor(error)
            return message.channel.send(embed)
        }
        let embed = new MessageEmbed()
        .setTitle(`Done!`)
        .setDescription(`Your bug / issue has been sent to our dev team and they will answer you ASAP!`)
        .setColor(good)
        message.channel.send(embed)
        client.channels.cache.get("681266588963700736").send(
            new MessageEmbed()
            .setTitle(`New ticket!`)
            .addField(`Type`, `Bug / Issue`)
            .addField(`Content`, `\`${args.slice(1).join(" ")}\``)
            .addField(`Sent by`, `${message.author} **User ID:** ${message.author.id}`)
            .addField(`Sent from`, `${message.guild.name} (${message.guild.id})`)
            .setColor(good)
            .setTimestamp()
            .setFooter(`Answer to this ticket by doing \`${q.data().prefix}aticket ${message.author.id} <answer>\` (you need to be a developer)`, message.author.displayAvatarURL())
          )
    } 

}
}