const { MessageEmbed } = require("discord.js")
const {good, error} = require("../../util/colors.json")


module.exports = {
    command: "rps",
    name: "Rock Paper Scissors",
    category: "fun",
    description: "Play rock paper scissors with me!",
    usage: "rps (election)",
    accessible: "Members",
    aliases: ["rockpaperscissors"],
run: async (client, message, args) => {
    const election = args[0]
    const botelections = [
        "Rock",
        "Paper",
        "Scissors"
    ]
    const botelection = botelections[Math.floor(Math.random() * botelections.length)];

    if(!election || !botelections.includes(election)) {
        message.channel.send(
            new MessageEmbed()
        .setTitle(`Error!`)
        .addField(`**ERROR:** Available options:`, ` - Rock\n - Paper\n - Scissors`)
        .setColor(error)
        )
        return;
    }

    switch (election) {
        case "Rock":
            switch (botelection) {
                case "Rock":
                    message.channel.send(
                        new MessageEmbed()
                        .setTitle(`It's a tie!`)
                        .addField(`What you chose`, election)
                        .addField(`What I chose`, botelection)
                        .setColor(good)
                    )
                    break;
                case "Paper":
                    message.channel.send(
                        new MessageEmbed()
                        .setTitle(`${botelection} wins ${election}! I won!`)
                        .addField(`What you chose`, election)
                        .addField(`What I chose`, botelection)
                        .setColor(good)
                    )
                    break;
                case "Scissors":
                    message.channel.send(
                        new MessageEmbed()
                        .setTitle(`${election} wins ${botelection}! You win!`)
                        .addField(`What you chose`, election)
                        .addField(`What I chose`, botelection)
                        .setColor(good)
                    )
                    break;
            }
            break;
        case "Paper":
            switch(botelection) {
                case "Rock":
                    message.channel.send(
                        new MessageEmbed()
                        .setTitle(`${election} wins ${botelection}! You win!`)
                        .addField(`What you chose`, election)
                        .addField(`What I chose`, botelection)
                        .setColor(good)
                    )

                    break;
                case "Paper":
                    message.channel.send(
                        new MessageEmbed()
                        .setTitle(`It's a tie!`)
                        .addField(`What you chose`, election)
                        .addField(`What I chose`, botelection)
                        .setColor(good)
                    )
                    break;
                case "Scissors":
                    message.channel.send(
                        new MessageEmbed()
                        .setTitle(`${botelection} wins ${election}! I won!`)
                        .addField(`What you chose`, election)
                        .addField(`What I chose`, botelection)
                        .setColor(good)
                    )
                    break;
            }
            break;
        case "Scissors":
            switch(botelection) {
                case "Rock":
                    message.channel.send(
                        new MessageEmbed()
                        .setTitle(`${botelection} wins ${election}! I won!`)
                        .addField(`What you chose`, election)
                        .addField(`What I chose`, botelection)
                        .setColor(good)
                    )
                    break;
                case "Paper":
                    message.channel.send(
                        new MessageEmbed()
                        .setTitle(`${election} wins ${botelection}! You win!`)
                        .addField(`What you chose`, election)
                        .addField(`What I chose`, botelection)
                        .setColor(good)
                    )

                    break;
                case "Scissors":
                    message.channel.send(
                        new MessageEmbed()
                        .setTitle(`It's a tie!`)
                        .addField(`What you chose`, election)
                        .addField(`What I chose`, botelection)
                        .setColor(good)
                    )
                    break;
            }
            break;
    }
}
}