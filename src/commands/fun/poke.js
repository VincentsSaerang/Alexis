const { MessageEmbed } = require("discord.js")
const {good, error} = require("../../util/colors.json")
const nekos = require("nekos.life")
const neko = new nekos()


module.exports = {
    command: "poke",
    name: "Poke",
    category: "fun",
    description: "Pokes an user",
    usage: "poke (user)",
    accessible: "Members",
run: async (client, message, args) => {
    const img = await (await neko.sfw.poke()).url

    let extraArgs = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** You provided too many args!`)
    .setColor(error)

    let embed = new MessageEmbed()
    .setTitle(`${message.member.displayName} pocked ${message.mentions.members.first().displayName}! :point_right:`)
    .setImage(img)
    .setColor(good)

    if(!args[0]) return message.channel.send(extraArgs)
    message.channel.send(embed)
}
}