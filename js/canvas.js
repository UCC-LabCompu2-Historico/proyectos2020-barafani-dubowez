// Accedemos a componentes html desde el archivo JS
var createMatrixModalBody = document.getElementById("matrix-modal-body");
var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var c = canvas1.getContext("2d");
var c2 = canvas2.getContext("2d");

var rowValue;
var columnValue;
var matrix=[];


// Funcion para obtener las filas y columnas de una matriz

function getMatrixValues(){
    rowValue = document.getElementById("rowTextField").value;
    columnValue = document.getElementById("columnTextField").value;
    createMatrixInputs(rowValue,columnValue);
}

// Funcion para crear los inputs segun la cantidad de filas y columnas de la matriz

function createMatrixInputs(row,column){
    for (var i = 0; i< row; i++){
            var matrixRow = document.createElement('div');
            matrixRow.classList = 'row m-2 justify-content-center'
            matrixRow.setAttribute('id','matrixRow'+(i+1));
            createMatrixModalBody.appendChild(matrixRow);
        for (var j = 0; j<column; j++) {
            var matrixInput = document.createElement('input');
            matrixInput.setAttribute('id','input-'+(i+1)+'_'+(j+1));
            var matrix = document.getElementById('matrixRow'+(i+1));
            matrix.appendChild(matrixInput);
        }
    }
}

// Funcion para obtener los valores de los inputs 
function obtainInputValues(){
    for (var i=0;i<rowValue;i++){
        var row=[];
        for (var j=0;j<columnValue;j++){
            row.push(document.getElementById('input-'+(i+1)+'_'+(j+1)).value);
        }
        matrix.push(row);
    }
    drawMatrix(matrix,c);
    reduceMatrix(matrix);
}

// Funcion para borrar los componentes del modal creado

function deleteMatrixInputs(){
    createMatrixModalBody.innerHTML = "";
}

// Funcion para dibujar la matriz en el canvas

function drawMatrix(matrix,context){
    console.log(matrix.length);
    for (var i=0; i<(rowValue);i++){
        for (var j=0; j<(columnValue);j++){
            console.log(matrix[i][j]);
            context.font = "30px Arial";
            context.fillText(matrix[i][j],80+(j*100), 50+(30*i));
        }
    }
    context.lineWidth = 4
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(0,i*100);
    context.stroke();
    context.beginPath();
    context.moveTo(300,0);
    context.lineTo(300,i*100);
    context.stroke();
}

// Funcion para calcular la matriz reducida por filas

function reduceMatrix(matrix){
    var lead = 0;
    for (var r = 0; r < rowValue; r++) {
        if (columnValue <= lead) {
            return;
        }
        var i = r;
        while (matrix[i][lead] == 0) {
            i++;
            if (rowValue == i) {
                i = r;
                lead++;
                if (columnValue == lead) {
                    return;
                }
            }
        }
 
        var tmp = matrix[i];
        matrix[i] = matrix[r];
        matrix[r] = tmp;
 
        var val = matrix[r][lead];
        for (var j = 0; j < columnValue; j++) {
            matrix[r][j] /= val;
        }
 
        for (var i = 0; i < rowValue; i++) {
            if (i == r) continue;
            val = matrix[i][lead];
            for (var j = 0; j < columnValue; j++) {
                matrix[i][j] -= val * matrix[r][j];
            }
        }
        lead++;
    }
    drawMatrix(matrix,c2);
}