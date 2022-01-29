const { canModifyQueue } = require("../util/MilratoUtil");
const { Client, Collection, MessageEmbed } = require("discord.js");

const { attentionembed } = require("../util/attentionembed"); 
const { PREFIX } = require(`../config.json`);
module.exports = {
  name: "pause",
  description: "Szüneteltesse az éppen lejátszott zenét.",
  cooldown: 5,
  edesc: `Írja be ezt a parancsot a zene szüneteltetéséhez!\nHasználata: ${PREFIX}pause`,
  execute(message) {
    //If not in a guild return
    if(!message.guild) return;
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if no queue return error
    if (!queue) return attentionembed(message, "Nincs mit lejátszani.").catch(console.error);
    //If not in the same channel return
    if (!canModifyQueue(message.member)) return;
    //If its playing
    if (queue.playing) {
      //set playing to false
      queue.playing = false;
      //pause the music
      queue.connection.dispatcher.pause(true);
      //define the pause embed
      const pausemebed = new MessageEmbed().setColor("YELLOW")
      .setAuthor(`${message.author.username} Szünetelteti a zenét.`, "https://cdn.discordapp.com/emojis/769912238236106793.png")
      //react with approve emoji
      message.react("✅")
      //return message
      return queue.textChannel.send(pausemebed).catch(console.error);
    }
  }
};
