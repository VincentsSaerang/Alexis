const { good, error } = require("../../util/colors.json")
const { MessageEmbed } = require("discord.js")

module.exports = async (client, guild) => {
    console.log(`[GUILD EVENTS] Alexis has been added to ${guild.name}`)
    client.db.collection("guilds").doc(guild.id).set({
        "prefix": "a!",
        "inviteLinkFilter": "false",
        "modLogChannel": "mod-log",
        "welcomer": "false",
        "announcementsChannel": "announcements",
        "welcomerChannel": "welcome",
        "autoRole": "false",
        "autoRoleName": "none",
        "muteRole": "Muted",
        "welcomeMessage": "Hello %user!\nWelcome to the official %server server!\nPlease take a look at the server rules, and feel free to get to know the other members.\nThis server now has %total users",
        "goodbyeMessage": "Goodbye, %user\n Sad, but true, one user left the server :(.\n Now, %server have %total users."
    })
    let owner = await client.users.fetch(guild.owner.id)
    let embed = new MessageEmbed()
    .setTitle(`Hi! :wave:`)
    .setDescription(`It seems like you or someone else added me to your server. (**${guild.name}**). First of all, thank you for using me! Now, let me give you a brief introduction.`)
    .addField(`What can I do?`, `I'm a multi-purpose bot. I can do a lot of things, and you can even suggest your own ideas [here](https://discord.gg/dhGD2Cs)`)
    .addField(`Setting me up`, `I have a per-server configuration system, so you can adjust me to your server's needs. For checking all my properties, do \`a!showconf\`. And for modifyng a property, do \`a!setconf <property>\`. Obviously, all of this, on your server.`)
    .addField(`That's all!`, `Well, yeah, those were all the basics. Don't forget to check all my comamnds with \`a!help\`!`)
    .setColor(good);

    owner.send(embed).catch(() => console.log(`[GUILD EVENTS] ${guild.name}'s owner has DM's disabled.`))
}