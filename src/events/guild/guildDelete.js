const { good, error } = require("../../util/colors.json")
const { MessageEmbed } = require("discord.js")

module.exports = async (client, guild) => {

    if(guild.name === undefined) return;
    console.log(`[GUILD EVENTS] Alexis has been deleted from ${guild.name}`)
    const q = await client.db.collection("guilds").doc(guild.id).get()
   
    let owner = await client.users.fetch(guild.owner.id)
    let embed = new MessageEmbed()
    .setTitle(`Hi! :wave:`)
    .setDescription(`It seems like you or someone else removed me from your server. (**${guild.name}**). I send this to you for thanking you for using me.`)
    .addField(`Config Backup`, `Here is a backup of my config, so if you want to add me again, you can restore my data anytime.\n\`\`\`${JSON.stringify(q.data(), null, 2)}\`\`\``)
    .addField(`Inviting me back`, `If you ever want to invite me back, just use [this link](https://discordapp.com/api/oauth2/authorize?client_id=679036215005020388&permissions=8&scope=bot). Well, goodbye!`)
    .setColor(good)

    owner.send(embed).catch(() => console.log(`[GUILD EVENTS] ${guild.name}'s owner has DM's disabled.`))
}