const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 
module.exports = {
    command: "aticket",
    name: "Answer ticket",
    usage: "aticket (userid) (message)",
    description: "Answers an user who previously submitted a ticket.",
    category: "owner-only",
    accessible: "Bot Devs",
    aliases: ["answerticket"],
run: async (client, message, args) => {
    let guild = client.guilds.cache.get("679035497565126717")
    let userid = message.author.id

    if (guild.members.cache.get(userid)) {
      if (!guild.members.cache.get(userid).roles.cache.get("679037602984230922")) {
        message.channel.send(
          new MessageEmbed()
          .setTitle(`Command execution failed!`)
          .setDescription(`You need to be a developer of Alexis to run this comamnd!`)
          .setColor(error)
        )
        return;
      }
    } else {
      message.channel.send(
        new MessageEmbed()
        .setTitle(`Command execution failed!`)
        .setDescription(`You need to be a developer of Alexis to run this comamnd!`)
        .setColor(error)
      )
      return;
    }
    if(!args[0]) {
        let embed = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`**ERROR:** You didn't specify a valid user id!`)
        .setColor(error)

        message.channel.send(embed)
    }
    if(!args[1]) {
        let embed = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`**ERROR:** You need to provide a valid answer message!`)
        .setColor(error)

        message.channel.send(embed)
    }
    if(args[0] && args[1]) {
        let answer = new MessageEmbed()
        .setTitle(`Done!`)
        .setDescription(`Message sent!`)
        .setColor(good)

        let nodm = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`**ERROR:** It seems that the user has his DM's disabled. Contact him manually.`)
        .setColor(error)

        let answer2 = new MessageEmbed()
        .setTitle(`Yay! Your ticket has been closed!`)
        .addField(`Closed by`, `[Alexis Dev Team] ${message.author.username}`)
        .addField(`Answer`, args.slice(1).join(""))
        .setTimestamp()
        .setFooter(`You can join our support server! https://discord.gg/zH5FZD7`)
        .setColor(good)

        let user = await client.users.cache.get(args[0])    
        user.createDM().then(dmc => {
          dmc.send(answer2).then(message.guild.send(answer)).catch((e) => {
            message.channel.send(nodm)
          })
        })
    }
}
}