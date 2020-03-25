const { MessageEmbed } = require("discord.js")
const {good, error} = require("../../util/colors.json")
const nekos = require("nekos.life")
const neko = new nekos()


module.exports = {
    command: "cuddle",
    name: "Cuddle",
    category: "fun",
    description: "cuddles an user",
    usage: "cuddle (user)",
    accessible: "Members",
run: async (client, message, args) => {
    const img = await (await neko.sfw.cuddle()).url

    let extraArgs = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** You provided too many args!`)
    .setColor(error)

    let embed = new MessageEmbed()
    .setTitle(`${message.member.displayName} cuddled ${message.mentions.members.first().displayName}! :hugging:`)
    .setImage(img)
    .setColor(good)

    if(!args[0]) return message.channel.send(extraArgs)
    message.channel.send(embed)
}
}