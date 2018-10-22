/**
 * Created by kevin on 10/15/18.
 */
let onlineChess = () => {

    let iduser1_photo;
    let iduser2_unique = "";
    let partida_comenzada = false;
    let change_location = false;
    let check_active = false;
    let ganador = "";
    let turno = "";
    let name_control = "";
    let total_score = 100;
    let score = 0;
    let chesspieces_points = 0;
    let chesspieces_pointsblack = 0;
    let user_black;
    let room;
    let user_white;
    let active = false;
    let users_playing = {};
    let serverGame;
    let playerColor;
    let game, board;
    let partidasGonline = 0;
    let partidasGcpu = 0;
    let partidasGretos = 0;
    let usersOnline = [];
    let myGames = [];
    let jaquemate = false;
    //let socket = io("http://sagecell.sofiaxt.com:5001");
    let socket = io('http://sagecell.sofiaxt.com:3000');
    let currentturno = "";
    //var idpartida = "";
    let oponente = { avatar: "", gameid: "" };
    let currentgame_id = 0;
    let oponentid = "";
    let activegames = {};
    let myqueue = {};
    let queuecontrol = [];
    let myinfo = { avatar: "", idpartida: "" };


    //-----------------------------------------------------------------------------------------------------------------------------
    //------------------------------------------STARTING SETUP---------------------------------------------------------------------

    //guardar usuario y id de la DB
    //debugger;
    let username = username_cs;
    let useruniqueid = userid_cs;
    let userlevel = localStorage.getItem("Nivel");
    room = "lobby";
    $('#page-lobby').show();
    $('#page-game').hide();
    $('#page-loading').hide();
    $('#page-puzzle').hide();
    $('#userLabel').text(username);

    $.get("/Dashboard/_GetUserPicture", null, function (d) {
        //debugger;
        var user = d;
        var name = user.Name;
        var firstName = name.split(" ", 1);
        usernameK = firstName;
        myinfo.avatar = user.Avatar;
    });

    function checkAvatarurl() {
        if (myinfo.avatar !== "" && typeof myinfo.avatar !== "undefined") {
            //debugger;
            socket.emit('login', { userId: username, avatar: myinfo.avatar, useruniqueid: useruniqueid });
        }
        else {
            ////console.log("entro el window set time out");
            setTimeout(checkAvatarurl, 1000);
        }
    }
    checkAvatarurl();

    $.get("/Ajedrez/_GetPartidasGamesPlayed", {}, function (data) {
        data.forEach(function (item) {
            //contadorpartidas = contadorpartidas + 1;
            ////console.log("numero de objetos: " + contadorpartidas);
        });
    });

    $("#VSCPU").click(function () {
        change_location = true;
    });

    $("#PUZZLE").click(function () {
        change_location = true;
    });

    //console.log("usrname " + username);
    if (username === "KEVINVAI") {

        $("#infodiv").css("background-color", "#5bc0de");
        $("#infodiv").css("border-color", "#428bca");
    }

    refreshCliX1 = setInterval(() => {

        for (var i = usersOnline.length; i >= 0; i--) {

            if (usersOnline[i] === username) {
                usersOnline.splice(i, 1);
            } else if (usersOnline[i] === previous_item) {
                usersOnline.splice(i, 1);
            }

            var previous_item = usersOnline[i];
        }

        $('#userList').empty();
        $('#game-points').empty();
        $('#userLevel').empty();

        updateUserList();

    }, 3000);

    function getScore() {
        score = chesspieces_points * 4;
        total_score = score + total_score;

        return total_score;

    }

    //codigo para historial
    let renderMoveHistory = moves => {
        var historyElement = $('#move-history').empty();
        var history_number = $('#turn_number').empty();
        var history_blancas = $('#blancas').empty();
        var history_negras = $('#negras').empty();
        var movimientos_chess = $('#movimientos_chess')
        historyElement.empty();
        var j = 0;
        for (var i = 0; i < moves.length; i = i + 2) {
            //debugger;
            j = j + 1;
            // //console.log(moves[i + 1]);
            var value = moves[i].toString();
            var el_Extracto = (value.substring(0, 1));
            // //console.log("el substring= " + el_Extracto);
            if (value.substring(0, 1) == "N") {
                value = value.replace("N", "♘");
                moves[i] = value;
            } else if (value.substring(0, 1) == "B") {
                value = value.replace("B", "♗");
                moves[i] = value;
            } else if (value.substring(0, 1) == "R") {
                value = value.replace("R", "♖");
                moves[i] = value;
            } else if (value.substring(0, 1) == "Q") {
                value = value.replace("Q", "♕");
                moves[i] = value;
            } else if (value.substring(0, 1) == "K") {
                value = value.replace("K", "♔");
                moves[i] = value;
            } else if (value.substring(0, 1) !== "K" && value.substring(0, 1) !== "B" && value.substring(0, 1) !== "R" && value.substring(0, 1) !== "N" && value.substring(0, 1) !== "Q" && value.substring(0, 1) !== "O") {
                var wpawn = "♙";
                value = wpawn + value;
                moves[i] = value;
            }
            var value_black = (moves[i + 1]);
            if (value_black !== undefined) {

                var el_Extracto_negro = (value_black.substring(0, 1));
                ////console.log("el substring negro = " + el_Extracto_negro);

                if (value_black.substring(0, 1) == "K") {
                    value_black = value_black.replace("K", "♚");
                    moves[i + 1] = value_black;
                } else if (value_black.substring(0, 1) == "N") {
                    value_black = value_black.replace("N", "♞");
                    moves[i + 1] = value_black;
                } else if (value_black.substring(0, 1) == "B") {
                    value_black = value_black.replace("B", "♝");
                    moves[i + 1] = value_black;
                } else if (value_black.substring(0, 1) == "R") {
                    value_black = value_black.replace("R", "♜");
                    moves[i + 1] = value_black;
                } else if (value_black.substring(0, 1) == "Q") {
                    value_black = value_black.replace("Q", "♛");
                    moves[i + 1] = value_black;
                } else if (value_black.substring(0, 1) !== "K" && value_black.substring(0, 1) !== "B" && value_black.substring(0, 1) !== "R" && value_black.substring(0, 1) !== "N" && value_black.substring(0, 1) !== "Q" && value.substring(0, 1) !== "O") {
                    var bpawn = "♟";
                    value_black = bpawn + value_black;
                    moves[i + 1] = value_black;
                }
            }
            // historyElement.append('<td>' + j + '</td>');// + '<td>' + moves[i] + '</td>' + '<td>' + (moves[i + 1] + '</td>');




            history_number.append('<strong>' + j + '</strong></br>');
            history_blancas.append('<strong>' + moves[i] + '</strong></br>');
            if (value_black !== undefined) {
                history_negras.append('<strong>' + moves[i + 1] + '</strong></br>');
            }
        }
        $('#reset').on('click', function () {
            history_blancas.empty();
            history_negras.empty();
            history_number.empty();
        });

        $('#reset-md').on('click', function () {
            history_blancas.empty();
            history_negras.empty();
            history_number.empty();
        });

        $('#reiniciar').on('click', function () {

            history_blancas.empty();
            history_negras.empty();
            history_number.empty();
        });

        $('#reiniciar-md').on('click', function () {

            history_blancas.empty();
            history_negras.empty();
            history_number.empty();
        });

        //movimientos.chess.scrollTop(historyElement[0].scrollHeight);

    };


    //----------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------



    //////////////////////////////
    // Socket.io handlers
    //////////////////////////////
    socket.on("connect", function () {
        Notifier.success("Te has conectado al servidor");


        socket.on('login', function (msg) {
            usersOnline = msg.users;
            updateUserList();
            myGames = msg.games;
            var control = false;
            //if (msg.fullActivegames !== null && typeof msg.fullActivegames !== "undefined" && msg.fullActivegames.length > 1) {
            //console.log("fullactive games en evento login: ", msg.fullActivegames);
            myqueue = msg.fullActivegames;
            updateGamesList();
            //socket.emit("getgames", myqueue);
        });

        socket.on("private", function (data) {
            alert(data);
        });

        socket.on("getidpartida", function (data) {
            //debugger;
            if (username === data.userBlack) {
                myinfo.idpartida = data.idpartida;
            }
        });


        socket.on("getgames", function (data) {
            activegames = data;
        });

        socket.on("getactivegames", function (data) {

        });

        socket.on("acceptinvite", function (data) {
            //Esperar confirmacion de usuario
            if (username === data.obj.game.users.white || username === data.obj.game.users.black) {
                $("#page-loading").hide();
                $('#page-game').show();
                initGame(data.obj);
            }
        });

        socket.on("joingameroom", function (data) {
            //debugger;
            if (username === data.userWhite || username === data.userBlack) {
                oponentid = data.uniqueid;
                oponente.gameid = data.gameid;
                flag = true;
                oponente.avatar = data.avatar;
            }
        });

        socket.on('game-back', function () {
        });

        socket.on('joinlobby', function (msg) {
            ////console.log("estado del room actual: " + room);
            addUser(msg);
        });

        socket.on('invite', function () {
        });

        socket.on('resumegame', function () {
        });

        socket.on('leavelobby', function (msg) {
            $('#userList').empty();
            $('#game-points').empty();
            $('#userLevel').empty();
            //$('#opponent-id').empty();
            removeUser(msg);
        });

        socket.on('gameadd', function (msg) {
        });

        socket.on('resign', function (msg) {

            //var check = [];
            //console.log("myqueue antes del delete : ", myqueue);

            function deleteQueue() {
                if (myqueue[msg.gameId])
                    delete myqueue[msg.gameId];
                // myqueue = myqueue.filter(Boolean);
            }

            deleteQueue();

            if (msg.idpartida !== null && msg.idpartida !== "" && typeof msg.idpartida !== 'undefined') {
                $.get("/Ajedrez/_Resign", {
                    IdPartida: msg.idpartida, puntosblancos: chesspieces_points, puntosnegros: chesspieces_pointsblack
                }, function (data) {
                    //console.log("se hizo el resign en la DB");
                });
            }

            $('#gamesListK').empty();
            //console.log("despues del resign: ", myqueue);
            updateGamesList();

            if (typeof serverGame !== "undefined" && serverGame !== null) {
                if (msg.gameId === serverGame.id) {
                    // //console.log("lo que trae el mensaje cuando se rinde el usuario : ", msg);
                    ////console.log("jaquemate " + jaquemate);
                    if (jaquemate === false) {
                        bootbox.alert("<b>" + msg.userId + "</b>" + " abandonó la partida");
                    }

                    if (typeof (username) !== "undefined") {
                        socket.emit('login', { userId: username, avatar: myinfo.avatar, useruniqueid: useruniqueid });
                    }

                    updateGamesList();
                    check_active = false;

                    room = "lobby";
                    //oponente.avatar = "";
                    $('#page-game').hide();
                    $('#page-lobby').show();
                    $('#move-history').empty();
                    $('#turn_number').empty();
                    $('#blancas').empty();
                    $('#negras').empty();
                    $('#pieces').empty();
                }
            }

            $('#page-game').hide();
            $('#page-lobby').show();
            $('#move-history').empty();
            $('#turn_number').empty();
            $('#blancas').empty();
            $('#negras').empty();
            $('#pieces').empty();
        });

        socket.on('joingame', function (msg) {
            //debugger;
            if (msg.idpartida) {
                myinfo.idpartida = msg.idpartida;
            }
            ////console.log(msg);
            jaquemate = false;
            var counter = 0;
            for (var key in myqueue) {
                if (myqueue.hasOwnProperty(key)) {
                    //console.log("entro el  " + key + " = ", myqueue[key]);
                    if (msg.game.users.white === myqueue[key].usuario_blancas && msg.game.users.black === myqueue[key].usuario_negras) {
                        counter = counter + 1;
                    }
                }
            } if (counter > 0) {
                //console.log("---------------------- YA HAY UNA PARTIDA EXISTENTE NO MOSTRAR BOOTBOX");
                // debugger;
                if (username === msg.game.users.black) {
                    if (room === "game-room") {
                        bootbox.alert("el usuario " + msg.game.users.white + "realizo un movimiento en la sala " + msg, game.id);
                    }
                    else {
                        bootbox.alert("Te uniste a la sala " + msg.game.id + " con " + msg.game.users.white);
                    }
                } else {
                    bootbox.alert("Te uniste a la sala " + msg.game.id + " con " + msg.game.users.black);
                }


                room = "game-room";
                $('#page-lobby').hide();
                $('#page-game').show();
                playerColor = msg.color;
                initGame(msg);
                currentgame_id = msg.game.id;
                //debugger;
                if (username === msg.game.users.black) {
                    var imgCh = "<img class='chess-img center-block img-responsive' style='margin:0 auto;' src='" + myinfo.avatar + "' onerror='SofiaUI.fixBrokenImg(this);'>";
                    var imgCh2 = "<img class='chess-img center-block img-responsive' style='margin:0 auto;' src='" + msg.fullActivegames.avatarWhite + "' onerror='SofiaUI.fixBrokenImg(this);'>";
                    $("#avatar1").html(imgCh2);
                    $("#avatar2").html(imgCh);
                } else {
                    var imgCh = "<img class='chess-img center-block img-responsive' style='margin:0 auto;' src='" + myinfo.avatar + "' onerror='SofiaUI.fixBrokenImg(this);'>";
                    var imgCh2 = "<img class='chess-img center-block img-responsive' style='margin:0 auto;' src='" + msg.fullActivegames.avatarBlack + "' onerror='SofiaUI.fixBrokenImg(this);'>";
                    $("#avatar1").html(imgCh);
                    $("#avatar2").html(imgCh2);
                }

                ////console.log("lo que trae el mensaje del juego: ", msg.game.users);
            } else {
                room = "game-room";
                //console.log("Lo que trae joingame --------------------", msg);
                myqueue[msg.game.id] = msg.fullActivegames;
                //console.log("msg.fullActivegames", msg.fullActivegames);
                ////console.log("estado del room actual: " + room);
                if (username == msg.game.users.white) {
                    ////console.log("joined as game id: " + msg.game.id);
                    $('#page-lobby').hide();
                    $('#page-loading').show();
                    //$('#page-game').show();
                    playerColor = msg.color;
                    //initGame(msg);
                    currentgame_id = msg.game.id;
                    //esperar adversario


                    //debugger;
                    var imgCh = "<img class='chess-img center-block img-responsive' style='margin:0 auto;' src='" + myinfo.avatar + "' onerror='SofiaUI.fixBrokenImg(this);'>";
                    var imgCh2 = "<img class='chess-img center-block img-responsive' style='margin:0 auto;' src='" + msg.fullActivegames.avatarBlack + "' onerror='SofiaUI.fixBrokenImg(this);'>";
                    $("#avatar1").html(imgCh);
                    $("#avatar2").html(imgCh2);

                    if (currentgame_id !== null && typeof currentgame_id !== "undefined" && currentgame_id !== "") {
                        if (typeof serverGame !== "undefined") {
                            if (oponentid !== null && typeof oponentid !== "undefined") {
                                $.get("/Ajedrez/_NuevaPartida", {
                                    iduserdestino: msg.fullActivegames.uniqueidBlack, identificador: currentgame_id, tipo: 0, position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
                                }, function (data) {
                                    myinfo.idpartida = data.Id;
                                    socket.emit("getidpartida", { idpartida: myinfo.idpartida, gameid: msg.game.id, userWhite: msg.game.users.white, userBlack: msg.game.users.black });
                                    //console.log("se creo una nueva partida en la DB");
                                    //console.log("1 ", msg.uniqueidBlack);
                                    //console.log("2 ", msg.fullActivegames.uniqueidBlack);

                                });
                            }
                        }
                    }

                    ////console.log("consultas: " + currentgame_id);
                    //socket.emit("joingameroom", { userWhite: msg.userWhite, userBlack: msg.userBlack, uniqueid: useruniqueid, avatar: useravatar });

                    ////console.log("lo que trae el mensaje del juego: ", msg.game.users);

                } else {
                    let doInvite = () => {

                        if (partida_comenzada === false) {
                            bootbox.confirm({
                                size: "large",
                                title: "Invitacion",
                                message: "el usuario " + msg.game.users.white + " te esta retando",
                                buttons: {
                                    confirm: {
                                        label: 'Aceptar',
                                        className: 'btn-primary'
                                    },
                                    cancel: {
                                        label: 'Rechazar',
                                        className: 'btn-danger'
                                    }
                                },
                                callback: function (result) {
                                    if (result === true) {

                                        $('#page-lobby').hide();
                                        $('#page-game').show();
                                        //socket.emit('acceptinvite', { userId: username });
                                        playerColor = msg.color;
                                        initGame(msg);
                                        socket.emit('acceptinvite', { userId: username, obj: msg });
                                        currentgame_id = msg.game.id;
                                        //debugger;
                                        var imgCh = "<img class='chess-img center-block img-responsive' style='margin:0 auto;' src='" + myinfo.avatar + "' onerror='SofiaUI.fixBrokenImg(this);'>";
                                        var imgCh2 = "<img class='chess-img center-block img-responsive' style='margin:0 auto;' src='" + msg.fullActivegames.avatarWhite + "' onerror='SofiaUI.fixBrokenImg(this);'>";
                                        $("#avatar1").html(imgCh2);
                                        $("#avatar2").html(imgCh);
                                        ////console.log("lo que trae el mensaje del juego: ", msg.game.users);

                                    } else {

                                        socket.emit('acceptinvite', { userId: username, obj: msg });
                                        initGame(msg);
                                        if (typeof serverGame !== "undefined" && typeof serverGame.users.white !== "undefined" && typeof serverGame.id !== "undefined") {
                                            if (myinfo.partida !== null && myinfo.idpartida !== "" && typeof myinfo.idpartida !== "undefined") {
                                                socket.emit('resign', { userId: username, gameId: serverGame.id, idpartida: myinfo.idpartida });
                                            } else {
                                                socket.emit('resign', { userId: username, gameId: serverGame.id });
                                            }
                                            socket.emit('login', { userId: username, avatar: myinfo.avatar, useruniqueid: useruniqueid });
                                        }
                                    }
                                }
                            });
                        } else {
                            $('#page-lobby').hide();
                            $('#page-game').show();
                        }
                    }
                    doInvite();
                }
            }
            counter = 0;
        });

        socket.on('move', function (msg) {
            var player_moved;
            console.log("on move");

            if (serverGame && msg.gameId === serverGame.id) {
                turno = game.turn();

                if (room !== "game-room") {
                    users_playing = serverGame.users;

                    //Object.keys(users_playing).forEach(function (key) {
                    //});

                    if (turno === "w") {
                        player_moved = serverGame.users.white;
                        bootbox.alert("<b>" + player_moved + "</b>" + " realizo un movimiento en la partida numero: " + msg.gameId);
                    } else if (turno === "b") {
                        player_moved = serverGame.users.black;
                        bootbox.alert(player_moved + " realizo un movimiento en la partida numero: " + msg.gameId);
                    }
                    ////console.log("el current turn " + currentturno);
                }

                if (turno === "w") {
                    player_moved = serverGame.users.white;
                    ////console.log(serverGame.users.white);
                    currentturno = "(Negras)" + serverGame.users.black + "";
                    // debugger;
                    $(".turn-chess").addClass('rotate');
                    $("#avatar1 img").removeClass('turno-img');
                    $("#avatar2 img").addClass('turno-img');

                } else if (turno === "b") {
                    player_moved = serverGame.users.black;
                    ////console.log(serverGame.users.black);
                    currentturno = "(blancas)" + serverGame.users.white;

                    // debugger;
                    $(".turn-chess").removeClass('rotate');
                    $("#avatar1 img").addClass('turno-img');
                    $("#avatar2 img").removeClass('turno-img');

                }

                game.move(msg.move);
                board.position(game.fen());


                $("#perfil-enemigo").addClass("turn");
                $("#perfil").removeClass("turn");
                //renderMoveHistory(game.history());
                if (turno === "b") {
                    if (game.in_checkmate()) {
                        jaquemate = true;
                        ////console.log("username : " + username + " usuario blanco ganador : " + serverGame.users.white);
                        if (username === serverGame.users.black) {
                            $('#page-game').hide();
                            $('#page-lobby').show();
                        } else {
                            //resignya
                            //if (typeof serverGame !== "undefined" && typeof serverGame.users.white !== "undefined") {
                            if (myinfo.idpartida !== null && myinfo.idpartida !== "" && typeof myinfo.idpartida !== "undefined") {
                                socket.emit('resign', { userId: username, gameId: serverGame.id, idpartida: myinfo.idpartida });
                            } else {
                                socket.emit('resign', { userId: username, gameId: serverGame.id });
                            }
                            socket.emit('login', { userId: username, avatar: myinfo.avatar, useruniqueid: useruniqueid });
                            $('#page-game').hide();
                            $('#page-lobby').show();
                            bootbox.alert("Ganó negras (" + serverGame.users.black + ")");
                            //} else {
                            ////console.log("linea resignya " + serverGame);
                            //}
                        }
                    }
                }
                else if (turno === "w") {
                    if (game.in_checkmate()) {
                        jaquemate = true;
                        ////console.log("username : " + username + " usuario blanco ganador : " + serverGame.users.white);
                        if (username === serverGame.users.white) {
                            $('#page-game').hide();
                            $('#page-lobby').show();
                        } else {
                            //resignya
                            //if (typeof serverGame !== "undefined" && typeof serverGame.users.black !== "undefined") {
                            if (myinfo.idpartida !== null && myinfo.idpartida !== "" && typeof myinfo.idpartida !== "undefined") {
                                socket.emit('resign', { userId: username, gameId: serverGame.id, idpartida: myinfo.idpartida });
                            } else {
                                socket.emit('resign', { userId: username, gameId: serverGame.id });
                            }
                            socket.emit('login', { userId: username, avatar: myinfo.avatar, useruniqueid: useruniqueid });
                            $('#page-game').hide();
                            $('#page-lobby').show();
                            bootbox.alert("Ganó blancas (" + serverGame.users.white + ")");

                            // } else {
                            ////console.log("linea resignya " + typeof serverGame);
                            //}
                        }
                    }
                }
                if (game.in_check()) {
                    if (game.in_checkmate) {
                    } else {
                        $("img[data-piece='wK']").parent().css("background", "red");
                    }
                }

                if (game.in_stalemate()) {
                    bootbox.alert('empate');
                }
            } renderMoveHistory(game.history()); //onmove

        });


        socket.on('logout', function (msg) {
            removeUser(msg.userId);

            if (typeof servergame === "undefined") {
                //hacer nada
            } else {
                // //console.log("id del player que se desconecto= " + msg.gameId + "id del usuario= " + serverGame.id);
                if (msg.gameId === serverGame.id) {
                    if (room !== "lobby") {
                        bootbox.alert("El oponente se desconectó o perdio la conexion puedes seguir en la partida pero no habra respuesta inmediata");
                    }
                } else {
                    //removeUser(msg.userId); no hacer nada
                }
            }
        });

        socket.on("disconnect", function () {
            if (change_location === true) {
                //nada
            } else {
                location.reload();
                Notifier.warning("se perdió la conexion con el servidor");
                $("#logListk").empty();
                $("#logListk").empty();
                $("#userListk").empty();
                $("#page-lobby").show();
                $("#page-game").show();
            }
        });
    });

    //////////////////////////////
    // Menus
    //////////////////////////////
    $('#game-back').on('click', function () {
        if (typeof username !== "undefined") {
            socket.emit('login', { userId: username, avatar: myinfo.avatar, useruniqueid: useruniqueid });
        }

        room = "lobby";
        $('#page-game').hide();
        $('#page-lobby').show();
        $('#pieces').empty();


    });

    $('#game-back-md').on('click', function () {
        if (typeof username !== "undefined") {
            socket.emit('login', { userId: username, avatar: myinfo.avatar, useruniqueid: useruniqueid });
        }

        $('#page-game').hide();
        $('#page-lobby').show();
        $('#pieces').empty();
    });

    //resign-------------------------------------
    $('#game-resign').on('click', function () {
        $("#modal-redirect").modal("show");
    });
    $("#decline-redirect").on("click", function () {
        $("#modal-redirect").modal("hide");
    });



    $('#accept-redirect').on('click', function () {
        room = "lobby";

        $("#modal-redirect").modal("hide");
        //if (typeof serverGame !== "undefined" && typeof serverGame.users.white !== "undefined" && typeof serverGame.users.black !== "undefined") {
        if (myinfo.idpartida !== null && myinfo.idpartida !== "" && typeof myinfo.idpartida !== "undefined") {
            socket.emit('resign', { userId: username, gameId: serverGame.id, idpartida: myinfo.idpartida });
        } else {
            socket.emit('resign', { userId: username, gameId: serverGame.id });
        }
        socket.emit('login', { userId: username, avatar: myinfo.avatar, useruniqueid: useruniqueid });
        check_active = false;


        //}

        users_playing = {};
        check_active = false;
        $('#page-game').hide();
        $('#page-lobby').show();
        $('#move-history').empty();
        $('#turn_number').empty();
        $('#blancas').empty();
        $('#negras').empty();
        $('#pieces').empty();


    });


    $('#game-resign-md').on('click', function () {
        $("#modal-redirect").modal("show");
    });



    var addUser = function (userId) {
        usersOnline.push(userId);
        updateUserList();
    };

    var removeUser = function (userId) {
        for (var i = 0; i < usersOnline.length; i++) {
            if (usersOnline[i] === userId) {
                usersOnline.splice(i, 1);
            }
        }

        updateUserList();
    };

    var removeGame = function (userId) {
        for (var i = 0; i < myGames.length; i++) {
            if (myGames[i] === game) {
                myGames.splice(i, 1);
            }
        }

        updateGamesList();
    };


    var updateGamesList = function () {
        var counter = 0;
        $('#gamesListK').empty("");

        var gameid = "";
        var userw = "";
        var userb = "";


        if (myqueue !== null && typeof myqueue !== "undefined") {

            counter = 0;
            //debugger;
            for (var key in myqueue) {

                if (myqueue.hasOwnProperty(key)) {
                    //console.log("entro el  " + key + " = ", myqueue[key]);
                    gameid = myqueue[key].gameid;
                    userw = myqueue[key].usuario_blancas;
                    userb = myqueue[key].usuario_negras;

                    $('#gamesListK').append(
                        '<tr class="btnJoinK onGamID" id="game_"' + 'data-valx="' + gameid + '">' +
                        '</td><td id="" class="col-xs-4 userBlack">' + userw + '</td>' +
                        '</td><td id= "currentturno" class="col-xs-3 userWhite" >' + userb +
                        '<td id="gameid" class=" itemGame">' + gameid +
                        '</tr>'
                    );
                }
            }
        }


        $(".onGamID").on('click', function () {
            //console.log("el gameeee : " + $(this).data("valx"));
            socket.emit('resumegame', $(this).data("valx"));
        });
    };



    var updateLogList = function () {

        //$('#gamesListK').html("");
        $.get("/Ajedrez/_GetPartidaStats", {

        }, function (data) {
            //debugger;
            if (typeof data.user1 !== "undefined" || typeof data.user2 !== "undefined") {

            } else {

            }


            data.forEach(function (item) {

                var partidaid = item.user1;
                var partidaganador = item.userganador;
                var partidauser2 = item.user2;
                var tipopartida = item.tipopartida;
                var fechapartida = item.fecha;
                var resignado = item.IsResignado;
                //debugger;
                if (partidaganador !== null && typeof partidaganador !== "undefined") {
                    $('#logListK').append(
                        '<tr class="btnJoinK">' +
                        '<td class="col-xs-4 userBlack">' + partidaid + '</td>' +
                        '<td class="col-xs-3" >' + partidauser2 +
                        '</td><td >' + partidaganador + '</td>' +
                        //'</td><td >' + fechapartida + '</td>' +
                        '</tr>'
                    );
                    ////console.log("success");
                } else if (typeof resignado !== "undefined") {
                    $('#logListK').append(
                        '<tr class="btnJoinK">' +
                        '<td class="col-xs-4 userBlack">' + partidaid + '</td>' +
                        '<td class="col-xs-3" >' + partidauser2 +
                        '</td><td >' + resignado + '</td>' +
                        // '</td><td >' + fechapartida + '</td>' +
                        '</tr>'
                    );
                    ////console.log("success");
                }
            });
        });
    };

    updateLogList();

    var updateUserList = function () {
        $('#userListK').html("");
        usersOnline.forEach(function (user) {
            //<div id ="advanced"class="circle">
            $('#userListK').append(
                '<tr class="btnJoinK" id="user_' + user + '">' +
                '<td id="" class=" itemList"><p style="margin-top: 4px;">' + user +
                '</p></td><td id="" class="col-xs-4"><button class="btn btn-info btn-sm center-">' + "Retar" + '</button></td>' +
                '</tr>');

            $('#user_' + user).on('click', function () {
                if (typeof serverGame !== "undefined" || typeof username !== "undefined" || typeof serverGame.users.white !== "undefined" & typeof serverGame.users.black !== "undefined") {
                    ////console.log("username : " + username);
                    jaquemate = false;
                    //test invitar solo una vez
                    //debugger;
                    var counter = 0;
                    for (var key in myqueue) {
                        if (myqueue.hasOwnProperty(key)) {
                            //console.log("entro el  " + key + " = ", myqueue[key]);
                            if (user === myqueue[key].usuario_blancas || user === myqueue[key].usuario_negras) {
                                counter = counter + 1;
                            }
                        }
                    } if (counter < 1) {
                        socket.emit('invite', { opponentId: user, challengerId: username });
                    } else {
                        bootbox.alert("Ya tienes una partida con este jugador, termina la partida antes de invitarlo");
                    }
                }

                else {
                    users_playing = serverGame.users;
                    Object.keys(users_playing).forEach(function (key) {
                        ////console.log(key, users_playing[key]);
                        if (check_active === true) {
                            bootbox.alert("ya tienes una partida activa con " + user + ", termina la partida antes de comenzar otra");
                            room = "lobby";
                        }
                    });
                }
            });
            var user_control = user;
        });

    };

    //////////////////////////////
    // Chess Game
    //////////////////////////////



    var initGame = function (serverGameState) {

        serverGame = serverGameState.game;
        if (serverGame.users.white === username || serverGame.users.black === username) {
            var vsuser = serverGame.users.white;
            var userw = vsuser;
            var userb;

            if (vsuser === username) {
                vsuser = serverGame.users.black;
                userb = vsuser;
                userw = username;
            } else {
                userb = username;
                userw = vsuser;
            }

            var versusInfo = '';

            versusInfo += '<div class="row">';
            versusInfo += '<div class="col-sm-6"> <div id="userturnw" class="text-center" style="color: white;">' + userw + '</div> </div>';
            versusInfo += '<div class="col-sm-6"> <div id="userturnb" class="text-center">' + userb + '</div> </div >';
            //versusInfo += '<div class="col-sm-6"> <div id="userturnb" class="text-center">' + userb + '</div> </div >';
            versusInfo += '<div class="turn-chess"> <span class="fa fa-arrow-left fa-1" style="font-size: 21px;" aria-hidden="true"></span> </div>';
            versusInfo += '</div>';

            $("#userversusinfo").html(versusInfo);

            $("#userversusinfo-xs").html('<div class="turn-chess"><span class="fa fa-arrow-left fa-1" style="font-size: 15px;" aria-hidden="true"></span></div><div class="row" style="margin-top: 10px;"><div class="col-xs-4"><b id="userturnw" class="text-center" style="color: white;">' + userw +
                '</b></div><div class="col-xs-4"><p class="text-center" style="color: white;">VS</p></div><div class="col-xs-4>"<b id="userturnb" class="text-center">'
                + userb + '</b></div></div>');
        }
        ////console.log("lo que trae el juego", game);

        function pieceTheme(piece) {
            // wikipedia theme for white pieces
            if (piece.search(/w/) !== -1) {
                return 'https://sofiaxt.blob.core.windows.net/imagenes/interfaz/alumno/ajedrez/pieces/wikipedia/' + piece + '.png';
            }

            // alpha theme for black pieces
            return 'https://sofiaxt.blob.core.windows.net/imagenes/interfaz/alumno/ajedrez/pieces/wikipedia/' + piece + '.png';
        }



        // do not pick up pieces if the game is over
        // only pick up pieces for the side to move
        var onDragStart = function (source, piece, position, orientation) {
            if (game.game_over() === true ||
                (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
                (game.turn() === 'b' && piece.search(/^w/) !== -1) ||
                (game.turn() !== playerColor[0])) {
                return false;
            }
        };

        var greySquare = function (square) {
            var temaSalvaje = $("#salvaje").attr("class");
            var squareEl = $('#board .square-' + square);
            squareEl.addClass('highlight-move');
            //var background = '#fffb2b';
            var contorno = 'inset 0 0 3px 3px yellow';
            if (squareEl.hasClass('black-3c85d') === true) {
                //background = '#eae600';
                //contorno = 'inset 0 0 3px 3px yellow'
            }

            //squareEl.css('box-shadow', contorno);
        };

        var movimientos = 0;
        var onDrop = function (source, target) {

            // see if the move is legal
            var move = game.move({
                from: source,
                to: target,
                promotion: 'q' // NOTE: always promote to a queen for example simplicity
            });

            turno = game.turn();


            //removeGreySquares();
            // illegal move
            if (move === null) {
                return 'snapback';
            } else {
                socket.emit('move', { move: move, gameId: serverGame.id, board: game.fen() });
            }

            // //console.log(move.captured);
            if (move !== undefined && move !== null) {


            } else {
                return 'snapback';
            }
            var takenpiece = move.captured;

            movimientos = movimientos + 1;

            ////console.log("pieza tomada: " + takenpiece);
            //debugger;
            var t = document.getElementById("pieces");
            var turn = game.turn();
            ////console.log("turno del jugador= " + turn);


            if (game.in_checkmate() == true) {
                //debugger;
                jaquemate = true;
                partida_comenzada = false;
                if (turn === "b") {

                    //bootbox.alert("Ganó blancas (" + serverGame.users.white + ")");

                    if (username === serverGame.users.white) {
                        getScore();
                        var score_imprimible = getScore()
                        init(2);
                        $("#modal-score").modal('show');
                        setTimeout(function () { $('#modal-score').modal('hide'); }, 4000);
                        $.get("/juego/SubirScoreJuego", {
                            id: "3438cc3a-7356-44e2-b4fa-6074cfe4982c", score: getScore(), descripcion: "Ajedrez(" + score_imprimible
                            + " puntos)"
                        }, function (data) {
                            //alert("Data: " + data);
                            if (data.Status === true) {

                                $.get("/puntoscreditos/agregarCreditos",
                                    { id: "", q: getScore(), d: "Tu puntaje: " + getScore() },
                                    function (data1) {
                                        // alert("Data1: " + data1);
                                    });
                            }

                        });
                    }
                } else {

                    // bootbox.alert("Ganó negras (" + serverGame.users.black + ")");

                    if (username === serverGame.users.black) {

                        getScore();
                        var score_imprimible = getScore()
                        init(2);
                        $("#modal-score").modal('show');
                        setTimeout(function () { $('#modal-score').modal('hide'); }, 4000);
                        $.get("/juego/SubirScoreJuego", {
                            id: "3438cc3a-7356-44e2-b4fa-6074cfe4982c", score: getScore(), descripcion: "Ajedrez(" + score_imprimible
                            + " puntos)"
                        }, function (data) {
                            //alert("Data: " + data);
                            if (data.Status === true) {

                                $.get("/puntoscreditos/agregarCreditos",
                                    { id: "", q: getScore(), d: "Tu puntaje: " + getScore() },
                                    function (data1) {
                                        // alert("Data1: " + data1);
                                    });
                            }

                        });

                    }


                }
            }

            if (turn === "b") {

                if (takenpiece !== undefined && takenpiece !== null) {
                    if (takenpiece === 'n') {
                        //alert("♘");
                        var y = document.createTextNode(" ♞");
                        t.appendChild(y);
                        chesspieces_points = chesspieces_points + 3;
                    } else if (takenpiece === 'b') {
                        //alert('♝');
                        var y = document.createTextNode(" ♝");
                        t.appendChild(y);
                        chesspieces_points = chesspieces_points + 3;
                    } else if (takenpiece === 'r') {
                        //alert('♜');
                        var y = document.createTextNode(" ♜");
                        t.appendChild(y);
                        chesspieces_points = chesspieces_points + 5;
                    } else if (takenpiece === 'q') {
                        //alert('♛');
                        var y = document.createTextNode(" ♛");
                        t.appendChild(y);
                        chesspieces_points = chesspieces_points + 9;
                    } else if (takenpiece === 'p') {
                        //alert('♟');
                        var y = document.createTextNode(" ♟");
                        t.appendChild(y);
                        chesspieces_pointsblack = chesspieces_points + 1;
                    }
                    ////console.log("puntos de piezas tomadas: " + chesspieces_points);
                }
            } else {

                if (takenpiece !== undefined && takenpiece !== null) {
                    if (takenpiece === 'n') {
                        //alert("♘");
                        var y = document.createTextNode("♘");
                        t.appendChild(y);
                        chesspieces_points = chesspieces_points + 3;
                    } else if (takenpiece === 'b') {
                        //alert('♝');
                        var y = document.createTextNode(" ♗");
                        t.appendChild(y);

                        chesspieces_points = chesspieces_points + 3;
                    } else if (takenpiece === 'r') {
                        //alert('♜');
                        var y = document.createTextNode(" ♖");
                        t.appendChild(y);
                        chesspieces_points = chesspieces_points + 5;
                    } else if (takenpiece === 'q') {
                        //alert('♛');
                        var y = document.createTextNode(" ♕");
                        t.appendChild(y);
                        chesspieces_points = chesspieces_points + 9;
                    } else if (takenpiece === 'p') {
                        //alert('♟');
                        var y = document.createTextNode(" ♙");
                        t.appendChild(y);
                        chesspieces_points = chesspieces_points + 1;
                    }
                    ////console.log("puntos de piezas tomadas: " , chesspieces_points);
                }

            }

            if (game.in_check()) {
                if (game.in_checkmate) {
                } else {
                    bootbox.alert('estas en jaque, protege a tu rey');
                }
            }

            if (game.in_stalemate()) {
                bootbox.alert('empate');
            }

            $("#perfil-enemigo").addClass("turn");
            $("#perfil").removeClass("turn");

            /*if (game.in_checkmate()) {
             if (typeof serverGame !== "undefined") {
             removeGame(game);
             }
             var removeUser = function (userId) {
             for (var i = 0; i < usersOnline.length; i++) {
             if (usersOnline[i] === userId) {
             usersOnline.splice(i, 1);
             }
             }

             updateUserList();
             };
             $("#elscore").empty();
             $("#elscore").text(total_score);

             }*/
            // $("#perfil-enemigo").removeClass("turn");
            // $("#perfil").addClass("turn");
            if (game.in_checkmate()) {
                chesspieces_points = 0;
                if (username === serverGame.users.white) {
                    if (myinfo.idpartida !== null && typeof myinfo.idpartida !== "undefined" && myinfo.idpartida !== "") {
                        // debugger;
                        //console.log("Gano blancas");
                        $.get("/Ajedrez/_ActualizarPartida", {
                            Idpartida: myinfo.idpartida, Fen: game.fen(), iduserganador: serverGameState.fullActivegames.uniqueidWhite, isempate: false, isfinal: true, puntosb: chesspieces_points, movimientob: movimientos, movimienton: movimientos - 1, userbonline: true, usernonline: true, estatus: 1
                        }, function (data) {
                            //console.log("actualizo partida en el jaque mate");
                        });
                    }
                } else {
                    if (myinfo.idpartida !== null && typeof myinfo.idpartida !== "undefined" && myinfo.idpartida !== "") {
                        $.get("/Ajedrez/_ActualizarPartida", {
                            Idpartida: myinfo.idpartida, Fen: game.fen(), iduserganador: serverGameState.fullActivegames.uniqueidBlack, isempate: false, isfinal: true, puntosb: chesspieces_pointsblack, movimientob: movimientos, movimienton: movimientos - 1, userbonline: true, usernonline: true, estatus: 1
                        }, function (data) {
                            //console.log("actualizo partida en el jaque mate");
                        });
                    }
                }

                if (turno === "w") {
                    ////console.log("username : " + username + " server user white " + serverGame.users.white);
                    if (username === serverGame.users.white) {
                        getScore();
                        var score_imprimible = getScore()
                        init(2);
                        $("#modal-score").modal('show');
                        setTimeout(function () { $('#modal-score').modal('hide'); }, 4000);
                        $.get("/juego/SubirScoreJuego", {
                            id: "3438cc3a-7356-44e2-b4fa-6074cfe4982c", score: getScore(), descripcion: "Ajedrez(" + score_imprimible
                            + " puntos)"
                        }, function (data) {
                            //alert("Data: " + data);
                            if (data.Status === true) {

                                $.get("/puntoscreditos/agregarCreditos",
                                    { id: "", q: getScore(), d: "Tu puntaje: " + getScore() },
                                    function (data1) {
                                        // alert("Data1: " + data1);
                                    }).fail(function () {
                                    ////console.log("error");
                                });
                            }

                        }).fail(function () {
                            //            //console.log("error");
                        });
                        $('#page-game').hide();
                        $('#page-lobby').show();
                        $('#move-history').empty();
                        $('#turn_number').empty();
                        $('#blancas').empty();
                        $('#negras').empty();
                        $("#avatar2 img").removeClass('turno-img');
                        $("#avatar1 img").removeClass('turno-img');

                    } else {
                        // if (typeof serverGame !== "undefined") {
                        /*socket.emit('resign', { userId: username, gameId: serverGame.id });
                         socket.emit('login', username);*/
                        $('#page-game').hide();
                        $('#page-lobby').show();
                        $('#move-history').empty();
                        $('#turn_number').empty();
                        $('#blancas').empty();
                        $('#negras').empty();
                        $("#avatar2 img").removeClass('turno-img');
                        $("#avatar1 img").removeClass('turno-img');

                        // }
                    }


                    if (username !== serverGame.users.black) {
                        if (username === serverGame.users.black) {
                            getScore();
                            var score_imprimible = getScore()
                            init(2);
                            $("#modal-score").modal('show');
                            setTimeout(function () { $('#modal-score').modal('hide'); }, 4000);
                            $.get("/juego/SubirScoreJuego", {
                                id: "3438cc3a-7356-44e2-b4fa-6074cfe4982c", score: getScore(), descripcion: "Ajedrez(" + score_imprimible
                                + " puntos)"
                            }, function (data) {
                                //alert("Data: " + data);
                                if (data.Status === true) {

                                    $.get("/puntoscreditos/agregarCreditos",
                                        { id: "", q: getScore(), d: "Tu puntaje: " + getScore() },
                                        function (data1) {
                                            // alert("Data1: " + data1);
                                        }).fail(function () {
                                        ////console.log("error");
                                    });
                                }

                            }).fail(function () {
                                //            //console.log("error");
                            });
                            $('#page-game').hide();
                            $('#page-lobby').show();
                            $('#move-history').empty();
                            $('#turn_number').empty();
                            $('#blancas').empty();
                            $('#negras').empty();
                            serverGame.users.white = "";
                            serverGame.users.black = "";


                        } else {
                            //if (typeof serverGame !== "undefined") {
                            /*socket.emit('resign', { userId: username, gameId: serverGame.id });
                             socket.emit('login', username);*/
                            $('#page-game').hide();
                            $('#page-lobby').show();
                            $('#move-history').empty();
                            $('#turn_number').empty();
                            $('#blancas').empty();
                            $('#negras').empty();
                            serverGame.users.white = "";
                            serverGame.users.black = "";
                            // }
                        }

                    } else {
                        // if (typeof serverGame !== "undefined" || msg.user !== "undefined") {
                        /* socket.emit('resign', { userId: username, gameId: serverGame.id });
                         socket.emit('login', username);*/
                        //}

                    }



                    //bootbox.alert(serverGame.users.white + ' ganó la partida');
                    if (serverGame.id !== "undefined") {
                        socket.emit('login', { userId: username, avatar: myinfo.avatar, useruniqueid: useruniqueid });

                        $('#page-game').hide();
                        $('#page-lobby').show();
                    } else {

                        $('#page-game').hide();
                        $('#page-lobby').show();
                    }


                }

                if (game.in_check()) {
                    if (game.in_checkmate) {
                    } else {
                        bootbox.alert('estas en jaque, protege a tu rey');
                    }
                }

                if (game.in_stalemate()) {
                    bootbox.alert('empate');


                }

            } else if (turno === "b") {
                if (game.in_checkmate()) {
                    bootbox.alert("Ganó negras");

                    if (username !== serverGame.users.white) {
                        getScore();
                        var score_imprimible = getScore()
                        init(2);
                        $("#modal-score").modal('show');
                        setTimeout(function () { $('#modal-score').modal('hide'); }, 4000);
                        $.get("/juego/SubirScoreJuego", {
                            id: "3438cc3a-7356-44e2-b4fa-6074cfe4982c", score: getScore(), descripcion: "Ajedrez(" + score_imprimible
                            + " puntos)"
                        }, function (data) {
                            //alert("Data: " + data);
                            if (data.Status === true) {

                                $.get("/puntoscreditos/agregarCreditos",
                                    { id: "", q: getScore(), d: "Tu puntaje: " + getScore() },
                                    function (data1) {
                                        // alert("Data1: " + data1);
                                    }).fail(function () {
                                    ////console.log("error");
                                });
                            }

                        }).fail(function () {
                            //            //console.log("error");
                        });
                    } else {
                        // if (typeof serverGame !== "undefined" || msg !== "undefined") {
                        /* socket.emit('resign', { userId: username, gameId: serverGame.id });
                         socket.emit('login', username);*/
                        //}

                    }

                    getScore();
                }

                if (game.in_check()) {
                    if (game.in_checkmate) {
                    } else {
                        bootbox.alert('estas en jaque, protege a tu rey');
                    }
                }

                if (game.in_stalemate()) {
                    bootbox.alert('empate');


                }
                // $("#perfil-enemigo").adClass("turn");
                //$("#perfil").removeClass("turn");


            }

            if (turno === "b") {
                ////console.log(serverGame.users.white);
                currentturno = serverGame.users.black + "(negras)";

                $(".turn-chess").addClass('rotate');
                $("#avatar2 img").addClass('turno-img');
                $("#avatar1 img").removeClass('turno-img');

            } else if (turno === "w") {
                ////console.log(serverGame.users.black);
                currentturno = serverGame.users.white + "(blancas)";
                $(".turn-chess").removeClass('rotate');

                $("#avatar1 img").addClass('turno-img');
                $("#avatar2 img").removeClass('turno-img');
            }

            if (game.in_check()) {
                if (game.in_checkmate) {
                } else {
                    $("#elscore").empty();
                    $("#elscore").text(total_score);
                }
            }

            if (game.in_stalemate()) {
                bootbox.alert('empate');
                if (typeof myinfo.idpartida !== "undefined" && myinfo.idpartida !== null && myinfo.idpartida !== "") {
                    $.get("/Ajedrez/_ActualizarPartida", {
                        Idpartida: myinfo.idpartida, Fen: game.fen(), isempate: true, isfinal: true, puntosb: chesspieces_points, movimientob: movimientos, movimienton: movimientos - 1, userbonline: true, usernonline: true, estatus: 2
                    }, function (data) {
                        ////console.log("success");
                    });
                }
            }
            // debugger;
            if (game.in_checkmate()) {
                //
            } else {
                if (username === serverGame.users.white) {
                    if (myinfo.idpartida !== null && typeof myinfo.idpartida !== "undefined" && myinfo.idpartida !== "") {
                        $.get("/Ajedrez/_ActualizarPartida", {
                            Idpartida: myinfo.idpartida, Fen: game.fen(), idUserturnosiguiente: serverGameState.fullActivegames.uniqueidBlack, isempate: false, isfinal: false, puntosb: chesspieces_points, movimientob: movimientos, movimienton: movimientos - 1, userbonline: true, usernonline: true, estatus: 0
                        }, function (data) {
                            //console.log("se actualizo la partida");
                        });
                    }
                } else {
                    if (myinfo.idpartida !== null && typeof myinfo.idpartida !== "undefined" && myinfo.idpartida !== "") {
                        $.get("/Ajedrez/_ActualizarPartida", {
                            Idpartida: myinfo.idpartida, Fen: game.fen(), idUserturnosiguiente: serverGameState.fullActivegames.uniqueidBlack, isempate: false, isfinal: false, puntosb: chesspieces_pointsblack, movimientob: movimientos, movimienton: movimientos - 1, userbonline: true, usernonline: true, estatus: 0
                        }, function (data) {
                            //console.log("se actualizo la partida");
                        });
                    }
                }


            } renderMoveHistory(game.history());
        };



        // update the board position after the piece snap
        // for castling, en passant, pawn promotion
        var onSnapEnd = function () {
            board.position(game.fen());

        };

        var onMouseoverSquare = function (square, piece) {
            var moves = game.moves({
                square: square,
                verbose: true
            });

            if (moves.length === 0) return;

            greySquare(square);

            for (var i = 0; i < moves.length; i++) {
                greySquare(moves[i].to);
            }
        };

        var onMouseoutSquare = function (square, piece) {
            removeGreySquares();
        };

        var removeGreySquares = function () {
            $('#board .square-55d63').removeClass('highlight-move');
            $('#board .square-55d63').css('background', '');
        };

        var x = null;
        var comparar = $(".btn-perron.active").attr('id');
        ////console.log("variable que guarda el id del div que seleccione: " + comparar);
        //var compare = $(".img-thumbnail").attr("id");
        function setPieceTheme() {
            // debugger;
            if (comparar === "chess24_piece_theme") {
                x = chess24_piece_theme;
            } else if (comparar === "wikipedia_piece_theme") {
                x = wikipedia_piece_theme;

            } else if (comparar === "dilena_piece_theme") {
                x = dilena_piece_theme;
            } else if (comparar === "mike_piece_theme") {
                x = mike_piece_theme;
            }
            else if (comparar === "mike_nuevo_piece_theme") {
                x = mike_nuevo_piece_theme;

            } else if (comparar === "mike_classic_piece_theme") {
                x = mike_classic_piece_theme;

            }
            else {
                x = wikipedia_piece_theme;
            }

        }

        setPieceTheme();

        var cfg = {
            draggable: true,
            orientation: playerColor,
            pieceTheme: x,
            position: serverGame.board ? serverGame.board : 'start',
            onDragStart: onDragStart,
            onDrop: onDrop,
            onSnapEnd: onSnapEnd
        };

        game = serverGame.board ? new Chess(serverGame.board) : new Chess();
        board = new ChessBoard('game-board', cfg);
        $(window).resize(board.resize);
    };

    $('#close').on('click', function () {
        //alert(msg.user + "te esta retando a una partida");
        // $('#modal-aviso').modal('hide');
    });

};

onlineChess();