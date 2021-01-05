require('dotenv').config();
const { Client, Message, MessageMentions, MessageEmbed } = require('discord.js');
const client = new Client({
    partials:['MESSAGE', 'REACTION']
});
const PREFIX = process.env.TOKEN;
let reminder_count=0;
client.on('ready', () =>{
    console.log(`${client.user.username} has logged in`)
    client.user.setActivity('!help', { type: 'PLAYING' });
});
client.on('message', (message)=>{
    if(message.author.bot) return;
    if(message.content === 'Hello'){
        message.channel.send(`${message.author}`);
    }
    if(message.content.startsWith(PREFIX)){
        const [command, ...args]= message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        if(command==='metz'){
            var exampleEmbed = new MessageEmbed()
            .setColor('#13cbd8')
            .setTitle('List of commands:')
            .setAuthor('Metz bot')
            .addFields(
            { name: '!kick', value: 'To kick a user' },
            { name: '!remind', value: 'Reminds a user or yourself with an optional message'},
            { name: '!play?', value: 'Pings active people in the group'},
            )
            .setTimestamp()
            .setFooter('made by Metz');

            return message.channel.send(exampleEmbed);
        }
        if(command==='kick'){
            if(args.length===0 ) return message.reply("Who tf you wanna kick");
            if(message.author.username==='metz'){
                var member= message.guild.members.cache.get(args[0]);
                if(member){
                   message.channel.send("Woah calm down man");
                }
                else message.channel.send("Member not found");
            }
            else return message.channel.send("You cant do this :)");
        }
        if(command === 'remind'){
            if(reminder_count>3) return message.channel.send("Reminder limit reached");
            if(args.length == 0)
            return message.channel.send("Improper use");
            if (args[0].startsWith('<@') && args[0].endsWith('>')) {
                var remind_message="";
                if(args[2] != undefined){
                    var i=2;
                    while(args[i] != undefined){
                        remind_message = remind_message.concat(args[i]).concat(' ');
                        i+=1;
                    }
                }
                args[0] = args[0].slice(2, -1);
        
                if (args[0].startsWith('!')) {
                    args[0] = args[0].slice(1);
                } 
                var user=message.guild.members.cache.get(args[0]);
                if(args[1].endsWith('h')){
                    var time=parseInt(args[1]);
                    if(time>5)
                        return message.channel.send("Time cannot be more than 5 Hours right now :(");
                    else
                    setTimeout(() => {
                        reminder_count-=1;
                        return message.channel.send(`This is a reminder ${user}: ${remind_message}`);
                    }, time*60*60*1000);
                }
                else if(args[1].endsWith('m')){
                    var time=parseInt(args[1]);
                    if(time>60)
                        return message.channel.send(`Just use hours then 😀`);
                    setTimeout(() => {
                        reminder_count-=1;
                        return message.channel.send(`This is a reminder ${user}: ${remind_message}`);
                    }, time*60*1000);
                }
                if(args[1].endsWith('h') || args[1].endsWith('m'))
                    reminder_count+=1;
            }
            else{
                var remind_message="";
                if(args[1] != undefined){
                    var i=1;
                    while(args[i] != undefined){
                        remind_message = remind_message.concat(args[i]).concat(' ');
                        i+=1;
                    }
                }
                if(args[0].endsWith('h')){
                    var time=parseInt(args[0]);
                    if(time === 0) return;
                    if(time>5)
                        return message.channel.send("Time cannot be more than 5 Hours right now :(");
                    else
                    setTimeout(() => {
                        reminder_count-=1;
                        return message.channel.send(`This is a reminder ${user}: ${remind_message}`);
                    }, time*60*60*1000);
                }
                else if(args[0].endsWith('m')){
                     var time=parseInt(args[0]);
                    if(time === 0)
                        return;
                    if(time>60)
                        return message.channel.send(`Just use hours then 😀`);
                    setTimeout(() => {
                        reminder_count-=1;
                        return message.channel.send(`This is a reminder ${message.author}: ${remind_message}`);
                    }, time*60*1000);
                }
                if(args[0].endsWith('h') || args[0].endsWith('m'))
                    reminder_count+=1;   
            }
        }
         if(command === 'play?'){
             if(message.member.user.id.toString() === '303202443947409408'){
                //Metz is invoking
                return message.channel.send(`${ message.guild.members.cache.get("299227567288877056") } ${ message.guild.members.cache.get("281997835371675658") }  ?`);
             }
             if(message.member.user.id.toString() === '299227567288877056'){
                //kumo is invoking
                return message.channel.send(`${ message.guild.members.cache.get("303202443947409408") } ${ message.guild.members.cache.get("281997835371675658") }  ?`);
             }
             if(message.member.user.id.toString() === '281997835371675658'){
                //kanra is invoking
                return message.channel.send(`${ message.guild.members.cache.get("299227567288877056") } ${ message.guild.members.cache.get("303202443947409408") }  ?`);
             }
             return message.channel.send("No one wants to play with you");
         }
         if(command === 'hi'){
             return message.channel.send("Hello");
         }
    }
});

client.on('messageReactionAdd',(reaction, user)=>{
    console.log("Reacted");
});

client.login(process.env.DISCORDJS_BOT_TOKEN); 
