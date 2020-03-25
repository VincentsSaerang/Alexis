const { MessageEmbed } = require("discord.js")
const {good, error} = require("../../util/colors.json")
const nekos = require("nekos.life")
const neko = new nekos()


module.exports = {
    command: "meow",
    name: "Meow",
    category: "fun",
    description: "Sends a meow gif",
    usage: "meow",
    accessible: "Members",
run: async (client, message, args) => {
    const img = await (await neko.sfw.meow()).url

    let extraArgs = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** You provided too many args!`)
    .setColor(error)

    let embed = new MessageEmbed()
    .setTitle(`${message.member.displayName} meowed! :cat:`)
    .setImage(img)
    .setColor(good)

    if(args[0]) return message.channel.send(extraArgs)
    message.channel.send(embed)
}
}