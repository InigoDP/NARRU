
/*Una vez activado el modo manual (1), el control se puede realizar tanto con el ratón haciendo click en las flechas del UI, con el teclado o tocando la pantalla en caso de que sea un dispositivo táctil. Herramientas empleadas para cada caso: 

    - RATÓN: mousedown y mouseup
    - PANTALLA TÁCTIL: ontouchstart y ontouchend
    - TECLADO: keydown y keyup

*/

const socket = io();

let activarControl = document.getElementById('activar-control');
let estadoModoManual = document.getElementById('modo-manual-estado');
let buttons = document.querySelector('.buttons-control')
let buttonUp = document.getElementById('button-up');
let buttonDown = document.getElementById('button-down');
let buttonRight = document.getElementById('button-right');
let buttonLeft = document.getElementById('button-left');

let localizacion = document.getElementById('localizacion');
let temperatura = document.getElementById('temperatura');
let posX = document.getElementById('posX');
let posY = document.getElementById('posY');
let heading = document.getElementById('heading');

let touched = false;
let touchedUp = false;
let touchedDown = false;
let touchedRight = false;
let touchedLeft = false;

let pressed = false;
let pressedUp = false;
let pressedDown = false;
let pressedRight = false;
let pressedLeft = false;

socket.emit('activarModoManual',{
    value:false
  });

socket.on('localizacion', function(data){
    localizacion.textContent = `Localización: ${(data.value * 100).toFixed(1)} %`;
});

socket.on('temperatura', function(data){
    temperatura.textContent = `Temperatura: ${data.value} ºC`;
});

socket.on('posX', function(data){
    posX.textContent = `Posición X: ${data.value}`;
});

socket.on('posY', function(data){
    posY.textContent = `Posición Y: ${data.value}`;
});

socket.on('heading', function(data){
    heading.textContent = `Heading: ${data.value}º`;
});


// 1) Activar MODO MANUAL

activarControl.addEventListener('click', () => {
    if(estadoModoManual.textContent != 'CONECTADO'){
        let res = confirm("¿Está seguro de que quiere activar el MODO MANUAL?");
        if(res){
            buttons.style.display = 'inherit';
            activarControl.classList.add('green');
            estadoModoManual.textContent = 'CONECTADO';
            console.log('Control activado');
            socket.emit('activarModoManual',{
                value:true
              });
        }
    }else{
        alert('MODO MANUAL ACTIVADO');
    }
})

//BUTTON UP - FORWARD

buttonUp.addEventListener('mousedown', () => {
    console.log('Going forward');
    socket.emit('mover',{
        value:true
      });
})

buttonUp.addEventListener('mouseup', () => {
    console.log('Stopped');
    socket.emit('mover',{
        value:false
      });
})

const moveUpOn = () =>{
    if(touched == false){
        touched = true;
        touchedUp = true;
        console.log('Going forward');
        socket.emit('mover',{
            value:true
            });
    }
}

const moveUpOff = () =>{
    if(touchedUp == true){
        touched = false;
        touchedUp = false;
        console.log('Stopped');
        socket.emit('mover',{
            value:false
            });
    }
}

//BUTTON DOWN - BACKWARD

buttonDown.addEventListener('mousedown', () => {
    console.log('Going backward');
    socket.emit('forward',{
        value:true
      });
})

buttonDown.addEventListener('mouseup', () => {
    console.log('Stopped');
    socket.emit('forward',{
        value:false
      });
})

const moveDownOn = () =>{
    if(touched == false){
        touched = true;
        touchedDown = true;
        console.log('Going backward');
        socket.emit('forward',{
            value:true
            });
    }
}

const moveDownOff = () =>{
    if(touchedDown == true){
        touched = false;
        touchedDown = false;
        console.log('Stopped');
        socket.emit('forward',{
            value:false
            });
    }
}

//BUTTON RIGHT - RIGHT

buttonRight.addEventListener('mousedown', () => {
    console.log('Going to the right');
    socket.emit('girarDerecha',{
        value:true
      });
})

buttonRight.addEventListener('mouseup', () => {
    console.log('Stopped');
    socket.emit('girarDerecha',{
        value:false
      });
})

const moveRightOn = () =>{
    if(touched == false){
        touched = true;
        touchedRight = true;
        console.log('Going to the right');
        socket.emit('girarDerecha',{
            value:true
          });
    }
}

const moveRightOff = () =>{
    if(touchedRight == true){
        touched = false;
        touchedRight = false;
        console.log('Stopped');
        socket.emit('girarDerecha',{
            value:false
          });
    }
}

//BUTTON LEFT - LEFT

buttonLeft.addEventListener('mousedown', () => {
    console.log('Going to the left');
    socket.emit('girarIzquierda',{
        value:true
      });
})

buttonLeft.addEventListener('mouseup', () => {
    console.log('Stopped');
    socket.emit('girarIzquierda',{
        value:false
      });
})

const moveLeftOn = () =>{
    if(touched == false){
        touched = true;
        touchedLeft = true;
        console.log('Going to the left');
        socket.emit('girarIzquierda',{
            value:true
          });
    }
}

const moveLeftOff = () =>{
    if(touchedLeft == true){
        touched = false;
        touchedLeft = false;
        console.log('Stopped');
        socket.emit('girarIzquierda',{
            value:false
          });
    }
}

//Permitir que con las teclas de flecha del teclado también se pueda controlar

document.addEventListener('keydown', (event) => {
    if(estadoModoManual.textContent == 'CONECTADO'){
        const keyName = event.key;
        if(!pressed){
            if(keyName == 'ArrowUp'){
                pressed = true;
                pressedUp = true;
                console.log('Going forward');
                socket.emit('forward',{
                    value:true
                    });
            }
            if(keyName == 'ArrowDown'){
                pressed = true;
                pressedDown = true;
                console.log('Going backward');
                socket.emit('forward',{
                    value:true
                    });
            }
            if(keyName == 'ArrowRight'){
                pressed = true;
                pressedRight = true;
                console.log('Going to the right');
                socket.emit('forward',{
                    value:true
                    });
            }
            if(keyName == 'ArrowLeft'){
                pressed = true;
                pressedLeft = true;
                console.log('Going to the left');
                socket.emit('forward',{
                    value:true
                    });
            }
        }
    }
});

document.addEventListener('keyup', (event) => {
    if(estadoModoManual.textContent == 'CONECTADO'){
        const keyName = event.key;
        if(keyName == 'ArrowUp' & !pressedDown & !pressedRight & !pressedLeft){
            pressed = false;
            pressedUp = false;
            console.log('Stopped');
            socket.emit('forward',{
                value:false
                });
        }
        if(keyName == 'ArrowDown' & !pressedUp & !pressedRight & !pressedLeft){
            pressed = false;
            pressedDown = false;
            console.log('Stopped');
            socket.emit('forward',{
                value:false
                });
        }
        if(keyName == 'ArrowRight' & !pressedUp & !pressedDown & !pressedLeft){
            pressed = false;
            pressedRight = false;
            console.log('Stopped');
            socket.emit('forward',{
                value:false
                });
        }
        if(keyName == 'ArrowLeft' & !pressedUp & !pressedRight & !pressedDown){
            pressed = false;
            pressedLeft = false;
            console.log('Stopped');
            socket.emit('forward',{
                value:false
                });
        }
    }
});

//VOICE CONTROL

let test1 = document.getElementById('test1');
let conexion = document.getElementById('conexion-html');

if (annyang) {
    console.log('Listening');
  // Let's define a command.
  const commands = {
    'left': () => {
        moveLeftOn();
        test1.textContent = 'Left';
    },
    'right': () => {
        moveRightOn();
        test1.textContent = 'Right';
    },
    'front': () => {
        moveUpOn();
        test1.textContent = 'Forward';
    },
    'back': () => {
        moveDownOn();
        test1.textContent = 'Backward';
    },
    'stop': () => {
        if(touchedLeft) moveLeftOff();
        else if(touchedRight) moveRightOff();
        else if(touchedUp) moveUpOff();
        else if(touchedDown) moveDownOff();
        test1.textContent = 'Stopped';
    },
    'connection': () => {
        conexion.click();
    }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Tell KITT to use annyang
  SpeechKITT.annyang();

  // Define a stylesheet for KITT to use
  SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');

  // Render KITT's interface
  SpeechKITT.vroom();

  // Start listening.
  annyang.start();
}


