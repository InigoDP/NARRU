
//LOCAL MODULE. The opcRead function reads the nodeId value and emits the socket to the client side

const opcRead = (session, socket, nodes) => {

    let interval = 20;

    let incr = 0;

    let readNodes = 0;

    for(let i = 0; i < nodes.length; i++){

        if(nodes[i].read){

            incr++;

            setTimeout(() => {

                session.readVariableValue(nodes[i].nodeId, function(err, dataValue) {

                    if(dataValue){

                        socket.emit(nodes[i].name, {
                            value: dataValue.value.value,
                            browseName: ""
                        });

                        if(dataValue.value.value != null){

                            readNodes = readNodes + 1;

                           console.log(`Nodo ${nodes[i].nodeNumber} leído correctamente: ${dataValue.value.value}\n`);

                        }else{

                            console.log(`Nodo ${nodes[i].nodeNumber} no se ha podido leer. Revise si el nodeId está bien definido \n`);

                        }

                    }else{

                        // console.log('Cannot read the value of nodeId1 \n');

                    }

                });
            

            }, interval * incr);

        }else{

            console.log(`Nodo ${nodes[i].nodeNumber} no se puede leer \n`);
    
        }

    }

}

module.exports = {opcRead};
