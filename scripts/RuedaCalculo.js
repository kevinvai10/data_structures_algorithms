(function () {

    let nivel = "1";
    const divrueda = document.getElementById("ruedaoperaciones");
    let check;
    let innercircle = "";
    let outercircle = "";
    let stringoperacion = "";
    let separaroperacion = "";
    let flagnext = false;

    const nextLevel = () => {
        let number_level = parseInt(nivel);
        number_level += number_level;
        $("#Nivel").empty();
        $("#Nivel").html = "Nivel: ";
        nivel = number_level.toString();
        $("#Nivel").append("Nivel: " + nivel);
        $("#Aciertos").html("Aciertos: ");
        setLevel();
    };

    const checkAnswers = answers => {
        let separaranswer = answers.split(",");
        let contador = 0;
        let next_level = 0;

        for (let i = 0; i < 10; i++) {
            if ($("#preg" + i).val() === separaranswer[i] || $("#resp" + i).val() === separaranswer[i]) {

                if ($("#resp" + i).val() === separaranswer[i]) {
                    $("#resp" + i).addClass("correct");
                    $("#resp" + i).removeClass("incorrect");
                } else {
                    $("#preg" + i).addClass("correct");
                    $("#preg" + i).removeClass("incorrect");
                }
                if (contador === 9) {
                    flagnext = true;
                    Notifier.success("Correcto");
                    next_level++;
                    $("#Aciertos").html("Aciertos: ");
                    $("#Aciertos").append(next_level + "");

                    if (next_level === 2) {
                        next_level = 0;
                        flagnext = true;
                        nextLevel();
                        return;
                    } else {
                        // getLevel();                   
                        return;
                    }
                } contador++;
            }
            else {
                Notifier.warning("Incorrecto");
                $("#resp" + i).addClass("incorrect");
                $("#preg" + i).addClass("incorrect");
                next_level = 0;
                $("#Aciertos").html("Aciertos: " + next_level);
            }
        }
    };

    const getAnswers = () => {
        let answer = "";
        const separaresp = outercircle.split(",");
        const innercirclearr = innercircle.split(",");
        separaroperacion = stringoperacion.split(",");
        check = parseInt(check);
        //debugger;
        for (let i = 0; i < 10; i++) {
            if (i < 9) {
                if (innercirclearr[i] === ";") {
                    if (separaroperacion[i] === "+")
                        answer += parseInt(separaresp[i]) - check + ",";
                    else if (separaroperacion[i] === "-")
                        answer += check - parseInt(separaresp[i]) + ",";
                    else if (separaroperacion[i] === "x")
                        answer += parseInt(separaresp[i]) / check + ",";
                } else {
                    if (separaroperacion[i] === "+")
                        answer += parseInt(innercirclearr[i]) + check + ",";
                    else if (separaroperacion[i] === "-")
                        answer += check - parseInt(innercirclearr[i]) + ",";
                    else if (separaroperacion[i] === "x")
                        answer += parseInt(innercirclearr[i]) * check + ",";
                }
            } else {
                if (innercirclearr[i] === ";") {
                    if (separaroperacion[i] === "+")
                        return answer += parseInt(separaresp[i]) - check + "";
                    if (separaroperacion[i] === "-")
                        return answer += check - parseInt(separaresp[i]) + "";
                    if (separaroperacion[i] === "x")
                        return answer += parseInt(separaresp[i]) / check + "";
                } else {
                    if (separaroperacion[i] === "+")
                        return answer += parseInt(innercirclearr[i]) + check + "";

                    if (separaroperacion[i] === "-")
                        return answer += check - parseInt(innercirclearr[i]) + "";

                    if (separaroperacion[i] === "x")
                        return answer += parseInt(innercirclearr[i]) * check + "";
                }
            }
        }
        //console.log("Respuestas " + answer);
    };

    const operatorGenerator = () => {
        //debugger;
        let level_number = parseInt(nivel);
        if (level_number > 0 && level_number < 5) {
            for (let i = 0; i < 10; i++) {
                //console.log("rand" + rand);
                if (i === 9)
                    return stringoperacion += "+";

                stringoperacion += "+,";
            }
            //console.log("operacion" + stringoperacion);
            return stringoperacion;
        } else if (level_number > 4 && level_number < 8) {
            for (let i = 0; i < 10; i++) {
                let rand = Math.floor((Math.random() * 2) + 1);

                if (rand === 1) {
                    if (i === 9) {
                        stringoperacion += "+";
                    } else {
                        stringoperacion += "+,";
                    }
                } else {
                    if (i === 9)
                        return stringoperacion += "-";

                    stringoperacion += "-,";
                }
            }
            //console.log("operacion" + stringoperacion);
            return stringoperacion;
        } else if (level_number === 8 || level_number === 9) {
            for (let i = 0; i < 10; i++) {
                var rand = Math.floor((Math.random() * 3) + 1);
                //console.log("rand" + rand);
                if (i === 9) {
                    stringoperacion += "x";
                } else {
                    stringoperacion += "x,";
                }
            }
            //console.log("operacion" + stringoperacion);
            return stringoperacion;
        } else if (level_number > 9 && level_number < 11) {
            for (var i = 0; i < 10; i++) {
                var rand = Math.floor((Math.random() * 3) + 1);
                //console.log("rand" + rand);

                if (rand === 1) {
                    if (i === 9) {
                        stringoperacion += "+";
                    } else {
                        stringoperacion += "+,";
                    }
                } else if (rand === 2) {
                    if (i === 9) {
                        stringoperacion += "-";
                    } else {
                        stringoperacion += "-,";
                    }
                } else if (rand === 3) {
                    if (i === 9) {
                        stringoperacion += "x";
                    } else {
                        stringoperacion += "x,";
                    }
                }
            }
            //console.log("operacion" + stringoperacion);
            return stringoperacion;
        }
    };

    const checkNumber = (isouter, num, num2) => {
        let array = []
        let randnumb = 0;

        while (array.length <= 10) {
            if (isouter)
                randnumb = Math.floor((Math.random() * num) + check);
            else
                randnumb = Math.floor((Math.random() * num) + num2);

            if (array.length > 9)
                return array;

            if (array.indexOf(randnumb) === -1)
                array.push(randnumb);
        }
    };

    const getRandomNoDupes = isouter => {
        //let randomarray = [];
        let level_number = parseInt(nivel);

        if (level_number === 1)
            return checkNumber(isouter, 20, 1);
        else if (level_number === 2)
            return checkNumber(isouter, 50, 10);
        else if (level_number === 3)
            return checkNumber(isouter, 100, 20);
        else if (level_number === 4)
            return checkNumber(isouter, 200, 50);
        else if (level_number >= 5)
            return checkNumber(isouter, 200, 20);
        else if (level_number === 8)
            return checkNumber(isouter, 10, 1);
    };

    const fillExerciseArray = (outer, randomsarray, arraysigno, arraypreg) => {
        let checkarray = 0;
        let randnumb = 0;
        let fillerstring = '';

        for (let j = 0; j < 10; j++) {
            if (!outer) { //circulo de adentro
                let rand = Math.floor((Math.random() * 2) + 1);
                //1 = input 2 = numero
                if (rand === 1) {
                    if (j === 9) {
                        fillerstring += ";";
                    } else {
                        fillerstring += ";,";
                    }
                } else if (rand === 2) {

                    if (j === 9) {
                        if (arraysigno[j] === "-") {
                            randnumb = Math.floor((Math.random() * check) + 1);
                            fillerstring += randnumb + "";
                        } else if (arraysigno[j] === "+") {
                            randnumb = randomsarray[checkarray];
                            fillerstring += randnumb + "";
                            checkarray++;
                        } else if (arraysigno[j] === "x") {
                            fillerstring += j + 1 + "";
                            checkarray++;
                        }
                    } else {
                        if (arraysigno[j] === "-") {
                            randnumb = Math.floor((Math.random() * check) + 1);
                            fillerstring += randnumb + ",";
                        } else if (arraysigno[j] === "+") {
                            randnumb = randomsarray[checkarray];
                            fillerstring += randnumb + ",";
                            checkarray++;
                        } else if (arraysigno[j] === "x") {
                            fillerstring += j + 1 + ",";
                            checkarray++;
                        }
                    }
                }
            } else { //circulo de fuera
                //debugger;
                if (arraypreg[j] === ";") {
                    if (j !== 9) {
                        if (arraysigno[j] === "+") {
                            randnumb = randomsarray[checkarray];
                            fillerstring += randnumb + ",";
                            checkarray++;
                        }
                        else if (arraysigno[j] === "-")
                            fillerstring += Math.floor((Math.random() * check) + 1) + ",";
                        else if (arraysigno[j] === "x")
                            fillerstring += j * check + ",";
                    } else {
                        if (arraysigno[j] === "+") {
                            randnumb = randomsarray[checkarray];
                            fillerstring += randnumb + "";
                            checkarray++;
                        }
                        else if (arraysigno[j] === "-")
                            fillerstring += Math.floor((Math.random() * check) + 1) + "";
                        else if (arraysigno[j] === "x")
                            fillerstring += j * check + "";
                    }
                }
                else {
                    if (j !== 9) {
                        if (arraypreg[j] !== ";")
                            fillerstring += ";,";
                    }

                    else {
                        if (arraypreg[j] !== ";")
                            fillerstring += ";";
                    }
                }
            }
        }
        return fillerstring;
    };

    const innerGenerator = () => {
        let outer = false;
        let randomsarray = getRandomNoDupes(false);
        separaroperacion = stringoperacion.split(",");
        let innerstring = fillExerciseArray(outer, randomsarray, separaroperacion, []);
        return innerstring;
    };

    const outerGenerator = innercircle => {
        let outer = true;
        let randomsarrayouter = getRandomNoDupes(outer);
        let outercirclearr = innercircle.split(",");
        separaroperacion = stringoperacion.split(",");
        let outercircle = fillExerciseArray(outer, randomsarrayouter, separaroperacion, outercirclearr);
        return outercircle;
    };

    const getLevelArray = nivel => {
        let array = [];
        if (nivel === "1")
            return array = [2, 4, 5, 10];
        if (nivel === "2")
            return array = [3, 6, 9];
        if (nivel === "3")
            return array = [7, 8, 11];
        if (nivel === "4")
            return array = [15, 20, 25, 30, 35];
        if (nivel === "5")
            return array = [7, 8, 11];
        if (nivel === "6")
            return array = [16, 17, 18, 19];
        if (nivel === "7")
            return array = [21, 22, 24];
        if (nivel === "8")
            return array = [2, 3, 4, 5, 6];
        if (nivel === "9")
            return array = [7, 8, 9, 10];
        if (nivel === "10")
            return array = [33, 34, 36];
    };

    const setLevel = () => {

        let masterarray = [];
        let index = 0;
        let numero_principal = '';
        let outercirclearr = '';
        let innercirclearr = '';

        $("#mysvgk").innerHTML = ""; // remove the div with the same class as the button
        divrueda.innerHTML = "";
        divrueda.innerHTML = "<div id='mysvgk' style='top: 0px; left: 0px;'></div>";
        stringoperacion = "";

        masterarray = getLevelArray(nivel);
        index = Math.floor((Math.random() * masterarray.length));
        check = masterarray[index];
        numero_principal = check + "";
        stringoperacion = operatorGenerator();
        innercircle = innerGenerator();
        outercircle = outerGenerator(innercircle);
        innercirclearr = innercircle.split(",");
        separaroperacion = stringoperacion.split(",");
        outercirclearr = outercircle.split(",");
        console.log('outercircle', outercirclearr)
        fillCircle(numero_principal, separaroperacion, innercirclearr, outercirclearr);
    };

    function fillCircle(numero_principal, separaroperacion, innercirclearr, outercirclearr) {
        //Constantes posiciones de inputs y numeros al rededor de la rueda
        const posout = [[285, 35], [395, 35], [500, 105], [545, 224], [500, 346], [390, 420], [290, 420], [176, 353], [138, 224], [177, 105]]; //inputs
        const posmid = [[300, 120], [365, 120], [425, 161], [445, 228], [425, 305], [375, 341], [305, 341], [233, 305], [223, 228], [234, 157]]; //numeros fijos
        const posin = [[332, 150], [380, 150], [415, 186], [431, 230], [420, 282], [380, 305], [332, 305], [285, 282], [277, 230], [296, 186]]; //simbolo operacion
        const posinputmid10 = [[305, 106], [365, 106], [432, 154], [445, 221], [436, 292], [365, 341], [298, 341], [230, 292], [220, 216], [245, 154]]; //numeros fijos
        const posinputin10 = [[242, 150], [295, 150], [335, 176], [348, 224], [337, 272], [295, 301], [232, 301], [199, 272], [188, 224], [202, 176]];

        for (let i = 0; i < innercirclearr.length; i++) {
            if (outercirclearr[i] === ";")
                divrueda.innerHTML += ('<input  maxlength="3" id="resp' + i + '" class="inputEjercicio inputout respnum" required min="0" required max ="100" onkeypress=" return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57"  type="text"' +
                    'style="position: absolute; left: ' + (posout[i][0] - 115) + 'px;top: ' + posout[i][1] + 'px; font-family: Helvetica">');
            else
                divrueda.innerHTML += ('<div class ="respnum" style="position:absolute; left: ' + (posout[i][0] - 115) + 'px;top: ' + posout[i][1] + 'px;width:59px; color: black; font-size: 37px; font-weight bold; font-family: Helvetica" >' +
                    outercirclearr[i] +
                    '</div>');
        }

        //Numero fijo
        for (let j = 0; j < outercirclearr.length; j++) {
            // debugger;
            if (innercirclearr[j] === ";")
                divrueda.innerHTML += ('<div style="position:absolute; left: ' + (posinputmid10[j][0] - 115) + 'px;top: ' + posinputmid10[j][1] + 'px;width:59px; color: black; font-size: 37px; font-weight bold; font-family: Helvetica" >' +
                    '<input maxlength="3" id="preg' + j + '" class="inputEjercicio inputmiddle respnum" style="font-size: 12px;"required min="0" onkeypress=" return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57"  type="text">' +
                    '</div>');
            else
                divrueda.innerHTML += ('<div class="respnum" style="position:absolute; left: ' + (posmid[j][0] - 115) + 'px;top: ' + posmid[j][1] + 'px;width:59px; color: black; font-size: 27px; font-weight bold; font-family: Helvetica" >' +
                    innercirclearr[j] +
                    '</div>');
        }

        //Simbolo operacion
        for (let k = 0; k < outercirclearr.length; k++) {
            if (separaroperacion[k] === ";")
                divrueda.innerHTML += ('<div style="position:absolute; left: ' + (posinputin10[k][0] - 115) + 'px; top: ' + posinputin10[k][1] + 'px;width:19px; color: black; font-size: 37px; font-weight bold; font-family: Helvetica" >' +
                    '<input maxlength="1" class="inputin" required min="0" type="text">' +
                    '</div>');
            else
                divrueda.innerHTML += ('<div id= "' + k + '" class="respnum" style="position:absolute; left: ' + (posin[k][0] - 115) + 'px;top: ' + posin[k][1] + 'px;width:19px; color: black; font-size: 30px; font-weight bold; font-family: Helvetica">' +
                    separaroperacion[k] +
                    '</div>');
        }

        //numero en el centro de la rueda
        //console.log("length" + numero_principal.length);
        if (numero_principal.length <= 1)
            divrueda.innerHTML += ('<div style="position:absolute; left: 220px; font-size: 40px; top: 205px;width:59px; font-family: Helvetica"><p class=""/><p>' + numero_principal + '</p></div>');
        else
            divrueda.innerHTML += ('<div style="position:absolute; left: 219px; font-size: 40px; top: 205px;width:59px; font-family: Helvetica"><p class="text-center"/><p>' + numero_principal + '</p></div>');

        drawCircle();
    }

    setLevel();

    function drawCircle() {
        data = {
            size: 500,
            sectors: [
                {
                    percentage: 0.10,
                    label: 'a'
                },
                {
                    percentage: 0.10,
                    label: 'b'
                },
                {
                    percentage: 0.10,
                    label: 'c'
                },
                {
                    percentage: 0.10,
                    label: "d"
                },
                {
                    percentage: 0.10,
                    label: "f"
                },
                {
                    percentage: 0.10,
                    label: "h"

                },
                {
                    percentage: 0.10,
                    label: "i"
                },
                {
                    percentage: 0.10,
                    label: "j"
                },
                {
                    percentage: 0.10,
                    label: "k"
                },
                {
                    percentage: 0.10,
                    label: "l"
                }
            ]
        };

        sectors = calculateSectors(data);
        var document1 = document.getElementById("mysvgk");
        var newSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        newSVG.setAttributeNS(null, 'style', "width: " + data.size + "px; height: " + data.size + "px");
        document1.appendChild(newSVG);

        sectors.map(function (sector) {
            var newSector = document.createElementNS("http://www.w3.org/2000/svg", "path");
            newSector.setAttributeNS(null, 'stroke-width', "1px");
            newSector.setAttributeNS(null, 'stroke', "#000000");
            newSector.setAttributeNS(null, 'fill', sector.color);
            newSector.setAttributeNS(null, 'd', 'M' + sector.L + ',' + sector.L + ' L' + sector.L + ',0 A' + sector.L + ',' + sector.L + ' 0 ' + sector.arcSweep + ',1 ' + sector.X + ', ' + sector.Y + ' z');
            newSector.setAttributeNS(null, 'transform', 'rotate(' + sector.R + ', ' + sector.L + ', ' + sector.L + ')');

            newSVG.appendChild(newSector);
        });

        var midCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        midCircle.setAttributeNS(null, 'stroke-width', "1px");
        midCircle.setAttributeNS(null, 'stroke', "#000000");
        midCircle.setAttributeNS(null, 'cx', data.size * 0.5);
        midCircle.setAttributeNS(null, 'cy', data.size * 0.5);
        midCircle.setAttributeNS(null, 'r', data.size * 0.32);
        midCircle.setAttributeNS(null, 'fill', '#ffffff66');

        newSVG.appendChild(midCircle);

        var midCircle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        midCircle2.setAttributeNS(null, 'stroke-width', "1px");
        midCircle2.setAttributeNS(null, 'stroke', "#000000");
        midCircle2.setAttributeNS(null, 'cx', data.size * 0.5);
        midCircle2.setAttributeNS(null, 'cy', data.size * 0.5);
        midCircle2.setAttributeNS(null, 'r', data.size * 0.12);
        midCircle2.setAttributeNS(null, 'fill', '#fff');
        newSVG.appendChild(midCircle2);
    }

    function calculateSectors(data) {
        var sectors = [];
        const colors = [
            "#ec2c39", "#f15b28", "#f78d27", "#ee78aa", "#c21d85", "#8e00ff", "#1873ba", "#25bfd7", "#28b9aa", "#20b476"
        ];

        const l = data.size / 2;
        var a = 0; // Angle
        var aRad = 0; // Angle in Rad
        var z = 0; // Size z
        var x = 0; // Side x
        var y = 0; // Side y
        var X = 50; // SVG X coordinate
        var Y = 0; // SVG Y coordinate
        var R = 0; // Rotation

        data.sectors.map(function (item, key) {
            a = 360 * item.percentage;
            aCalc = (a > 180) ? 360 - a : a;
            aRad = aCalc * Math.PI / 180;
            z = Math.sqrt(2 * l * l - (2 * l * l * Math.cos(aRad)));
            if (aCalc <= 90)
                x = l * Math.sin(aRad);
            else
                x = l * Math.sin((180 - aCalc) * Math.PI / 180);

            y = Math.sqrt(z * z - x * x);
            Y = y;

            if (a <= 180) {
                X = l + x;
                arcSweep = 0;
            }
            else {
                X = l - x;
                arcSweep = 1;
            }

            sectors.push({
                percentage: item.percentage,
                label: item.label,
                color: colors[key],
                arcSweep: arcSweep,
                L: l,
                X: X,
                Y: Y,
                R: R
            });

            R = R + a;
        });
        return sectors
    }

    $("#calif").on("click", () => {
        const answer = getAnswers();
        checkAnswers(answer);
    });

    $("#sig").on("click", () => {
        setLevel();
        flagnext = false;
    });

    $("#generate").on("click", () => {
        setLevel();
    });

    $("#Nivel").append(nivel);
})();
