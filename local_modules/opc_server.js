
//Autor: Iñigo de la Puente Saizar

//Fecha: 09/09/2021

//Función: Establecer la conexión con el servidor OPC-UA, crear servidor local en el puerto indicado, proporcionar los archivos ubicados 
//en la carpeta public, establecer la conexión socket con el cliente y llamada a las funciones read, write y monitor

//--------------------------------------------------------------------------------------

//Importación de módulos/paquetes que requiere la aplicación

//MÓDULOS EXTERNOS - PRECONSTRUIDOS

const express = require("express");
const app = express();
const http = require('http').Server(app);
const chalk = require("chalk");
const io = require("socket.io")(http);
const dateTime = require("node-datetime");
const fs = require("fs");
const readline = require('readline-sync');
const port = process.env.PORT || 5630;
const {
    AttributeIds,
    OPCUAClient,
    TimestampsToReturn,
    DataType,
} = require("node-opcua");
const {MongoClient} = require('mongodb');


//MÓDULOS LOCALES - PROPIOS DEL PROYECTO

const opcRead = require("./opc_read.js");
const opcWrite = require("./opc_write.js");
const opcMonitor = require("./opc_monitor.js");

//ID de las variables y el nombre para la comunicación con el frontend mediante Socket.IO:

const nodeId1 = "ns=4;s=Connect_Robot1";

//Array de alarmas que se crea en el back y se pasa al front cada vez que se actualice

let alarmas = [];
const numeroAlarmas = 25;
let i = 0;

// Función ASÍNCRONA para la conexión con el servidor OPC-UA y la comunicación con el frontend para la lectura/escritura de variables

async function opc(endpointUrl, nodes) {
    try { 

        //Permitir que el cliente pueda acceder a todo lo que haya en la carpeta public

        app.use(express.static('public2'));

        http.listen(port, () => {
            console.log(`\n Socket.IO server running at http://localhost:${port}/`);
        });
    
        console.log("\n Listening on port " + port);
    
        // CONEXIÓN CON EL SERVIDOR OPC-UA
        
        //Creación de cliente OPC-UA

        const client = OPCUAClient.create({
            endpointMustExist: false
        });
        
        //Creación de archivo .txt donde se almacenan todas las alarmas

        let dt = dateTime.create();
        let formatted = dt.format('Y_m_d_H_M_S');
        let historialAlarmas = fs.createWriteStream(`./historial_alarmas/historial_alarmas_${formatted}.txt`);

        //Reconectando con el servidor OPC-UA en caso de perder la conexión

        client.on("backoff", (retry, delay) => {
            let dt = dateTime.create();
            let formatted = dt.format('Y-m-d H:M:S');
            console.log(formatted + ": Retrying to connect to ", chalk.cyan(endpointUrl), " attempt ", retry +1, '\n');

            if(retry == 0){
                let mensajeCompleto = formatted + ': ERROR: Se ha perdido la conexión con el servidor OPC-UA';

                if(i<numeroAlarmas){
                    alarmas.unshift(mensajeCompleto);
                    historialAlarmas.write(alarmas[0] + '\n');
                    i++;

                }else{
                    alarmas.unshift(mensajeCompleto);
                    historialAlarmas.write(alarmas[0] + '\n');
                    alarmas.pop();
                };

            }else{
                let mensaje = `Reconectando con el servidor OPC-UA. Intento ${retry + 1}`;
                io.sockets.emit("opc", mensaje);
    
                let mensajeCompleto = formatted + ': ' + mensaje;
    
                if(i<numeroAlarmas){
                    alarmas.unshift(mensajeCompleto);
                    historialAlarmas.write(alarmas[0] + '\n');
                    i++;
                }else{
                    alarmas.unshift(mensajeCompleto);
                    historialAlarmas.write(alarmas[0] + '\n');
                    alarmas.pop();
                }
            }

            io.sockets.emit("alarmas", alarmas);
        });

        console.log("\n Connecting to ", chalk.gray(endpointUrl));

        await client.connect(endpointUrl);

        console.log("\n Connected to ", chalk.greenBright(endpointUrl));

        const session = await client.createSession();
        console.log(chalk.yellow("\n Session created \n"));

        const subscription = await session.createSubscription2({
            requestedPublishingInterval: 20,
            requestedMaxKeepAliveCount: 20,
            requestedLifetimeCount: 1000,
            maxNotificationsPerPublish: 1000,
            publishingEnabled: true,
            priority: 10
        });

        subscription.on("keepalive", function () {
            console.log("Subscription alive\n");

        }).on("terminated", function () {
            console.log(" TERMINATED ------------------------------>")
        });

        //CONEXIÓN SOCKET IO: Detectamos si alguien se conecta al servidor y realizamos la primera lectura de las variables

        io.on('connection', function (socket) {

            console.log('New Socket connection. Id: ', socket.id, '\n');

            //PRIMERA LECTURA DE LAS VARIABLES

            opcRead.opcRead(session, socket, nodes);
            
            io.sockets.emit("alarmas", alarmas);

            // ESCRITURA DE VARIABLES

            opcWrite.opcWrite(session, socket, nodes, AttributeIds);

        });

         // MONITORIZACIÓN DE LAS VARIABLES. Pasamos el valor de las variables (nodos) al UI cuando éstas cambien de valor

         const parameters = {
            samplingInterval: 100,
            discardOldest: true,
            queueSize: 100
        };

        for(let i = 0; i < nodes.length; i++){

            if(nodes[i].read){

                const itemToMonitor = {
                    nodeId: nodes[i].nodeId,
                    attributeId: AttributeIds.Value
                };
                
                const monitoredItem = await subscription.monitor(itemToMonitor, parameters, TimestampsToReturn.Both);
    
                opcMonitor.opcMonitor(monitoredItem, io, nodes[i].name, nodes[i].nodeId);
            }
        }

        // Comprobar correcta comunicación con el servidor OPC-UA leyendo cada 20seg una variable cualquiera

        setInterval(() => {
            session.readVariableValue(nodes[0].nodeId, function(err, dataValue) {
                if (dataValue){
                    let dt = dateTime.create();
                    let formatted = dt.format('Y-m-d H:M:S');
                    console.log(`${formatted}: Comunicando con el servidor OPC-UA \n`);
                    io.sockets.emit('opc', formatted);

                    let mensajeCompleto = formatted + ': Comunicando con el servidor OPC-UA con la url ' + endpointUrl;

                    if(i<numeroAlarmas){
                        alarmas.unshift(mensajeCompleto);
                        historialAlarmas.write(alarmas[0] + '\n');
                        i++;
                    }else{
                        alarmas.unshift(mensajeCompleto);
                        historialAlarmas.write(alarmas[0] + '\n');
                        alarmas.pop();
                    }
                    io.sockets.emit("alarmas", alarmas);
                }
            });
        }, 20000);

        // Detect CTRL + C and close

        let running = true;
        process.on("SIGINT", async () => {
            if (!running) {
                return; // avoid calling shutdown twice
            }
            console.log("Shutting down client");
            running = false;

            await subscription.terminate();

            await session.close();
            await client.disconnect();
            console.log("Done");

            console.clear();
            process.exit(0);

        });
  
    }

    catch (err) {
        console.log(chalk.bgRed.white("Error" + err.message));
        console.log(err);
        process.exit(-1);
    }
    
};

async function createListing(clientDB, newListing) {

    const result = await clientDB.connect('LD90').collection('EstadoBateria').insertOne(newListing);

    console.log('New listing');

}

module.exports = {opc};