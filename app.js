
//Autor: Iñigo de la Puente Saizar

//Fecha: 09/09/2021

//Función: Lectura del archivo Excel con la información necesaria, obtención de nodes y llamada al archivo opc_server.js

//--------------------------------------------------------------------------------------

//Código BACKEND - app.js es el archivo JS que se debe ejecutar desde el CMD con node app (definido como main en package.json)

//Importación de módulos/paquetes que requiere la aplicación

//MÓDULOS EXTERNOS - PRECONSTRUIDOS

const chalk = require("chalk");
const fs = require('fs');
const readline = require('readline-sync');
const XLSX = require('xlsx');

//MÓDULOS LOCALES - PROPIOS DEL PROYECTO

const opcServer = require("./local_modules/opc_server.js");

//Se limpia la consola al ejecutar el programa

console.clear();

//Título que aparece en la consola. Con chalk se le puede dar color

console.log(chalk.greenBright('-------HMI based on OPC-UA SERVER--------\n'));

//Lectura del documento de EXCEL variablesOPC.xlsx que se encuentra dentro de la carpeta config

let workbook = XLSX.readFile('./config/variablesOPC.xlsx');
let sheet_name_list = workbook.SheetNames;

//Obtención del array de objetos NODES a partir de la información del documento de EXCEL proporcionado

let nodes = [];

sheet_name_list.forEach(function(y) {
    let worksheet = workbook.Sheets[y];
    let headers = {};
    let data = [];
    for(z in worksheet) {
        if(z[0] === '!') continue;
        //parse out the column, row, and value
        let tt = 0;
        for (let i = 0; i < z.length; i++) {
            if (!isNaN(z[i])) {
                tt = i;
                break;
            }
        };
        let col = z.substring(0,tt);
        let row = parseInt(z.substring(tt));
        let value = worksheet[z].v;

        //store header names
        if(row == 1 && value) {
            headers[col] = value;
            continue;
        }

        if(!data[row-2]) data[row-2]={};
        data[row-2][headers[col]] = value;
    }
    //Now no need to drop the data element

    nodes = data;
});

//Obtención de la dirección URL del Servidor OPC-UA (endpointUrl) al que se quiere conectar el usuario
//Se define en la primera columna del EXCEL, en la casilla connectServer

let endpointUrl = nodes[0].connectServer;

let crearHistorial = nodes[0].createHistorial;

console.log(` URL identificado desde variablesOPC.xlsx: ${endpointUrl}\n`);

console.log(` Crear el archivo de texto historial_alarmas: ${crearHistorial}\n`);

//Modificación del array de objetos dependiendo de la URL del servidor, ya que no todas las variables definidas en el excel 
//pertenecen al servidor deseado. Si el atributo serverOPC del nodo no cioncide con el endpointUrl, se borra el elemento del 
//array con el método splice

let nodesInitialLength = nodes.length;

for(let i = 0; i < nodesInitialLength; i++){

    if(nodes[i].serverOPC != endpointUrl){
        nodes.splice(i,1);
        nodesInitialLength--;
        i--;
    }

};

//Imprimimos en pantalla los nodos que se pueden leer y escribir. TESTEO

let readNodes = 0;
let writeNodes = 0;

for(let i = 0; i < nodes.length; i++){

    if(nodes[i].read) readNodes++;
    if(nodes[i].write) writeNodes++;

}

console.log(` Se han identificado ${nodes.length} variables pertenecientes al servidor ${endpointUrl}. ${readNodes} variables se pueden leer y ${writeNodes} se pueden escribir.`)

//Tras obtener la URL y la información de todas las variables que se quieren controlar, se llama a la función opc() del archivo
//opcServer.js previamente importado (módulo local)

opcServer.opc(endpointUrl, nodes);














