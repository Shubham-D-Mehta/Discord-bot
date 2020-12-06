const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
//const bot= new Discord.Client({disableEveryone: true});
// var fs=require('fs');

// bot.on("ready", () =>{
//   console.log(`${bot.user.username}! is up!!!!!!!!!!`);
//   bot.user.setActivity("Why is sahil here");
// });
bot.login(botsettings.token)
bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}hi`){
        return message.reply("whats up")
    }
    if(cmd === `${prefix}sir`)
    {
      return message.channel.send("a e i o u",{tts:true}) 
    }
    if(cmd === `${prefix}who`)
    {
      return message.channel.send("sahil is the imposter",{tts:true})
    }
    if(cmd === `${prefix}dead`)
    {
      return message.channel.send("https://tenor.com/bpP0N.gif")
    }

    if(cmd === `${prefix}sus`){
      return message.channel.send("https://tenor.com/tQCR.gif");
    }

    if(cmd === `${prefix}commands`){
      return message.channel.send("List of commands\n1. -hi (Say hello to the bot)\n2.  -sir (Says something fun)\n3.  -who (The obvious imposter)\n4.  -dead\n5.  -sus\n6.  -messages (Tells you how many messages you have posted)");
    }

    // if(!userData[message.member.id]) userData[message.member.id]={
    //   messagesSent: 0
    // }
 
    // userData[message.member.id].messagesSent++;

    // fs.writeFile('storage/userData.json',JSON.stringify(userData), (err) => {
    //   if(err) console.error()
    // });

    // if(cmd === `${prefix}messages`){
    //   return message.reply("You have sent "+userData[message.member.id].messagesSent+" messages.")
    // }

})

bot.login(process.env.BOT_TOKEN)
