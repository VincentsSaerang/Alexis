const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
const ms = require("ms")
 
module.exports = {
    command: "unmute",
    name: "Un mute",
    usage: "unmute (user)",
    description: "Unmutes an user",
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
    .setDescription(`**ERROR:** You didn't provide a valid user to mute!`)
    .setColor(error)

    let noch = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** I couldn't find the mod log channel specified in the server config!`)
    .setColor(error)

    let user = message.mentions.members.first()
    let moderator = message.author
    let muterole = message.guild.roles.cache.find(r => r.name === db.data().muteRole)
    let modchannel = message.guild.channels.cache.find(channel => channel.name === db.data().modLogChannel)
    if(!user) return message.channel.send(noargs)

    let done = new MessageEmbed()
    .setTitle(`Done!`)
    .setDescription(`User ${user.user.tag} was unmuted by ${moderator}`)
    .setColor(good)

    let modmsg = new MessageEmbed()
    .setTitle(`New moderation activity!`)
    .addField(`Type`, `Unmute`)
    .addField(`Moderator`, moderator)
    .addField(`User`, user)
    .setFooter(`User ID: ${user.id}`, user.user.displayAvatarURL())
    .setTimestamp()
    .setColor(error)

    let dm = new MessageEmbed()
    .setTitle(`Yay!`)
    .setDescription(`You were unmuted from ${message.guild.name}!`)
    .addField(`You were unmuted by`, `${moderator.tag}`)
    .setColor(good)
    .setTimestamp()

    let nodm = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR: User ${user.user.tag} was unmuted, but i couldn't dm him. DM him manually.`)
    .setColor(error)

    let perms = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** I don't have enough permissions for unmuting this user!`)
    .setColor(error)

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(noperms)
    if(!modchannel) return message.channel.end(noch)

    user.createDM().then((dmc) => {
        dmc.send(dm).then(() => {
            user.roles.remove(muterole.id).then(() => {
                message.channel.send(done)
                modchannel.send(modmsg)
            }).catch((e) => {
                return message.channel.send(perms)
            })
        }).catch(e => {
            user.roles.remove(muterole.id).then(() => {
                message.channel.send(nodm)
                modchannel.send(modmsg)
            }).catch((e) => {
                return message.channel.send(perms)
            })
            return;
        })
    })
}
}