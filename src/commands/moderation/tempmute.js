const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
const ms = require("ms")
 
module.exports = {
    command: "tempmute",
    name: "Temp mute",
    usage: "tempmute (user) [time] [reason]",
    description: "Makes an user unable to chat",
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
    let reason = args.slice(2).join("")
    let mutetime = args[1]
    let muterole = message.guild.roles.cache.find(r => r.name === db.data().muteRole)
    let modchannel = message.guild.channels.cache.find(channel => channel.name === db.data().modLogChannel)
    if(!user) return message.channel.send(noargs)
    if(!reason) reason = "No reason provided."
    if(!mutetime) mutetime = "1m"

    let done = new MessageEmbed()
    .setTitle(`Done!`)
    .setDescription(`User ${user.user.tag} was muted by ${moderator} for **${reason}** during ${mutetime}`)
    .setColor(good)

    let modmsg = new MessageEmbed()
    .setTitle(`New moderation activity!`)
    .addField(`Type`, `Mute`)
    .addField(`Moderator`, moderator)
    .addField(`User`, user)
    .addField(`Time`, mutetime)
    .addField(`Reason`, reason)
    .setFooter(`User ID: ${user.id}`, user.user.displayAvatarURL())
    .setTimestamp()
    .setColor(error)

    let dm = new MessageEmbed()
    .setTitle(`Oops!`)
    .setDescription(`You were muted from ${message.guild.name}!`)
    .addField(`You were muted by`, `${moderator.tag}`)
    .addField(`You are muted for`, mutetime)
    .addField(`Reason`, reason)
    .setColor(error)
    .setTimestamp()

    let nodm = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR: User ${user.user.tag} was muted, but i couldn't dm him. DM him manually.`)
    .setColor(error)

    let perms = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** I don't have enough permissions for muting this user!`)
    .setColor(error)

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(noperms)
    if(!modchannel) return message.channel.end(noch)
    if(!muterole) {
        message.guild.roles.create({
            name: db.data().muteRole,
            color: "#000000",
            permissions: []
        })
        message.guild.channels.cache.forEach(async (channel) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
        })
    }

    user.createDM().then((dmc) => {
        dmc.send(dm).then(() => {
            user.roles.add(muterole.id).then(() => {
                message.channel.send(done)
                modchannel.send(modmsg)
            }).catch((e) => {
                return message.channel.send(perms)
            })
        }).catch(e => {
            user.roles.add(muterole.id).then(() => {
                message.channel.send(nodm)
                modchannel.send(modmsg)
            }).catch((e) => {
                return message.channel.send(perms)
            })
            return;
        })
    })
    setTimeout(function () {
        user.roles.remove(muterole.id)
    }, ms(mutetime))
}
}