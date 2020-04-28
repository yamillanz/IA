function aToroideF(valor) {
    if (valor < 0) { return fTablero - 1 }
    if (valor >= fTablero) { return 0 }
    return valor;
}

function aToroideC(valor) {
    if (valor < 0) { return cTablero - 1 }
    if (valor >= cTablero) {return 0}
    return valor;
}


function render() {
    //
    //table.setAttribute("id", "tvida");
    let i, j = 0;
    //let newMatrix = matrixvida.filter(() => true);
    let newMatrix = matrixvida.map(function (arr) {
        return arr.slice();
    });
    //let newMatrix = [...matrixvida];
    //console.log(newMatrix);
    for (i = 0; i < fTablero; i++) {
        var tr = document.createElement('tr');
        for (j = 0; j < cTablero; j++) {
            let td = document.createElement('td');
            td.style.backgroundColor = matrixvida[i][j] == 0 ? "black" : "white";


            td.setAttribute("id", `${i}-${j}`);
            td.setAttribute("f", `${i}`);
            td.setAttribute("c", `${j}`);
            td.addEventListener("click", function (event) {
                let f = event.target.getAttribute("f"), c = event.target.getAttribute("c")
                
                matrixvida[f][c] = matrixvida[f][c] == 0 ? 1 : 0;
               /*  var tdc = document.getElementById(event.target.id);
                tdc.style.backgroundColor = matrixvida[f][c] == 0 ? "black" : "white"; */
                event.target.style.backgroundColor = matrixvida[f][c] == 0 ? "black" : "white";

            })
            tr.appendChild(td);

            let sumEstado = matrixvida[aToroideF((i - 1))][aToroideC((j - 1))] +
                matrixvida[aToroideF((i - 1))][aToroideC((j))] +
                matrixvida[aToroideF((i - 1))][aToroideC((j + 1))] +
                matrixvida[aToroideF(i)][aToroideC((j - 1))] +
                matrixvida[aToroideF(i)][aToroideC((j + 1))] +
                matrixvida[aToroideF((i + 1))][aToroideC((j - 1))] +
                matrixvida[aToroideF((i + 1))][aToroideC(j)] +
                matrixvida[aToroideF((i + 1))][aToroideC((j + 1))];


            if (matrixvida[i][j] == 0 && sumEstado == 3) {
                newMatrix[i][j] = 1;
            }

            if (matrixvida[i][j] == 1 && (sumEstado < 2 || sumEstado > 3)) {
                newMatrix[i][j] = 0;
            }
        }
        table.appendChild(tr);
    }
    matrixvida = newMatrix.map(function (arr) {
        return arr.slice();
    });
    // document.body.removeChild(table);
    //document.body.appendChild(table);

}

function clear() {
    //var tabla = document.getElementById("tvida");
    //document.body.removeChild(tabla);

    var tableRows = table.getElementsByTagName('tr');
    var rowCount = tableRows.length;

    for (var x = rowCount - 1; x >= 0; x--) {
        table.removeChild(tableRows[x]);
    }
}

function mainLoop() {
    return setInterval(() => {
        clear();
        render();
    }, 150);
}

function next() {
    clear();
    render();
}

function begin() {
    for (var i = 0; i < fTablero; i++) {
        for (let j = 0; j < cTablero; j++) {
            matrixvida[i][j] = 0;
        }
    }
    clear();
    render();
}

//MAin
const fTablero = 30, cTablero = 50;
var matrixvida = new Array(fTablero);
for (let i = 0; i < fTablero; i++) {
    matrixvida[i] = new Array(cTablero);
}

const wtail = 10, htail = 10;
var container = document.getElementById("main")
var table = document.createElement("table");
table.setAttribute("id", "tvida");
container.appendChild(table);
var boton = document.getElementById("play");
boton.addEventListener("click", async (event) => {
    if (event.target.innerText == "Stop") {
        clearInterval(Frames);
    } else {
        Frames = mainLoop();
    }

    event.target.innerText = event.target.innerText == "Play" ? "Stop" : "Play";

})

begin();