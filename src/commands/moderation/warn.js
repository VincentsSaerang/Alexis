const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 
module.exports = {
    command: "warn",
    name: "Warn",
    usage: "warn (user) [reason]",
    description: "Warn an user from your server",
    category: "moderation",
    accessible: "Moderators",
run: async (client, message, args) => {
    let db = await client.db.collection("guilds").doc(message.guild.id).get()

    let noperms = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** You don't have enough perms!`)
    .setColor(error)

    let noargs = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** You didn't provide a valid user to warn!`)
    .setColor(error)

    let noch = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** I couldn't find the mod log channel specified in the server config!`)
    .setColor(error)

    let invite = await message.channel.createInvite()
    let user = message.mentions.members.first()
    let moderator = message.author
    let reason = args.slice(1).join("")
    let modchannel = message.guild.channels.cache.find(channel => channel.name === db.data().modLogChannel)
    if(!user) return message.channel.send(noargs)
    if(!reason) reason = "No reason provided."

    let done = new MessageEmbed()
    .setTitle(`Done!`)
    .setDescription(`User ${user.user.tag} was warned by ${moderator} for **${reason}**`)
    .setColor(good)

    let modmsg = new MessageEmbed()
    .setTitle(`New moderation activity!`)
    .addField(`Type`, `Warn`)
    .addField(`Moderator`, moderator)
    .addField(`User`, user)
    .addField(`Reason`, reason)
    .setFooter(`User ID: ${user.id}`, user.user.displayAvatarURL())
    .setTimestamp()
    .setColor(error)

    let dm = new MessageEmbed()
    .setTitle(`Oops!`)
    .setDescription(`You were warned from ${message.guild.name}!`)
    .addField(`You were warned by`, `${moderator.tag}`)
    .addField(`Reason`, reason)
    .setColor(error)
    .setTimestamp()

    let nodm = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR: User ${user.user.tag} was warned, but i couldn't dm him. DM him manually.`)
    .setColor(error)

    let perms = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** I don't have enough permissions for warn this user!`)
    .setColor(error)

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(noperms)

    if(!modchannel) return message.channel.end(noch)

    user.createDM().then((dmc) => {
        dmc.send(dm).then(() => {
                message.channel.send(done)
                modchannel.send(modmsg)
        }).catch(e => {
                message.channel.send(nodm)
                modchannel.send(modmsg)
        })
    })
}
}