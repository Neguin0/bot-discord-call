const Discord = require('discord.js');
const googleTTS = require('google-tts-api');
const app = new Discord.Client();

app.on('ready', () => {
	console.log('Estou Online!!');
});

app.on('voiceStateUpdate', async(oldState, newState) => {
	if((newState && newState.user && newState.user.bot) || (oldState && oldState.user && oldState.user.bot)) return;
	if((newState.mute && !oldState.mute) || (!newState.mute && oldState.mute)) return;
	if((newState.streaming && !oldState.streaming) || (!newState.streaming && oldState.streaming)) return;
	if (newState.channel && !newState.member.user.bot) {
		newState.channel.join().then(async (connection) => {
			const url = await googleTTS.getAudioUrl(`${newState.member.nickname || newState.member.user.username} entrou na call para mamar a tropa!`, {
				lang: 'pt-BR',
				slow: false,
				host: 'https://translate.google.com',
			});
			const dispatcher = await connection.play(url);
			dispatcher.on('finish', () => { newState.channel.leave() });
		});
	}
})
app.login('SEU_TOKEN');
