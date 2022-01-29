const { Client, Collection, MessageEmbed } = require(`discord.js`);
const { 
  PREFIX, 
} = require(`../config.json`);

module.exports = {
  name: `help`,
  description: `Gives you a list of all help Commands`,
  aliases: ["h","commands"],
  cooldown: 3,
  edesc: "Írja be a help parancsot az összes parancs rövid előnézetének megtekintéséhez, írja be a help <PARANCS NEVE> parancsot, ha további információkat szeretne kapni erről az egy parancsról!",
  execute(message,args,client) {
     
    let commands = message.client.commands.array();
 
    let helpEmbed = new MessageEmbed()
      .setTitle("\📭 Segítségre lenne szükséged? Itt vannak a parancsaim.")
      .setDescription(`**Verzió:** \`v1.5\` \n**Prefixem:** \`${PREFIX}\``)
      .setFooter( client.user.username +` | Írd be: ${PREFIX}help <Parancs>  ha kiváncsi vagy a parancs leírására.`, "https://cdn.discordapp.com/attachments/873930122997157928/879353481566257162/unknown.png")
      .setColor("YELLOW");

      let ifargstruedothis = -1;
      
      switch(args[0]){
          case "filter":
           ifargstruedothis=0;
          break;
          case "loop":
            ifargstruedothis=1;
          break;
          case "lyrics":
            ifargstruedothis=2
          break;
          case "nowplaying":
            ifargstruedothis=3
          break;
          case "pause":
            ifargstruedothis=4
          break;
          case "play":
            ifargstruedothis=5
          break;
          case "playlist":
            ifargstruedothis=6
          break;
          case "queue":
            ifargstruedothis=7
          break;
          case "radio":
            ifargstruedothis=8
          break;
          case "remove":
            ifargstruedothis=9
          break;
          case "resume":
            ifargstruedothis=10
          break;
          case "search":
            ifargstruedothis=11
          break;
          case "shuffle":
            ifargstruedothis=12
          break;
          case "skip":
            ifargstruedothis=13
          break;
          case "skipto":
            ifargstruedothis=14
          break;
          case "stop":
            ifargstruedothis=15
          break;
          case "volume":
            ifargstruedothis=16
          break;
          case "help":
            ifargstruedothis=17
          break;
          default:        
            commands.forEach((cmd) => {
              helpEmbed.addField(
                `**${message.client.prefix}${cmd.name}**`,
                `${cmd.description}`,
                true
              );
            });
          if(!message.guild) {
            if(!args[0]) {message.react("✅");return message.author.send(helpEmbed);}
            return
            }
            message.react("✅");
            message.author.send(new MessageEmbed().setColor("YELLOW")
            .setDescription(`**👍 Innen küldve <#${message.channel.id}>**`))
            message.author.send(helpEmbed)
            message.channel.send( new MessageEmbed().setColor("YELLOW")
            .setDescription(`**👍 ${message.author} Nézd meg a \`Prívát üzeneteidet\` elküldtem a parancs leírását.**`)
            );
           
        break;
       }
     
       if(ifargstruedothis>=0){
         let aliases = commands[ifargstruedothis].aliases;
         if(aliases === undefined || !aliases) aliases="No Aliases!";
         let cooldown = commands[ifargstruedothis].cooldown;
         if(cooldown === undefined || !cooldown) cooldown="No Cooldown!";


        helpEmbed.addField(
          `**${message.client.prefix}${commands[ifargstruedothis].name}**`,
          `\`\`\`fix\n${commands[ifargstruedothis].edesc}\n\`\`\`\n\`${commands[ifargstruedothis].description}\``
        );
        if(!message.guild) return message.author.send(helpEmbed);
          message.author.send(helpEmbed)
          message.channel.send( new MessageEmbed().setColor("YELLOW")
          .setDescription(`**👍 ${message.author} Nézd meg a \`Prívát üzeneteidet\` elküldtem a parancs leírását.**`)
          );
       }

}
} 
