const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")
 
module.exports = {
    command: "serverinfo",
    name: "Server info",
    usage: "serverinfo",
    description: "Shows some information about the server you're in",
    category: "utility",
    accessible: "Members",
run: async (client, message, args) => {

    let region = {
        "brazil": ":flag_br: Brazil",
        "europe": ":flag_eu: Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk**: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
      }

      let embed = new MessageEmbed()
      .setTitle(`Showing server information`)
      .addField(`Name`, message.guild.name, true)
      .addField(`Channels`, message.guild.channels.cache.size, true)
      .addField(`Created at`, message.guild.createdAt.toLocaleDateString(), true)
      .addField(`ID`, message.guild.id, true)
      .addField(`Members`, `${message.guild.members.cache.filter(m => !m.user.bot).size} Humans / ${message.guild.members.cache.filter(m => m.user.bot).size} Bots`, true)
      .addField(`Region`, region[message.guild.region], true)
      .setThumbnail(message.guild.iconURL())
      .setColor(good)
      message.channel.send(embed)
}
}