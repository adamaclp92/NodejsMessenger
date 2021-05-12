var net = require('net');

//"npm install chalk" a terminalon
//betűszín állítási lehetőség
const chalk = require('chalk');

//"npm install prompt-sync" command a terminalon
//Megkérdezi a nevet (ékezetet nem érzékel), és köszön zöld színnel, majd ezt a nevet fogja kiírni az üzeneteknél
const prompt = require('prompt-sync')();
const name = prompt('Mi a neved? ');
console.log(chalk.green('Üdv, ' + name + '!'));

let port = 3000;

//Szerver létrehozása
var server = net.createServer(
	function (client){
		
		//Kliens port és cím kiírása zöld színnel
		console.log(chalk.green('Egy kliens csatlakozott a ' + client.remotePort + ' porton, és a '
		+ client.remoteAddress + ' címen.'));
		console.log(chalk.green('Kezdhetitek a beszélgetést!'))

		//Szerverhez beírt üzenet (buffer) a szerver által megadott név (name)
		// alapján kiírása a kliensnél cián színnel
		process.stdin.on('data',
		function(buffer){
			client.write(chalk.cyan(name + ' üzenete: ' +  buffer));
		}
	);

	  //Klienstől kapott üzenet (buffer) kiírása a szerveren sárgával
	  client.on('data',
	    function(buffer){
			process.stdout.write(chalk.yellow(buffer));
	   }
	  );
	}
);

//Szerver várakozik a 3000-es porton
console.log('A szerver várakozik a ' + port + '-es porton!')
server.listen(port);

