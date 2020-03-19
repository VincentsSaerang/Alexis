module.exports = (client) => {
    let prompt = process.openStdin()
    prompt.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)
            client.channels.get("679036515254272000").send(x.join(" "));
        });
    }