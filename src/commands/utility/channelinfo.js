const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 
module.exports = {
    command: "channelinfo",
    name: "Channel info",
    usage: "channelinfo (channel)",
    description: "Get some channel's info",
    category: "utility",
    accessible: "Members",
    aliases: ["chinfo"],
run: async (client, message, args) => {
    let channel = message.mentions.channels.first()
    let chtype;

    if(!channel || channel === undefined) {
        let embed = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`**ERROR:** You need to provide a valid channel!`)
        .setColor(error)
        message.channel.send(embed)
    } else {
        switch(channel.type) {
            case "text":
              chtype = "Text Channel"
              break;
            case "voice":
              chtype = "Voice Channel"
              break;
            case "news":
              chtype = "News Channel"
              break;
          }
        let embed = new MessageEmbed()
        .setTitle(`Showing channel information!`)
        .addField(`Name`, channel.name, true)
        .addField(`ID`, channel.id, true)
        .addField(`Parent Name`, channel.parent.name, true)
        .setColor(good)
        message.channel.send(embed)
    }

}
}