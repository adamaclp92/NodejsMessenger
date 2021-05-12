var net = require('net');

//"npm install chalk" a terminalon
//betűszín állítási lehetőség
const chalk = require('chalk');

//Ehhez szükséges az "npm install prompt-sync" command a terminalon
//Megkérdezi a nevet (ékezetet nem érzékel), és köszön zöld színnel, majd ezt a nevet fogja kiírni az üzeneteknél
const prompt = require('prompt-sync')();
const name = prompt('Mi a neved? ');
console.log(chalk.green('Üdv, ' + name + '!'));

let port = 3000;
var sock = net.Socket();

//csatlakozás a szerverre
sock.connect(port, "localhost");

sock.on('connect',
    function(){
        //Sikeres csatlakozás esetén üzenet kiíratás zöld színnel
        console.log(chalk.green('Szerverhez csatlakozva!'));
        console.log(chalk.green('Kezdhetitek a beszélgetést!'))

        //Klienshez beírt üzenet (buffer) a kliens által megadott név (name)
		// alapján kiírása a szervernél
        process.stdin.on('data',
            function(buffer){
                sock.write(name + ' üzenete: ' +  buffer);
            }
        );
    }
);

//Szervertől kapott üzenet (buffer) kiírása a kliensen
sock.on('data',
function(buffer){
    process.stdout.write(buffer);
}
);

