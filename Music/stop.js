////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { canModifyQueue } = require("../util/MilratoUtil");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { PREFIX } = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "stop",
  description: "Leállítja a zenét.",
  aliases: ["leave", "end"],
  cooldown: 5,
  edesc: `A lejátszás leállításához és a csatorna elhagyásához írja be a parancsot.\mHasználata: ${PREFIX}stop`,

async execute(message,args,client) {
  //if not in a guild retunr
  if (!message.guild) return;
  //react with approve emoji
  message.react("✅").catch(console.error);
  const { channel } = message.member.voice;
  //get the serverQueue
  const queue = message.client.queue.get(message.guild.id);
  //if not a valid channel
  if (!channel) return attentionembed(message, "Kérlek csatlakozz egy hangcsatornához.");  
  //If not in the same channel return error
  if (queue && channel !== message.guild.me.voice.channel)
  return attentionembed(message, `Biztosan ugyanabban a Hangcsatornában van, mint én?`);
  //if no Queue return error
  if (!queue)
    return attentionembed(message, "There is nothing you can stop!");
  //if not in the same channel return
  if (!canModifyQueue(message.member)) return;
  //Leave the channel
  await channel.leave();
  //send the approve message    
  message.channel.send(new MessageEmbed()
  .setColor("YELLOW")
  .setAuthor(`${message.author.username} megáította a zenét.`, "https://cdn.discordapp.com/emojis/769915194066862080.png"))
  .catch(console.error);
  }
};
