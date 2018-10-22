

var express = require('express');
var app = express();
app.use(express.static('public'));
app.use(express.static('dashboard'));
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var lobbyUsers = [];
var users = [];


var activeGames = {};
var fullactiveGames = [];


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/default.html');
});

app.get('/dashboard/', function (req, res) {
    res.sendFile(__dirname + '/dashboard/dashboard.html');
});

app.get('/dashboard/', function (req, res) {
    res.sendFile(__dirname + '/dashboard/dashboard.html');
});

io.on('connection', function (socket) {
    console.log('new connection ' + socket);


    socket.on('login', function (data) {
        doLogin(socket, data);
    });

    function doLogin(socket, data) {
        if (typeof data === 'undefined') return;

        socket.userId = data.userId;

        if (!users[data.userId]) {
            console.log('creando nuevo usuario' + data.userId);
            users[data.userId] = {userId: socket.userId, games: {}, fullActivegames: {}, avatar: data.avatar, useruniqueid: data.useruniqueid, idpartida : {}};
        } else {
            console.log('usuario encontrado!');
            Object.keys(users[data.userId].games).forEach(function (gameId) {
                console.log('gameid - ' + gameId);

                if(!users[data.userId].fullActivegames){
                    users[data.userId].fullActivegames = users[data.userId].fullActivegames.filter(Boolean);
                }
                for (var i = 0; i <= users[data.userId].fullActivegames.length; i++) {
                    console.log("al hacer login las partidas activas: ",users[data.userId].fullActivegames[i]);
                    if(typeof users[data.userId].fullActivegames[i] === "undefined"){
                        delete users[data.userId].fullActivegames[i];
                        users[data.userId].fullActivegames = users[data.userId].fullActivegames.filter(Boolean);
                        console.log("al hacer login las partidas activas: despues del filterboolean ",users[data.userId].fullActivegames);
                    }
                }
            });
        }

        console.log("avatar en el login" + users[data.userId].avatar);

        socket.emit('login', {

            users: Object.keys(lobbyUsers),
            games: Object.keys(users[data.userId].games),
            activegames: users[data.userId].activegames,
            fullActivegames: users[data.userId].fullActivegames
        });

        lobbyUsers[data.userId] = socket;

        socket.broadcast.emit('joinlobby', socket.userId);

    }

    socket.on("joingameroom", function (data) {
        socket.broadcast.emit('joingameroom', data);
    });


    socket.on("getactivegames", function (data) {
    });

    socket.on('acceptinvite', function(data){
        socket.broadcast.emit('acceptinvite', data);
    });


    socket.on('invite', function (data) {

        console.log('got an invite from: ' + data.challengerId + ' --> ' + data.opponentId);
        if(socket.userId === data.challengerId){

            socket.broadcast.emit('leavelobby', socket.userId);
            socket.broadcast.emit('leavelobby', data.opponentId);


            var game = {
                id: Math.floor((Math.random() * 700) + 1),
                board: null,
                users: {white: socket.userId, black: data.opponentId}
            };

            socket.emit('getgames', {gameid: game.id, userw: game.users.white, userb: game.users.black});

            socket.gameId = game.id;
            //console.log("el socket + " , socket);
            socket.activeGames = game;
            activeGames[game.id] = game;

            console.log("que trae users antes de guardar en full active games" , users[game.users.white]);

            //Guardar toda la información de la partida
            users[game.users.white].fullActivegames[game.id] = {
                gameid: game.id,
                usuario_blancas: game.users.white,
                usuario_negras: game.users.black,
                avatarWhite: users[game.users.white].avatar,
                avatarBlack: users[game.users.black].avatar,
                uniqueidWhite: users[game.users.white].useruniqueid,
                uniqueidBlack: users[game.users.black].useruniqueid
            };

            console.log("que trae users despues de guardar en full active games" , users[game.users.white].fullActivegames[game.id]);

            users[game.users.black].fullActivegames[game.id] = {
                gameid: game.id,
                usuario_blancas: game.users.white,
                usuario_negras: game.users.black,
                avatarWhite: users[game.users.white].avatar,
                avatarBlack: users[game.users.black].avatar,
                uniqueidWhite: users[game.users.white].useruniqueid,
                uniqueidBlack: users[game.users.black].useruniqueid
            };

            console.log("users[game.users.black].fullActivegames[game.id] antes de enviar al joingame" , users[game.users.black].fullActivegames[game.id]);

            users[game.users.white].games[game.id] = game.id;
            users[game.users.black].games[game.id] = game.id;

            console.log('comenzando partida: ' + game.id);
            if (typeof lobbyUsers[game.users.white] !== "undefined" && typeof lobbyUsers[game.users.black] !== "undefined") {
                lobbyUsers[game.users.white].emit('joingame', {game: game, color: 'white', fullActivegames: users[game.users.white].fullActivegames[game.id]});
                lobbyUsers[game.users.black].emit('joingame', {game: game, color: 'black', fullActivegames:   users[game.users.black].fullActivegames[game.id]});
                delete lobbyUsers[game.users.white];
                delete lobbyUsers[game.users.black];
                socket.broadcast.emit('gameadd', {gameId: game.id, gameState: game});
            }
        }
    });

    socket.on('getidpartida', function (data) {
        console.log("todo lo que trae el get idpartida" , data);
        if(socket.userId === data.userWhite || socket.userId === data.userBlack){
            users[data.userWhite].idpartida[data.gameid] = data.idpartida;
            users[data.userBlack].idpartida[data.gameid] = data.idpartida;
            console.log("probando guardado de idpartida en el servidor: " , users[data.userWhite].idpartida[data.gameid]);
            socket.broadcast.emit("getidpartida" , data);
        }
    });

    socket.on('resumegame', function (gameId) {

        console.log('ready to resume game: ' + gameId);

        socket.gameId = gameId;
        var game = activeGames[gameId];


        users[game.users.white].games[game.id] = game.id;
        users[game.users.black].games[game.id] = game.id;

        users[game.users.white].fullActivegames[game.id] = {
            gameid: game.id,
            usuario_blancas: game.users.white,
            usuario_negras: game.users.black,
            avatarWhite: users[game.users.white].avatar,
            avatarBlack: users[game.users.black].avatar,
            uniqueidWhite: users[game.users.white].useruniqueid,
            uniqueidBlack: users[game.users.black].useruniqueid
        };


        users[game.users.black].fullActivegames[game.id] = {
            gameid: game.id,
            usuario_blancas: game.users.white,
            usuario_negras: game.users.black,
            avatarWhite: users[game.users.white].avatar,
            avatarBlack: users[game.users.black].avatar,
            uniqueidWhite: users[game.users.white].useruniqueid,
            uniqueidBlack: users[game.users.black].useruniqueid

        };

        console.log('resuming game: ' + game.id);
        //antes de emitir y resumir
        console.log("----------------------------------");
        //console.log("test antes de resumir " , lobbyUsers[game.users.white]);
        console.log("test antes de resumir  users" ,  users[game.users.white].games[game.id]);
        console.log("test antes de resumir  users full active games" ,  users[game.users.white].fullActivegames[game.id]);


        if(lobbyUsers[game.users.white]){
            lobbyUsers[game.users.white].emit('joingame', {game: game, color: 'white', fullActivegames: users[game.users.white].fullActivegames[game.id], idpartida: users[game.users.white].idpartida[game.id]});
            delete lobbyUsers[game.users.white];
        }

        if(lobbyUsers[game.users.black]){
            lobbyUsers[game.users.black].emit('joingame', {game: game, color: 'black',fullActivegames: users[game.users.black].fullActivegames[game.id], idpartida: users[game.users.black].idpartida[game.id]});
            delete lobbyUsers[game.users.black];
        }
    });


    socket.on('move', function (msg) {
        console.log("Lo que esta llegando cada movimiento: ", msg);
        console.log("lo que trae el activegames de esta partida: ", activeGames[msg.gameId]);
        socket.broadcast.emit('move', msg);
        if(activeGames[msg.gameId]) activeGames[msg.gameId].board = msg.board;
    });

    socket.on('resign', function (msg) {
        console.log("en el resign: " , activeGames[msg.gameId]);

        if(!users[activeGames[msg.gameId]]){
            console.log("fullactive games antes de eliminar" , users[activeGames[msg.gameId].users.white].fullActivegames[msg.gameId]);
            delete users[activeGames[msg.gameId].users.white].fullActivegames[msg.gameId];
            delete users[activeGames[msg.gameId].users.black].fullActivegames[msg.gameId];
            delete users[activeGames[msg.gameId].users.white].games[msg.gameId];
            delete users[activeGames[msg.gameId].users.black].games[msg.gameId];
            delete users[activeGames[msg.gameId].users.white].idpartida[msg.gameId];
            delete users[activeGames[msg.gameId].users.black].idpartida[msg.gameId];
            delete activeGames[msg.gameId];
            socket.broadcast.emit('resign', msg);
        }

    });


    socket.on('disconnect', function (msg) {

        console.log("esta madre esta imprimiendo el mensaje", msg);

        if (socket && socket.userId && socket.gameId) {
            console.log(socket.userId + ' disconnected');
            console.log(socket.gameId + ' disconnected');
        }

        delete lobbyUsers[socket.userId];

        socket.broadcast.emit('logout', {
            userId: socket.userId,
            gameId: socket.gameId
        });
    });

    /////////////////////
    // Dashboard messages
    /////////////////////

    socket.on('dashboardlogin', function () {
        console.log('dashboard joined');
        socket.emit('dashboardlogin', {games: activeGames});
    });
});

http.listen(port, function () {
    console.log('listening on *: ' + port);
});

/*
 ───────── ████▓▓▓▓▓▓████
 ────────██▓▓▓▓▓▓KEV▓▓▓▓██
 ──────██▓▓▓▓▓▓████████████
 ────██▓▓▓▓▓▓████████████████
 ────██▓▓████░░░░░░░░░░░░██████
 ──████████░░░░░░██░░██░░██
 ──██░░████░░░░░░██░░██░░██
 ██░░░░██████░░░░░░░░░░░░░░██
 ██░░░░░░██░░░░██░░░░░░░░░░██
 ──██░░░░░░░░░███████░░░░█████
 ────████░░░░░░░███████████
 ──────██████░░░░░░░░░░██
 */
