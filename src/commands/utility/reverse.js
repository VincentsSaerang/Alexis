const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
const reverse = require("reverse-text")
 
module.exports = {
    command: "reverse",
    name: "Reverse",
    usage: "reverse (text)",
    description: "Reverse some text.",
    category: "utility",
    accessible: "Member",
    aliases: ["reversetext"],
run: async (client, message, args) => {

    const text = args.join("")

    if(!args[0]) {
        let embed = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`**ERROR:** You need to provide a valid text to reverse!`)
        .setColor(error)

        message.channel.send(embed)
    }
    const reversed = reverse(text)

    let embed = new MessageEmbed()
    .setTitle(`Text reversed`)
    .addField(`Result`, reversed)
    .setColor(good)

    message.channel.send(embed)
}
}