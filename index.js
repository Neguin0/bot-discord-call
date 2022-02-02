const Discord = require('discord.js');
const app = new Discord.Client();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000
app.get('/', (req, res) =>{
	res.send("Bot dos cria!");
});
app.listen(port, ()=>{
	console.log('Server Online!');
});

app.on('ready', () => {
      console.log('Estou Online!!');
});

app.on('message', (msg) => {
	/*if (msg.content === 'test' && msg.member.voice.channel && !msg.author.bot){
		console.log("Mensagem >>", msg.member);
		msg.member.voice.channel.join().then(connection => {
			const dispatcher = connection.play('entrou.mp3');
			dispatcher.on('finish', () => { msg.member.voice.channel.leave() });
		});
	}*/
});

app.on('voiceStateUpdate', (oldState, newState)=>{
	if(newState.channel){
		newState.channel.join().then(connection => {
			const dispatcher = connection.play('entrou.mp3');
			dispatcher.on('finish', () => { newState.channel.leave() });
		});
	}
})
app.login('OTM4MzQxNTE4Nzk0NzAyODk4.Yfo4ow.qUc5jS8oKYeEKFBT6GAUA1hCuhg');