const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")

module.exports = async (client, message) => {

  if(message.author.bot || message.channel.type === "dm") return;

    const db = await client.db.collection("guilds").doc(message.guild.id).get()
    const prefix = "ab!"
    if(db.data().starboard === (null || undefined) || db.data().starboard === (null || undefined)) {
      client.db.collection("guilds").doc(message.guild.id).set({
        "starboard": "false",
        "starboardChannel": "starboard"
      }, {merge: true})
    }

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(message.content.toLowerCase().includes("alexis") && message.content.toLowerCase().includes("prefix")) {
      let answer = new MessageEmbed()
      .setTitle(`Need help?`)
      .setDescription(`Hi! Im **Alexis!** My system detected you are looking for my **prefix**, arent you?
    Well, my **prefix** actually is \`${prefix}\` and you can see all my **commands** with \`${prefix}help\`
    Hope you are having **fun** here!`)
      .setColor(good)
    message.channel.send(answer);
    }

    if (db.data().inviteLinkFilter === "true") {
      if (message.content.toLowerCase().includes("discord.gg/") || message.content.toLowerCase().includes("discordapp.com/invite/")) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
          console.log("[INVITES FILTER] " + message.author.username + " posted a server invite link in  " + message.guild.name + " but he had admin perms")
        } else {
          message.delete()

          let modchannel = message.guild.channels.cache.find(channel => channel.name === db.data().modLogChannel)
          if (modchannel) {
            modchannel.send(new MessageEmbed()
              .setTitle(`:warning: Invite link sent!`)
              .addField(`User who sent the link`, message.author.username)
              .addField(`Invite link`, message.content)
              .setFooter(`ID: ${message.author.id}`, message.author.displayAvatarURL())
              .setColor(good))

            let response = new MessageEmbed()
              .setDescription(`You cant send invite links here!`)
              .setColor(error)
              .setTimestamp()
            message.channel.send(response)
          } else {
            let nomodlog = new MessageEmbed()
              .setTitle(`Oops!`)
              .setDescription(`The invite link was deleted, but i couldnt find a mod log channel to send the logs. Use \`${client.guildConf.prefix}\`showconf to see how the mod-log channel has to be called or change its name by doing \`${client.guildConf.prefix}setconf modLogChannel channel-name\` for defining ur own channel name`)
              .setColor(error);
            message.channel.send(nomodlog);
          }
        }
      }
    }

    if(!message.content.startsWith(prefix)) return;
    let commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
    if (commandfile)
    try {
      commandfile.run(client, message, args)
    } catch(error) {
        console.log(error)
      };
}
