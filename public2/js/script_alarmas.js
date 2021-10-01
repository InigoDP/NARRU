const socket = io();

//Lectura del array de ALARMAS creado en el backend

const alarmas = document.getElementById('listaAlarmas');
socket.on('alarmas',(data)=>{
    console.log(data);
    let i;
    let length = alarmas.childNodes.length;

    // Borramos contenido del listado actual del DOM

    for(i = 0; i<length; i++){
        alarmas.removeChild(alarmas.firstChild);
    };

    //Introducimos el nuevo listado

    for(const alarm of data){
        let alarma = document.createElement('li');
        alarma.textContent = alarm;

        if(alarm.includes('ERROR')){
            alarma.style.color = 'red';
        }else if(alarm.includes('Comunicando')){
            alarma.style.color = 'green';
        }else if(alarm.includes('Reconectando')){
            alarma.style.color = 'orange';
        };

        listaAlarmas.appendChild(alarma);
    };
});
