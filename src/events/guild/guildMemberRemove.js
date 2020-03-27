const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")

module.exports = async (client, member) => {
    const q = await client.db.collection("guilds").doc(member.guild.id).get()
    if (q.data().welcomer === "true") {
      var goodbyeMessage = q.data().goodbyeMessage;
      if (goodbyeMessage.includes("%user")) {
        goodbyeMessage = goodbyeMessage.replace(/%user/g, member.user);
      }
      if (goodbyeMessage.includes("%server")) {
        goodbyeMessage = goodbyeMessage.replace(/%server/g, member.guild.name);
      }
      if (goodbyeMessage.includes("%total")) {
        goodbyeMessage = goodbyeMessage.replace(/%total/g, member.guild.memberCount);
      }

      let welcomemsg = new MessageEmbed()
        .setTitle(`Goodbye :( :wave:`)
        .setDescription(goodbyeMessage)
        .setThumbnail(member.user.displayAvatarURL())
        .setColor(good)
        .setTimestamp()
        .setFooter(`ID: ${member.user.id}`, member.user.displayAvatarURL());

      member.guild.channels.cache.find(x => x.name === q.data().welcomerChannel).send(welcomemsg);

    } else {
      return;
    }
}
