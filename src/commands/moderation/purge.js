const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 
module.exports = {
    command: "purge",
    name: "Purge",
    usage: "purge (amount)",
    description: "Delete an amount of messages",
    category: "moderation",
    accessible: "Moderators",
    aliases: ["delmsgs", "delmessages", "deletemessages", "deletemsgs"],
run: async (client, message, args) => {

    let guildself = message.guild.member(message.author)
    if (guildself.nickname === null) {
      guildself.nickname = message.author.username
    }

    let noperms = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** You don't have enough perms!`)
    .setColor(error)

    let noargs = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** You didn't provide a valid amount of messages to purge!`)
    .setColor(error)

    let done = new MessageEmbed()
    .setTitle(`Done!`)
    .setDescription(`I have deleted \`${args[0]}\` messages from this channel`)
    .setFooter(`Purge requested by ${guildself.nickname}`)
    .setColor(good)

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(noperms)
    let messages = parseInt(args[0]) + 1
    if (isNaN(messages)) return message.channel.send(noargs).then(message.delete({timeout: "2000"})).then(sentMessage => sentMessage.delete({timeout: "2000"}))
    if (!args[0]) return message.channel.send(noargs).then(message.delete({timeout: "2000"})).then(sentMessage => sentMessage.delete({timeout: "2000"}))

    let fetch = await message.channel.messages.fetch({ limit: messages })
    message.channel.bulkDelete(fetch)
    let answer = await message.channel.send(done).then(message.delete({timeout: "2000"})).then(sentMessage => sentMessage.delete({timeout: "2000"}))
}
}