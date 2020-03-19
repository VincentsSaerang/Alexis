const { MessageEmbed } = require("discord.js");
const { good, error } = require("../../util/colors.json")

module.exports = async (client, error) => {
    console.error(`[ERROR] ${e}`)
    const embed = new MessageEmbed()
    .setTitle(`ERROR!`)
    .addField(`ERROR`, `\`\`\`${e}\`\`\``)
    .setColor(error)
    .setTimestamp()

    client.channels.fetch("679036515254272000").send(embed)
}