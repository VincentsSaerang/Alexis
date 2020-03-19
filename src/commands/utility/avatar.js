const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 
module.exports = {
    command: "avatar",
    name: "Avatar",
    usage: "avatar [user]",
    description: "Shows your (or some user's) avatar.",
    category: "utility",
    accessible: "Members",
run: async (client, message, args) => {
    if(!args[0]) {
        let embed = new MessageEmbed()
        .setTitle(`Showing avatar of ${message.member.nickname ? message.member.nickname : message.author.username}`)
        .setImage(message.author.displayAvatarURL())
        .setColor(good)
        .setFooter(`You can download this image by right-clicking it and selecting "Open link"`)

        message.channel.send(embed)
    } else if(message.mentions.members.first() !== undefined) {
        let embed = new MessageEmbed()
        .setTitle(`Showing avatar of ${message.mentions.members.first().nickname ? message.mentions.members.first().nickname : message.mentions.members.first().user.username}`)
        .setImage(message.mentions.members.first().user.displayAvatarURL())
        .setColor(good)
        .setFooter(`You can download this image by right-clicking it and selecting "Open link"`)
        
        message.channel.send(embed)
    } else {
        let embed = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`**ERROR:** You need to provide a valid user!`)
        .setColor(error)

        message.channel.send(embed)
    }
}
}