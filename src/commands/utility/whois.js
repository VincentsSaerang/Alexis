const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 
module.exports = {
    command: "whois",
    name: "Who is",
    usage: "whois [user]",
    description: "Get info about you or another user.",
    category: "utility",
    accessible: "Members",
run: async (client, message, args) => {
    if(!args[0]) {
        let self = message.author
        let guildself = message.member
        let selfdate = self.createdAt
        let selfstatus;
        if (self.presence.status === "dnd") {
          selfstatus = "Do not Disturb"
        }
        if (self.presence.status === "online") {
          selfstatus = "Online"
        }
        if (self.presence.status === "idle") {
          selfstatus = "Idle"
        }
        if (self.presence.status === "offline") {
          selfstatus = "Offline"
        }
        let response = new MessageEmbed()
        .setTitle(`Who is ${guildself.displayName}?`)
        .addField(`Username`, self.username, true)
        .addField(`ID`, self.id, true)
        .addField(`Account created at`, selfdate.toLocaleDateString(), true)
        .addField(`Status`, selfstatus, true)
        .addField('\u200b', '\u200b')
        .addField(`Nickname`, guildself.displayName, true)
        .addField(`Roles`, `${guildself.roles.cache.filter(r => r.name !== "@everyone").map(role => role.name).join(", ")}`, true)
        .addField(`Joined at`, guildself.joinedAt.toLocaleDateString(), true)
        .setColor(good)
        .setThumbnail(self.displayAvatarURL())
        if(self.presence.game) {
            response.addField('\u200b', '\u200b')
            response.addField(`Playing`, self.presence.game.name)
        }
        return message.channel.send(response)
    } else if(message.mentions.members.first !== undefined) {
        let self = message.mentions.members.first().user
        let guildself = message.mentions.members.first()
        let selfdate = self.createdAt
        let selfstatus;
        if (self.presence.status === "dnd") {
          selfstatus = "Do not Disturb"
        }
        if (self.presence.status === "online") {
          selfstatus = "Online"
        }
        if (self.presence.status === "idle") {
          selfstatus = "Idle"
        }
        if (self.presence.status === "offline") {
          selfstatus = "Offline"
        }
        let response = new MessageEmbed()
        .setTitle(`Who is ${guildself.dislayName}?`)
        .addField(`Username`, self.username, true)
        .addField(`ID`, self.id, true)
        .addField(`Account created at`, selfdate.toLocaleDateString(), true)
        .addField(`Status`, selfstatus, true)
        .addField('\u200b', '\u200b')
        .addField(`Nickname`, guildself.displayName, true)
        .addField(`Roles`, `${guildself.roles.cache.filter(r => r.name !== "@everyone").map(role => role.name).join(", ")}`, true)
        .addField(`Joined at`, guildself.joinedAt.toLocaleDateString(), true)
        .setColor(good)
        .setThumbnail(self.displayAvatarURL())
        if(self.presence.game) {
            response.addField('\u200b', '\u200b')
            response.addField(`Playing`, self.presence.game.name)
        }
        return message.channel.send(response)
    } else {
        let embed = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`**ERROR:** You need to mention a valid user!`)
        .setColor(error)

        message.channel.send(embed)
    }
}
}