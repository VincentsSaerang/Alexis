const { MessageEmbed } = require("discord.js")
const {good, error} = require("../../util/colors.json")


module.exports = {
    command: "8ball",
    name: "8 Ball",
    category: "fun",
    description: "Answers question of true/false answers.",
    usage: "8ball (question)",
    accessible: "Members",
    aliases: ["ask"],
run: async (client, message, args) => {

    let answers = [
        "Oh, maybe...",
        "Hmmm, I don't think so",
        "Try harder...",
        "Nope",
        "Yeah",
        "Ask again...",
        "Don't trust me, but I think not",
        "Don't trust me, but I think yes"
      ]

      let answersRandom = answers[Math.floor(Math.random() * answers.length)];

      let err = new MessageEmbed()
      .setTitle(`Error!`)
      .setDescription(`**ERROR:** You need to provide a valid question!`)
      .setColor(error)

      if(!args[0]) return message.channel.send(err)

      let embed = new MessageEmbed()
      .setTitle(`8 Ball has done its magic!`)
      .addField(`You asked`, args.join(" "))
      .addField(`8 Ball answered`, answersRandom)
      .setColor(good)
      
      message.channel.send(embed)
}
}