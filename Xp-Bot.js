const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapters = new FileSync('database.json');
const db = low(adapters);
 
db.defaults({ histoires : [], xp: []}).write()

var prefix = ("&")
 
bot.on('ready' , function() {
    bot.user.setGame("&xp");
    console.log("Connecté");
});

bot.login("NjQwNjA1MTYzODM2NDA3ODE4.Xb8THw.ovBCqim7nhuzeC1Dpbm3_6slJW0");
 

bot.on('message', message => {
   
    var msgauthor = message.author.id
 
    if(message.author.bot)return;
 
    if(!db.get("xp").find({user : msgauthor}).value()){
        db.get("xp").push({user : msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user : msgauthor}).find("xp").value();
        console.log(userxpdb)
        var userxp = Object.values(userxpdb)
        console.log(userxp)
        console.log(`Nombre d'xp: ${userxp[1]}`)
 
        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
 
        if(message.content === "&xp"){
            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.RichEmbed()
                .setTitle(`Stat des XP de : ${message.author.username}`)
                .setColor('#F4D03F')
                .addField("XP", `${xpfinal[1]} xp`)
                .setFooter("Enjoy :D")
            message.channel.send({embed : xp_embed})
        }
    }
})
