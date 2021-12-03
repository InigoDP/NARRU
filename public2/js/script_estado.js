
const socket = io();

let estado = document.getElementById('estado');
let robot1 = document.getElementById('robot1');
let localizacion = document.getElementById('localizacion');
let iconoWifi = document.getElementById('icono-wifi');
let botonDock = document.getElementById('botonDock');

//Lectura de la variable 1 (estado de Robot 1)

socket.on('AMR1connected', function (data) {
  console.log('Lectura conexion')
  if(data.value){
    estado.textContent = ' CONECTADO';
    iconoWifi.style.display = 'initial';
    if(localizacion.textContent.includes('Going') && robot1.classList.contains('ldred')){
      robot1.classList.replace('ldred','ldblue');
    }else {
      robot1.classList.replace('ldred','ldgreen');
    }
  }else{
    estado.textContent = ' DESCONECTADO';
    iconoWifi.style.display = 'none';
    robot1.classList.replace('ldgreen','ldred');
    robot1.classList.replace('ldblue','ldred');
  }
});

//Lectura de la variable 2 (batería de Robot 1)

socket.on('bateria', function (data) {
  let bateria = document.getElementById('bateria');
  // let avisoBateria = document.getElementById('aviso-bateria');
  // let iconoAvisoBateria = document.getElementById('icono-aviso-bateria');
  bateria.textContent = `Batería: ${data.value.toFixed(1)} %`;
  // if(data.value < 20){
  //   avisoBateria.textContent = ` Batería baja (${data.value.toFixed(1)}%), envíe el Robot 1 al Dock Station cuanto antes.`;
  //   iconoAvisoBateria.style.display = 'inherit';
  // }else{
  //   avisoBateria.textContent = '';
  //   iconoAvisoBateria.style.display = 'none';
  // }
});

//Lectura de la localizacion

socket.on('string', function (data) {
  localizacion.textContent = data.value;
  console.log(localizacion.textContent);
  console.log(estado.textContent);
  if(localizacion.textContent.includes('GOING') && estado.textContent == ' CONECTADO'){
    console.log('Going')
    robot1.classList.replace('ldgreen','ldblue');
  }else if(estado.textContent == ' CONECTADO'){
    robot1.classList.replace('ldblue','ldgreen');
  }else if(estado.textContent == ' DESCONECTADO'){
    robot1.classList.replace('ldblue','ldred');
  }
  if(localizacion.textContent.includes('Docked')){
    robot1.classList.add('ldyellow');
  }else{
    robot1.classList.remove('ldyellow');
  }
});

robot1.addEventListener('click',()=>{
  socket.emit('message',{
    value:true
  });
})

botonDock.addEventListener('click',()=>{
  console.log('Docking')
  socket.emit('dock',{
    value:true
  });
})







 








