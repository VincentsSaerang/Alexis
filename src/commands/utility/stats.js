const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 
module.exports = {
    command: "stats",
    name: "Stats",
    usage: "stats",
    description: "Show current Alexis' stats",
    category: "utility",
    accessible: "Members",
run: async (client, message, args) => {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.round(totalSeconds % 60 * 1) / 1

    let embed = new MessageEmbed()
    .setTitle(`Current Stats`)
    .addField(`Memory usage`, `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB`, true)
    .addField(`Uptime`, `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`)
    .addField(`Users`, client.users.cache.size)
    .addField(`Guilds`, client.guilds.cache.size)
    .setColor(good)

    message.channel.send(embed)

}
}