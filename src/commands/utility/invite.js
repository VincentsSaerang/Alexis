const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 
module.exports = {
    command: "invite",
    name: "Invite",
    usage: "invite",
    description: "Sends a link for inviting Alexis to your server.",
    category: "utility",
    accessible: "Members",
run: async (client, message, args) => {
    let embed = new MessageEmbed()
    .setTitle(`Invite me!`)
    .setDescription(`Invite me to your server! Just click [here](https://top.gg/bot/679036215005020388)`)
    .setColor(good)
    message.channel.send(embed)
}
}
