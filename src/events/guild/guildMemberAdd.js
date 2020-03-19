const { MessageEmbed } = require("discord.js")
const { good, error } = require("../../util/colors.json")

module.exports = async (client, member) => {
    const q = await client.db.collection("guilds").doc(member.guild.id).get()
    if (q.data().welcomer === "true") {
      var welcomeMessage = q.data().welcomeMessage;
      if (welcomeMessage.includes("%user")) {
        welcomeMessage = welcomeMessage.replace(/%user/g, member.user);
      }
      if (welcomeMessage.includes("%server")) {
        welcomeMessage = welcomeMessage.replace(/%server/g, member.guild.name);
      }
      if (welcomeMessage.includes("%total")) {
        welcomeMessage = welcomeMessage.replace(/%total/g, member.guild.memberCount);
      }

      let welcomemsg = new MessageEmbed()
        .setTitle(`Hello! :wave:`)
        .setDescription(welcomeMessage)
        .setThumbnail(member.user.displayAvatarURL())
        .setColor(good)
        .setTimestamp()
        .setFooter(`ID: ${member.user.id}`, member.user.displayAvatarURL());

      member.guild.channels.cache.find(x => x.name === q.data().welcomerChannel).send(welcomemsg);

    } else {
      return;
    }

    if (q.data().autoRole === "true") {
      let derole = member.guild.roles.cache.find(role => role.name === q.data().autoRoleName)
      if (!derole) {
        derole = await member.guild.roles.create({
          name: q.data().autoRoleName,
          color: "#0b6623",
          hoist: true
        })
      }
      await (member.roles.add(derole.id));
    } else {
      return;
    }
}