
//LOCAL MODULE. The opcWrite function writes the nodeId

const opcWrite = (session, socket, nodes, AttributeIds) => {

    for(let i = 0; i < nodes.length; i++){

        if(nodes[i].write){

            socket.on(nodes[i].name, (data) => {

                // console.log('Socket recibido para la escritura de variable')

                let nodesToWrite = [
                    {
                    nodeId: nodes[i].nodeId,
                    attributeId: AttributeIds.Value,
                    value: {
                        value: {
                        dataType: nodes[i].dataType,
                        value: data.value
                        }
                    }
                    }
                ];
    
                session.write(nodesToWrite);
    
            });

        }

    }

}

module.exports = {opcWrite};