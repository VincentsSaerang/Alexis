const { MessageEmbed } = require("discord.js")
const {good, error} = require("../../util/colors.json")


module.exports = {
    command: "dice",
    name: "Dice",
    category: "fun",
    description: "Rolls a dice. You can choose as many sides as you want.",
    usage: "dice (sides)",
    accessible: "Members",
run: async (client, message, args) => {
    const sides = args[0]
    let side = Math.floor(Math.random() * sides) + 1

    let err = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** You need to provide a valid number of sides!`)
    .setColor(error)

    if(!sides || isNaN(sides)) return message.channel.send(err)

    let embed = new MessageEmbed()
    .setTitle(`Dice Rolled!`)
    .setDescription(`You rolled a dice with **${sides}** sides. And it rolled the number \`${side}\``)
    .setColor(good)

    message.channel.send(embed)
}
}