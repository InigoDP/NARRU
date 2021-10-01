
//LOCAL MODULE. The opcMonitor function reads the nodeId value when it's changed

const {
    AttributeIds,
    OPCUAClient,
    TimestampsToReturn,
    DataType,
} = require("node-opcua");
const dateTime = require("node-datetime");
const fs = require("fs");

let dt = dateTime.create();
let formatted = dt.format('Y_m_d_H_M_S');
let bateriaSOC = fs.createWriteStream(`./bateria_SOC/bateria_SOC_${formatted}.txt`);

const opcMonitor = ((monitoredItem, io, name, nodeId) => {

        monitoredItem.on("changed", (dataValue) => {

                if(name == 'bateria'){
                    writeSOC(dataValue.value.value);
                }
                io.sockets.emit(name, {
                    value: dataValue.value.value,
                    timestamp: dataValue.serverTimestamp,
                    nodeId: nodeId,
                    browseName: ''
                });
            

        });

});


let dataNew = 0;
const writeSOC = (data) => {

    if(dataNew != data){
        dataNew = data;
        let dt = dateTime.create();
        let formatted = dt.format('Y-m-d H:M:S');
        bateriaSOC.write(formatted + ': ' + data + '\n');
    }

};

module.exports = {opcMonitor};