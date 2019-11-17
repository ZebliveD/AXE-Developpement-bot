const { Client } = require("discord.js");
const { TOKEN, PREFIX } = require("./config.json");
const client = new Client({ disableEveryone: true });
var fs = require("fs");
const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

 
const adapters = new FileSync('database.json');
const db = low(adapters);
 
db.defaults({ histoires : [], xp: []}).write()

//Start
client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    client.user.setActivity(`&help`);
  });
	console.log("\n ---- Bot: En ligne!");

//avatar
client.on('message', message => {
    if (message.content === '&avatar') {
        message.reply(message.author.avatarURL);
    }
  });  

  //rip
  client.on('message', message => {
    if (message.content === '&rip') {
        const attachment = new Attachment('./rip.png');
        message.channel.send(`${message.author},`, attachment);
    }
});

//memes
client.on('message', message => {
    if (message.content === '&memes') {
        const buffer = fs.readFileSync('./memes.txt');


        const attachment = new Attachment(buffer, 'memes.txt');
        message.channel.send(`${message.author}, voici votre commande !`, attachment);
    }
});


  //kick
  client.on('message', message => {
    if (!message.guild) return;
      if (message.content.startsWith('&kick')) {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {

          member.kick('Raison facultative à afficher dans les logs').then(() => {
            message.reply(`Kick réussi ${user.tag}`);
          }).catch(err => {
            message.reply('Vous ne pouvez pas kick cette utilisateur !');
            console.error(err);
          });
        } else {
          message.reply('Cette utilisateur n\'est pas dans cette guild !');
        }
        } else {
        message.reply('Vous n\'avez pas mis de mension !');
      }
    }
  });

  //ban
  client.on('message', message => {
    if (!message.guild) return;
      if (message.content.startsWith('&ban')) {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {

          member.ban({
            reason: 'Raison : x',
          }).then(() => {
            message.reply(`Ban résussi ${user.tag}`);
          }).catch(err => {
            message.reply('Je ne peux pas ban cet utilisateur !');
            console.error(err);
          });
        } else {
          message.reply('Il n\'y a pas d\'utilisateur dans cette guild!');
        }
      } else {
        message.reply('vous n\'avez pas mis de mension !');
      }
    }
  });
  
  client.on('message', message => {
    if (!message.guild) return;
      if (message.content.startsWith('&warn')) {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {

          member.warn({
            reason: 'Raison : x',
          }).then(() => {
            message.reply(`Ban résussi ${user.tag}`);
          }).catch(err => {
            message.reply('Je ne peux pas ban cet utilisateur !');
            console.error(err);
          });
        } else {
          message.reply('Il n\'y a pas d\'utilisateur dans cette guild!');
        }
      } else {
        message.reply('vous n\'avez pas mis de mension !');
      }
    }
  });

  //ripimg
  client.on('message', message => {
    if (message.content === '&ripimg') {
        message.channel.send('https://i.imgur.com/w3duR07.png');
    }
  });


  //tag
  client.on('message', message => {
    if (message.content === '&tag') {
        message.reply('voici votre tag')
      message.reply(message.author.tag);
    }
  });

  //insulte
  client.on('message', message => {
    if (message.content === 'fdp') {
        message.delete('fdp') 
    }
  });


   client.on('message', message => {
    if (message.content === 'connar') {
        message.delete('connar') 
    }
  });

  client.on('message', message => {
    if (message.content === 'con') {
        message.delete('con') 
    }
  });
  
  client.on('message', message => {
    if (message.content === 'nike') {
        message.delete('nike')
    }
  });

  //Copyrighy © 2019 AXE Développement
  client.on('message', message => {
    if (message.content === 'by?') {
        message.channel.send('``` AXE Développement copyright © 2019 - Community ```')
    }
  });

  //Close channel
  client.on('message', message => {
    if (message.content === '/Close') {
        message.channel.edit({ name: 'Close'})  
        message.channel.send(`${message.author} Le salon est fermé !`);
        message.channel.send('#logs');
    }
  });

  client.on('message', message => {
    if (message.content === '!test') {
        message.channel.send('#log');
        message.channel.send(``);
    }
  });

  //Membre join
  client.on("guildMemberAdd", (member) => { 
    let guild = member.guild; 
    let memberTag = member.user.tag; 
    if(guild.systemChannel){
        guild.systemChannel.send(new Discord.RichEmbed() 
        .setTitle("Un nouveau joueur est paru !") 
        .setDescription(memberTag + " à rejoint {Recherche de nom}") 
        .setThumbnail(member.user.displayAvatarURL) 
        .addField("Members maintenant :", member.guild.memberCount) 
        .setTimestamp() 
        );
    }
    });

    //connection vocal
    client.on('message', message => {
      if (!message.guild) return;
    
      if (message.content === '/join') {
        if (message.member.voiceChannel) {
          message.member.voiceChannel.join()
            .then(connection => { 
              message.reply('Vous êtes connecté au salon vocal !');
            })
            .catch(console.log);
        } else {
          message.reply('Vous devez être connecté à un salon vocal !');
        }
      }
    });

client.on('message', message => {
      
  if (message.content === '&help') {
     var embed = new Discord.RichEmbed()
      .setTitle('Commandes')
      .setColor(0xFF0000)
      .setDescription('Toutes les commandes')
      .addField('&avatar')
      .addField('&ripimg')
      .addField('&tag')
      .addField('&xp')
      .addField('&stat')
      .addField('&info')
      .addField('/join')
      .addField('by?')
      .addField('&kick')
      .addField('&ban')
      .addField('&warn')
      .addField('/close')
  message.channel.sendEmbed(embed)
      }
    });
  
client.on('message', message => {

    if(message.content === "&info") {
        var embed = new Discord.RichEmbed()
        .setDescription("Information du serveur Discord")
        .addField("Nom du serveur", message.guild.name)
        .addField("Créer le", message.guild.createdAt)
        .addField("Tu as rejoin le", message.member.joinedAt)
        .addField("Membres", message.guild.memberCount)
        .setColor("0x0000FF")
    message.channel.sendEmbed(embed)

    }

    if (message.content.startsWith("&sondage")) {
      if(message.content.id === "<@!487657156930174987>"){
            let args = message.content.split(" ").slice(1);
            let thingToEcho = args.join(" ")
            var embed = new Discord.RichEmbed()
                 .setDescription("Sondage")
                 .addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")
                 .setColor("0xB40404")
                 .setTimestamp()
            message.guild.channels.find("name", "sondage").sendEmbed(embed)
            .then(function (message) {
              message.react("Oui")
              message.react("non")
            }).catch(function() {
            });
            }else{
                return message.reply("Tu n'as pas la permission !")

}}})



bot.on('guildMemberAdd', member => { 
  var role = member.guild.roles.find('name', 'Membre by Bot');
  member.addRole(role)

})

client.on('message', message => {
  if (message.content === '&C++') {
      message.channel.send('https://openclassrooms.com/courses/programmez-avec-le-langage-c');
  }
});


client.on('message', function (message) {
  if (message.content === '&C') {
      message.channel.send('https://openclassrooms.com/courses/apprenez-a-programmer-en-c')
  }
})


client.on('message', function (message) {
  if (message.content === '&javascript') {
      message.channel.send('Deux tutos :  https://openclassrooms.com/courses/apprenez-a-coder-avec-javascript https://openclassrooms.com/courses/creez-des-pages-web-interactives-avec-javascript?utm_medium=native_ads_simplified+')
  }
})

client.on('message', function (message) {
  if (message.content === '&python') {
      message.channel.send('https://openclassrooms.com/courses/apprenez-a-programmer-en-python?utm_medium=native_ads_simplified')
  }
})



client.on('message', function (message) {
  if (message.content === '&js') {
      message.channel.send('Deux tutos :  https://openclassrooms.com/courses/apprenez-a-coder-avec-javascript https://openclassrooms.com/courses/creez-des-pages-web-interactives-avec-javascript?utm_medium=native_ads_simplified+')
  }
})


client.on('message', function (message) {
  if (message.content === '&ruby') {
      message.channel.send('https://openclassrooms.com/courses/lancez-vous-dans-la-programmation-avec-ruby')
  }
})


client.on('message', function (message) {
  if (message.content === '&node.js') {
      message.channel.send('https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js')
  }
})



client.on('message', function (message) {
  if (message.content === '&nodejs') {
      message.channel.send('https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js')
  }
})


client.login('');

client.on("ready", () => console.log("Je suis prêt !"));
client.on("error", console.error);
client.on("warn", console.warn);
client.on("debug", console.log);
console.log("\n _______________________ ");
console.log("\n ---- ");
