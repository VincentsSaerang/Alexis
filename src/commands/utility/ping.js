const { MessageEmbed } = require("discord.js")
const {good, error} = require("../../util/colors.json")


module.exports = {
    command: "ping",
    name: "Ping",
    category: "utility",
    description: "Pong! Shows command and API latency.",
    usage: "ping",
    accessible: "Members",
    aliases: ["latency"],
run: async (client, message, args) => {
    let loading = new MessageEmbed()
      .setDescription(`Loading, please wait`)
      .setColor(good);

    let response = new MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(
        `Command Latency: **${new Date().getTime() -
          message.createdTimestamp} ms**\nAPI Latency: **${client.ws.ping} ms**`
      )
      .setTimestamp()
      .setColor(good);
    const msg = await message.channel.send(loading);

    setTimeout(function () {
      msg.edit(response);
    }, 500);
}
}