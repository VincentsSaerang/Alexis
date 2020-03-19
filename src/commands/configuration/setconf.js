const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 
module.exports = {
    command: "setconf",
    name: "Set configuration",
    usage: "setconf (property) [value]",
    description: "Change per-server configuration. Welcome message and Goodbye message don't need a value.",
    category: "configuration",
    accessible: "Administrators",
    aliases: ["setconfiguration", "setconfig"],
run: async (client, message, args) => {

    let noperms = new MessageEmbed()
      .setTitle(`Error!`)
      .setDescription(
        `**ERROR:** You dont have permission to change my configuration!\nContact a **server admin**`
      )
      .setColor(error);

    let nopr = new MessageEmbed()
      .setTitle(`Error!`)
      .setDescription(`**ERROR:** Please provide a valid key!`)
      .setColor(error);

    let noc = new MessageEmbed()
      .setTitle(`Error!`)
      .setDescription(
        `**ERROR:** You didn't specify a correct value for the key \`${args[0]}\``
      )
      .setColor(error);

    let done = new MessageEmbed()
      .setTitle(`Done!`)
      .setDescription(
        `The key \`${args[0]}\` has been changed to \`${args.slice(1).join(" ")}\`!`
      )
      .setColor(good);

    if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(noperms);

    if (!args[0]) return message.channel.send(nopr);

    if (args[0] === "prefix") {
      if (!args[1]) return message.channel.send(noc);
      client.db.collection("guilds").doc(message.guild.id).update({
        prefix: args.slice(1).join(" ")
      }, {
        merge: true
      }).then(() => {
        message.channel.send(done)
      })
    } else

    if (args[0] === "welcomeMessage") {
      const filter = m => m.author.id === message.author.id;

      let response1 = new MessageEmbed()
        .setTitle(`Lets go!`)
        .setDescription("You wanna change my welcomeMessage?\nWell, there are some things u should know\nI have variables, so when inputting ur message, use them\n**Variables:**\n`%user`This is for the user\n`%server` This is for the server's name\n`%total` This is for the amount of users in the server\nLine jumps can be done with SHIFT+ENTER in PC or Enter in Mobile")
        .addField("Understood?", "So, if you wanna continue, just type `continue`, or if you dont, `cancel`")
        .setColor(good)
      message.channel.send(response1);

      message.channel.awaitMessages(filter, {
        max: 1,
        time: 100000
      }).then(collected => {
        if (collected.first().content === "continue") {
          const filter2 = m => m.author.id === message.author.id;
          let done1 = new MessageEmbed()
            .setTitle(`Write!`)
            .setDescription(`Write down here the new welcome Message with the syntax told before`)
            .setColor(good)
          message.channel.send(done1)
          message.channel.awaitMessages(filter2, {
            max: 1,
            time: 100000
          }).then(collected2 => {
            let done2 = new MessageEmbed()
              .setTitle(`Done!`)
              .setDescription(
                `The key \`${args[0]}\` has been changed to \`${collected2.first().content}\`!`
              )
              .setColor(good);
            client.db.collection("guilds").doc(message.guild.id).update({
              welcomeMessage: collected2.first().content
            }, {
              merge: true
            }).then(() => {
              message.channel.send(done2)
            })
            return;
          })

        } else if (collected.first().content === "cancel") {
          let cancelled = new MessageEmbed()
            .setTitle(`Done!`)
            .setDescription(`Operation cancelled!`)
            .setColor(good);
          return message.channel.send(cancelled)
        } else {
          return;
        }
      })

    } else
    if (args[0] === "goodbyeMessage") {
      const filter = m => m.author.id === message.author.id;

      let response1 = new MessageEmbed()
        .setTitle(`Lets go!`)
        .setDescription("You wanna change my goodbyeMessage?\nWell, there are some things u should know\nI have variables, so when inputting ur message, use them\n**Variables:**\n`%user`This is for the user\n`%server` This is for the server's name\n`%total` This is for the amount of users in the server\nLine jumps can be done with SHIFT+ENTER in PC or Enter in Mobile")
        .addField("Understood?", "So, if you wanna continue, just type `continue`, or if you dont, `cancel`")
        .setColor(good)
      message.channel.send(response1);

      message.channel.awaitMessages(filter, {
        max: 1,
        time: 100000
      }).then(collected => {
        if (collected.first().content === "continue") {
          const filter2 = m => m.author.id === message.author.id;
          let done1 = new MessageEmbed()
            .setTitle(`Write!`)
            .setDescription(`Write down here the new goodbye Message with the syntax told before`)
            .setColor(good)
          message.channel.send(done1)
          message.channel.awaitMessages(filter2, {
            max: 1,
            time: 100000
          }).then(collected2 => {
            let done2 = new MessageEmbed()
              .setTitle(`Done!`)
              .setDescription(
                `The key \`${args[0]}\` has been changed to \`${collected2.first().content}\`!`
              )
              .setColor(good);
            client.db.collection("guilds").doc(message.guild.id).update({
              goodbyeMessage: collected2.first().content
            }, {
              merge: true
            }).then(() => {
              message.channel.send(done2)
            })
            return;
          })
        } else if (collected.first().content === "cancel") {
          let cancelled = new MessageEmbed()
            .setTitle(`Done!`)
            .setDescription(`Operation cancelled!`)
            .setColor(good);
          return message.channel.send(cancelled)
        } else {
          return;
        }
      })

    } else

    if (args[0] === "welcomerChannel") {
      if (!args[1]) return message.channel.send(noc);
      client.db.collection("guilds").doc(message.guild.id).update({
        welcomerChannel: args.slice(1).join(" ")
      }, {
        merge: true
      }).then(() => {
        message.channel.send(done)
      })
    } else

    if (args[0] === "welcomer") {
      if (!args[1]) return message.channel.send(noc);
      client.db.collection("guilds").doc(message.guild.id).update({
        welcomer: args.slice(1).join(" ")
      }, {
        merge: true
      }).then(() => {
        message.channel.send(done)
      })
    } else

    if (args[0] === "modLogChannel") {
      if (!args[1]) return message.channel.send(noc);
      client.db.collection("guilds").doc(message.guild.id).update({
        modLogChannel: args.slice(1).join(" ")
      }, {
        merge: true
      }).then(() => {
        message.channel.send(done)
      })
    } else

    if (args[0] === "muteRole") {
      if (!args[1]) return message.channel.send(noc)
      client.db.collection("guilds").doc(message.guild.id).update({
        muteRole: args.slice(1).join(" ")
      }, {
        merge: true
      }).then(() => {
        message.channel.send(done)
      })
    } else

    if (args[0] === "autoRole") {
      if (!args[1]) return message.channel.send(noc)
      client.db.collection("guilds").doc(message.guild.id).update({
        autoRole: args.slice(1).join(" ")
      }, {
        merge: true
      }).then(() => {
        message.channel.send(done)
      })
    } else

    if (args[0] === "autoRoleName") {
      if (!args[1]) return message.channel.send(noc)
      client.db.collection("guilds").doc(message.guild.id).update({
        autoRoleName: args.slice(1).join(" ")
      }, {
        merge: true
      }).then(() => {
        message.channel.send(done)
      })
    } else

    if (args[0] === "inviteLinkFilter") {
      if (!args[1]) return message.channel.send(noc)
      client.db.collection("guilds").doc(message.guild.id).update({
        inviteLinkFilter: args.slice(1).join(" ")
      }, {
        merge: true
      }).then(() => {
        message.channel.send(done)
      })
    } else

    if (args[0] === "announcementsChannel") {
      if (!args[1]) return message.channel.send(noc)
      client.db.collection("guilds").doc(message.guild.id).update({
        announcementsChannel: args.slice(1).join(" ")
      }, {
        merge: true
      }).then(() => {
        message.channel.send(done)
      })
    } else {
        message.channel.send(nopr)
    }
  }
}
