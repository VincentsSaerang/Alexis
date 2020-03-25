const { MessageEmbed } = require("discord.js")
const {good, error} = require("../../util/colors.json")
const nekos = require("nekos.life")
const neko = new nekos()


module.exports = {
    command: "neko",
    name: "Neko",
    category: "fun",
    description: "Sends a neko gif",
    usage: "neko",
    accessible: "Members",
run: async (client, message, args) => {
    const img = await (await neko.sfw.nekoGif()).url

    let extraArgs = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** You provided too many args!`)
    .setColor(error)

    let embed = new MessageEmbed()
    .setTitle(`${message.member.displayName} asked for a neko! :cat:`)
    .setImage(img)
    .setColor(good)

    if(args[0]) return message.channel.send(extraArgs)
    message.channel.send(embed)
}
}