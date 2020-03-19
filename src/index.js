// Discord.js
const { Client, Collection } = require("discord.js");
const client = new Client()
// Dotenv
require("dotenv").config({
    path: '../.env'
})

//Fs
const fs = require("fs")

// Database (Firestore)
const FieldValue = require("firebase-admin").firestore.FieldValue;
const admin = require("firebase-admin");

admin.initializeApp({
credential: admin.credential.cert({
        "type": "service_account",
    "project_id": "alexis-94c94",
    "private_key_id": process.env.PRIVKYEID,
    "private_key": process.env.PRIVKEY.replace(/\\n/g, '\n'),
    "client_email": "firebase-adminsdk-syl87@alexis-94c94.iam.gserviceaccount.com",
    "client_id": "112100933309395209132",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-syl87%40alexis-94c94.iam.gserviceaccount.com"
}),
databaseURL: "https://alexis-94c94.firebaseio.com"
})

// Declaring variables.
const db = admin.firestore()
client.db = db
client.fieldvalue = FieldValue

// Command handler
client.commands = new Collection()
client.aliases = new Collection()

const array1 = ["aliases", "commands"];

array1.forEach(x => (client[x] = new Collection()));
["command", "console", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN).then(() => { client.user.setActivity("a!help", { type: "WATCHING" })
})