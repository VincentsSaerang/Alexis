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
    .setDescription(`Invite me to your server! Just click [here](https://discordapp.com/api/oauth2/authorize?client_id=679036215005020388&permissions=2147483127&scope=bot)`)
    .setColor(good)
    message.channel.send(embed)
}
}