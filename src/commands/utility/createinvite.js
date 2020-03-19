const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 
module.exports = {
    command: "createinvite",
    name: "Create invite",
    usage: "createinvite",
    description: "Creates a permanent server invite.",
    category: "utility",
    accessible: "Members",
run: async (client, message, args) => {

    let noperms = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** I couldn't create the invite! Do i have enough perms?`)
    .setColor(good)


    message.channel.createInvite().then((invite) => {
        let embed = new MessageEmbed()
        .setTitle(`Done`)
        .setDescription(`You created a permanent server invite of channel \`${message.channel.name}\``)
        .addField(`Link`, invite.url)
        .setColor(good)
        message.channel.send(embed)
    }).catch((e) => {
        message.channel.send(noperms)
    })


}
}