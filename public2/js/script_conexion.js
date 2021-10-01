 
 const socket = io();
 
 //Escritura de la variable 1 (estado de Robot 1)

 let boton1 = document.getElementById('boton1');
 let boton2 = document.getElementById('boton2');

 boton1.addEventListener('click',()=>{
   socket.emit('message',{
     value:true
   });
 })

//Lectura de la variable 1 (estado de Robot 1)

socket.on('message',(data)=>{
    if(data.value){
        boton1.classList.add('green');
    }else{
        boton1.classList.remove('green');
    }
})

//Lectura de la conexion con el servidor OPC-UA

// let opc = document.getElementById('opc');
// socket.on('opc',(data)=>{
//     opc.innerText = data;
// })

//VOICE CONTROL

// let control = document.getElementById('control-html');

// if (annyang) {
//     console.log('Listening');
//   // Let's define a command.
//   const commands = {
//     'control': () => {
//         control.click();
//     },
//     'connect one': () => {
//       boton1.click();
//     },
//     'connect two': () => {
//       boton2.click();
//     }
//   };

//   // Add our commands to annyang
//   annyang.addCommands(commands);

//   // Tell KITT to use annyang
//   SpeechKITT.annyang();

//   // Define a stylesheet for KITT to use
//   SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');

//   // Render KITT's interface
//   SpeechKITT.vroom();

//   // Start listening.
//   annyang.start();
// }