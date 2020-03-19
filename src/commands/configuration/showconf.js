const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 
module.exports = {
    command: "showconf",
    name: "Show configuration",
    usage: "showconf",
    description: "Show server configuration",
    category: "configuration",
    accessible: "Admins",
    aliases: ["showconfiguration", "showconfig"],
run: async (client, message, args) => {
    const db = await client.db.collection("guilds").doc(message.guild.id).get()
    const dbprops = db.data()
    let config = JSON.stringify(db.data(), null, 2)
    config = config.replace(/{/g,"")
    config = config.replace(/}/g,"")
    config = config.replace(/"/g,"")
    config = config.replace(/:/g," --->")
    config = config.replace(/,/g,"")

    const embed = new MessageEmbed()
    .setTitle(`Showing server configuration.`)
    .setDescription(`\`\`\`\n${config}\`\`\``)
    .setColor(good)

    message.channel.send(embed)

}
}