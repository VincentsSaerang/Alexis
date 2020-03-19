const { MessageEmbed } = require("discord.js")
const {good, error} = require("../../util/colors.json")


module.exports = {
    command: "love",
    name: "Love",
    category: "fun",
    description: "Calculates the love between you and another user",
    usage: "love (user)",
    accessible: "Members",
run: async (client, message, args) => {
    let user = message.mentions.members.first()
    let lovepercentage = Math.floor(Math.random() * 101)
    let love;

    if(lovepercentage <= 15) { 
        love = "Not so much love here... :cry:"; 
    } else if(lovepercentage <= 25) {
        love = "Well, a little. At least is something. :blush:";
    } else if(lovepercentage <= 40) {
        love = "This seems nice! :smiling_face_with_3_hearts: ";
    } else if(lovepercentage <= 65) {
        love = "Wow! Something's going on here! :eyes:";
    } else if(lovepercentage <= 85) {
        love = "This really MUST mean something :face_with_monocle:";
    } else if(lovepercentage <= 100) {
        love = "This is love and everything else is bullshit! :heart:";
    }
     
    let nouser = new MessageEmbed()
    .setTitle(`Error!`)
    .setDescription(`**ERROR:** You need to mention a valid user! (Yourself or everyone aren't allowed.)`)
    .setColor(error)

    let done = new MessageEmbed()
    .setTitle(`Love percentage calculated!`)
    .addField(`Result`, `Love percentage: \`${lovepercentage}%\` ${love}`)
    .setColor(good)

    if(!args[0] || !user || user.id === message.author.id || args.join(" ").includes("@everyone")) return message.channel.send(nouser)
    message.channel.send(done)
}
}