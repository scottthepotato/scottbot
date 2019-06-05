require("http").createServer(async (req,res) => { res.statusCode = 200; res.write("ok"); res.end(); }).listen(3000, () => console.log("Now listening on port 3000"));
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

///commands
client.on('message', msg => {
  if (msg.content === 's!ping') {
    msg.channel.send('pong');
  }
});

client.on('message', msg => {
  if (msg.content === 's!serverinfo') {
    msg.channel.send(`Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}\nDate of creation: ${msg.guild.createdAt}\nServer region: ${msg.guild.region}`);
  }
});

client.on('message', msg => {
  if (msg.content === 's!hoes') {
    msg.react(':madman:519696223972622336');
  }
});

client.on('message', msg => {
  if (msg.content === 's!inbedtest') {
    const exampleEmbed = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('Little Owl Games')
	.setURL('https://discord.js.org/')
	.setAuthor('Scott Hicks', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addField('Title', 'Some value here')
	.addBlankField()
	.addField('Inline field title', 'Some value here', true)
	.addField('Inline field title', 'Some value here', true)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
    msg.channel.send(exampleEmbed);
  }
});

client.on('message', msg => {
  if (msg.content === 's!toncum') {
    msg.channel.send('lmao im just finna ping this nigga @sammyglop#5481');
  }
});


client.on('message', msg => {
  if (msg.content === 's!botinfo') {
    
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot information")
    .setColor("#42f44e")
    .addField("Bot name: ScottBot, Made by @scottthepotato#6633");
    
    msg.reply(botembed);
    
  }
});


var oasis = ('NTg1MzA3MjA4MTAzNzU1Nzg3.XPavrQ.s67J9xf1n8rHIQ_YAvKF5Ndhi_s')

///moderation code

///kick
if (member.hasPermission('KICK_MEMBERS')) {
	console.log('This member can kick');
}
client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;
  // If the message content starts with "!kick"
  if (message.content.startsWith('s!kick')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        
        member.kick('Optional reason that will display in the audit logs').then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.reply('I was unable to kick the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    // Otherwise, if no user was mentioned
    } else {
      message.reply('You didn\'t mention the user to kick!');
      }
    }
  });
  
  
  ///mute
  const tls = require('../../tools');
const tools = new tls.Tools();
const Discord = require('discord.js');

const minAlias = ['min', 'minute', 'm', 'minutes', 'mins'];
const hourAlias = ['hour', 'hours', 'h', 'hr', 'hrs'];

module.exports = {
    guilds: new Discord.Collection(),
    mutesGuilds: new Discord.Collection(),
    timeoutsGuilds: new Discord.Collection(),
    name: 'mute',
    usage: `<user> <time?'min','hour'>`,
    description: 'Keeps a player from chatting for specified time.',
    args: true,
    minArgs: 2,
    mod: true,
    execute(message, args, client) {
        const canKick = message.channel.permissionsFor(message.member).has("KICK_MEMBERS");
        if (!canKick) {
            return message.channel.send(`${message.author} You do not have permission to use this command!`);
        }
        if (!this.guilds.has(message.guild.id)) {
            this.guilds.set(message.guild.id, new Discord.Collection());
        }
        if (!this.mutesGuilds.has(message.guild.id)) {
            this.mutesGuilds.set(message.guild.id, new Discord.Collection());
            this.timeoutsGuilds.set(message.guild.id, new Discord.Collection());
        }
        const mention = message.mentions.users.first();
        if (!mention) {
            return message.channel.send(`${message.author} Could not find that user!`);
        }
        const time = parseInt(args[1]);
        if (isNaN(time)) {
            return message.channel.send(`${message.author} Please use numbers!`);
        }
        const muted = this.guilds.get(message.guild.id);
        const mutes = this.mutesGuilds.get(message.guild.id);
        const timeouts = this.timeoutsGuilds.get(message.guild.id);
        if (muted.has(mention.id) || mutes.has(mention.id) || timeouts.has(mention.id)) {
            return message.channel.send(`${message.author} That user is already muted!`);
        }
        if (mention.id === client.user.id) {
            return message.channel.send(`${message.author} You cannot mute the bot!`);
        }
        const isAdmin = message.channel.permissionsFor(message.guild.member(mention)).has("ADMINISTRATOR");
        const admin = message.channel.permissionsFor(message.member).has("ADMINISTRATOR");
        if (isAdmin && !admin) {
            return message.channel.send(`${message.author} You don't have permission to mute that user!`);
        }
        const mRole = message.guild.member(mention).highestRole;
        const role = message.member.highestRole;
        if (mRole.comparePositionTo(role) > 0 || mRole.position === role.position) {
            return message.channel.send(`${message.author} That user has a higher role than you!`);
        }
        const timeArray = args[1].split(':');
        let out = "Error occured";
        let mil = tools.parseTime(args[1]);
        if (timeArray.length <= 1) {
            if (hasMin(args[1]) && !hasHour(args[1])) {
                const minutes = parseInt(args[1]);
                if (minutes >= 60) {
                    out = `${Math.floor(minutes / 60)} hour(s)`;
                } else {
                    out = `${minutes} minute(s)`;
                }
            } else if (hasHour(args[1]) && !hasMin(args[1])) {
                out = `${parseInt(args[1])} hour(s)`;
            } else {
                const sec = parseInt(args[1]);
                if (sec >= 60) {
                    out = `${Math.floor(sec / 60)} minute(s)`;
                } else {
                    out = `${sec} second(s)`;
                }
            }
        } else {
            if (timeArray.length < 3 || timeArray.length > 3) {
                return message.channel.send(`${message.author} Please follow the time format! hh:mm:ss`);
            }
            const hours = tools.parseTime(timeArray[0] + 'hour');
            const minutes = tools.parseTime(timeArray[1] + 'min');
            const seconds = tools.parseTime(timeArray[2]);
            mil = hours + minutes + seconds;
            out = `${timeArray[0]}:${timeArray[1]}:${timeArray[2]}`;
        }
        tools.muteMember(message.guild.id, mention.id, mil);
        return message.channel.send(`${message.author} muted ${mention} for ${out}!`);
    },
};

function hasMin(string) {
    let contains = false;
    for (const i in minAlias) {
        if (string.includes(minAlias[i])) contains = true;
    }
    return contains;
}

function hasHour(string) {
    let contains = false;
    for (const i in hourAlias) {
        if (string.includes(hourAlias[i])) contains = true;
    }
    return contains;
}
  
  
  
  
  
  
  
  
  
  


///roles



///login key
client.login(oasis);
