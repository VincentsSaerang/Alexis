const { MessageEmbed } = require("discord.js")
const {good, error} = require("../../util/colors.json")
const nekos = require("nekos.life")
const neko = new nekos()


module.exports = {
    command: "hug",
    name: "Hug",
    category: "fun",
    description: "Hugs an user",
    usage: "hug (user)",
    accessible: "Members",
run: async (client, message, args) => {
    const img = await (await neko.sfw.hug()).url

    let extraArgs = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** You provided too many args!`)
    .setColor(error)

    let embed = new MessageEmbed()
    .setTitle(`${message.member.displayName} hugged ${message.mentions.members.first().displayName}! :hugging:`)
    .setImage(img)
    .setColor(good)

    if(!args[0]) return message.channel.send(extraArgs)
    message.channel.send(embed)
}
}