const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 

function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}

module.exports = {
    command: "eval",
    name: "Eval",
    usage: "eval (code)",
    description: "Evaluate some code.",
    category: "owner-only",
    accessible: "Bot Devs",
    aliases: ["evaluate"],
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
    
    const code = args.join(" ")
    let fo = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** \n\`\`\`xl\nForbidden output\n\`\`\``)
    .setColor(error)

    if (message.content.toLowerCase().includes("privkey") || message.content.toLowerCase().includes("token") || message.content.toLowerCase().includes("destroy") || message.content.toLowerCase().includes("exit")) return message.channel.send(fo);

        try {
            let evaled = eval(code);
      
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      
            let codemsg = new MessageEmbed()
              .setTitle(`Evaled!`)
              .addField(`Evaled:`, `\n\`\`\`xl\n${code}\n\`\`\``)
              .addField(`Result:`, `\n\`\`\`xl\n${clean(evaled)}\n\`\`\``)
              .setColor(good);
            message.channel.send(codemsg);
          } catch (err) {
            let errr = new MessageEmbed()
              .setTitle(`Error!`)
              .addField(`Evaled:`, `\n\`\`\`xl\n${code}\n\`\`\``)
              .addField(`Error:`, `\n\`\`\`xl\n${clean(err)}\n\`\`\``)
              .setColor(error);
            message.channel.send(errr);
          }
    }
}
