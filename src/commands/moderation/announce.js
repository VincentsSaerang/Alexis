const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 
module.exports = {
    command: "announce",
    name: "Announce",
    usage: "announce <message>",
    description: "Sends an announcement to the channel specified in the configuration.",
    category: "moderation",
    accessible: "Admins",
run: async (client, message, args) => {
    const db = await client.db.collection("guilds").doc(message.guild.id).get()

    let self = message.author
    let guildself = message.member
    if (guildself.nickname === null || undefined) {
      guildself.nickname = self.username
    }

    let noperms = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** You don't have enough perms!`)
    .setColor(error)

    let noargs = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** You didn't provide a valid message to send!`)
    .setColor(error)

    let noch = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** I couldn't find the announcements channel specified in the server config!`)
    .setColor(error)

    let announcement = new MessageEmbed()
    .setTitle(`New announcement!`)
    .setDescription(args.join(" "))
    .setFooter(`Announcement posted by ${guildself.nickname}`, message.author.displayAvatarURL())
    .setColor(good)
    .setTimestamp()

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(noperms)
    if(!args[0]) return message.channel.send(noargs)
    let channel = message.guild.channels.cache.find(c => c.name === db.data().announcementsChannel)
    if(!channel) return message.channel.send(noch)

    let done = new MessageEmbed()
    .setTitle(`Done!`)
    .setDescription(`Announcement sent to ${channel}`)
    .setColor(good)

    channel.send(announcement).then(message.channel.send(done))

    



}
}