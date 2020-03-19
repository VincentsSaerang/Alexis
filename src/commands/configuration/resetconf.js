const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 
module.exports = {
    command: "resetconf",
    name: "Reset configuration",
    usage: "resetconf",
    description: "Resets the server configuration to the default one.",
    category: "configuration",
    accessible: "Administrators",
    aliases: ["resetconfiguration", "resetconfig"],
run: async (client, message, args) => {

    let noperms = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** You need to be a server administrator!`)
    .setColor(good)

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(noperms);

    const db = await client.db.collection("guilds").doc(message.guild.id).get()

    client.db.collection('guilds').doc(message.guild.id).set({
        prefix: "a!",
        inviteLinkFilter: "false",
        modLogChannel: "mod-log",
        welcomer: "false",
        announcementsChannel: "news",
        welcomerChannel: "welcome",
        autoRole: "false",
        autoRoleName: "none",
        muteRole: "Muted",
        welcomeMessage: "Hello %user!\nWelcome to the official %server server!\nPlease take a look at the server rules, and feel free to get to know the other members.\nThis server now has %total users",
        goodbyeMessage: "Goodbye, %user\n Sad, but true, one user left the server :(.\n Now, %server have %total users.",
      })

      let response = new MessageEmbed()
      .setTitle(`Done, server configuration has been reset to default`)
      .setDescription(`You can check the new config with \`a!showconf\``)
      .setColor(good)

    message.channel.send(response);

}
}