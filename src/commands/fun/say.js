const { MessageEmbed } = require("discord.js")
const {good, error} = require("../../util/colors.json")


module.exports = {
    command: "say",
    name: "Say",
    category: "fun",
    description: "Say something anonymously or showing your nickname.",
    usage: "say [anonymous] (text)",
    accessible: "Members",
run: async (client, message, args) => {
    if (!args[0]) return message.channel.send(
        new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`**ERROR:** You need to provide something to say!`)
        .setColor(error)
      ).then(message.delete({
          timeout: "2000"
      })).then(sentMessage => sentMessage.delete({
          timeout: "2000"
      }))
  
      if(args.join(" ").includes("@everyone")) return message.channel.send(
        new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`**ERROR:** You can't mention everyone!`)
        .setColor(error)
        ).then(message.delete({
            timeout: "2000"
        })).then(sentMessage => sentMessage.delete({
            timeout: "2000"
        }))
  
      if (args[0]) {
        if (args[0] === "anonymous") {
          if (!args[1]) return message.channel.send(
            new MessageEmbed()
            .setTitle(`Error!`)
            .setDescription(`**ERROR:** You need to provide something to say!`)
            .setColor(error)
            ).then(message.delete({
                timeout: "2000"
            })).then(sentMessage => sentMessage.delete({
                timeout: "2000"
            }))
          if (args[1]) {
            message.delete()
            message.channel.send(`Someone said: ${args.slice(1).join(" ")}`)
            return;
          }
          return;
        }
        if (args[0] !== "anonymous") {
          message.delete()
          message.channel.send(`${message.member.displayName} said: ${args.slice(0).join(" ")}`)
          return;
        }
      }
}
}