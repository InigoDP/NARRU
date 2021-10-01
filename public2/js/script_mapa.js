
const socket = io();

let dot = document.getElementById("dot");
let map = document.getElementById('map');
let arrow = document.getElementById('arrow');
let botonMM = document.getElementById('botonMM');
let botonSendPoint = document.getElementById('botonSendPoint');
let botonSendGoal = document.getElementById('botonSendGoal');
let botonCig1 = document.getElementById('botonCig1');
let botonBlo2 = document.getElementById('botonBlo2');
let botonLev3 = document.getElementById('botonLev3');
let mapaInfo = document.getElementById('mapaInfo');
let estado = '-';
let sendPointActivado = false;

botonSendPoint.style.display = 'none';
botonSendGoal.style.display = 'none';
botonCig1.style.display = 'none';
botonBlo2.style.display = 'none';
botonLev3.style.display = 'none';

socket.emit('activarModoManual',{
  value:false
});

setTimeout(() => {
  socket.emit('sendPoint',{
    value:false
  });
}, 100);

setTimeout(() => {
  socket.emit('sendGoal',{
    value:false
  });
}, 200);

setTimeout(() => {
  socket.emit('goPoint',{
    value:false
  });
}, 300);

setTimeout(() => {
  socket.emit('goGoal',{
    value:false
  });
}, 400);

botonMM.addEventListener('click', () => {
  socket.emit('activarModoManual',{
    value:true
  });
  mapaInfo.textContent = 'Modo Manual ACTIVADO. Escoja la acción que desea realizar.';
  botonMM.classList.add('green');
  botonSendPoint.style.display = 'initial';
  botonSendGoal.style.display = 'initial';
})

botonSendPoint.addEventListener('click', () => {
  socket.emit('sendPoint',{
    value:true
  });
  socket.emit('sendGoal',{
    value:false
  });
  sendPointActivado = true;
  mapaInfo.textContent = 'SEND TO POINT seleccionado. Haga click en un punto del mapa.';
  botonSendPoint.classList.add('green');
  botonSendGoal.classList.remove('green');
  botonCig1.style.display = 'none';
  botonBlo2.style.display = 'none';
  botonLev3.style.display = 'none';
})

botonSendGoal.addEventListener('click', () => {
  socket.emit('sendGoal',{
    value:true
  });
  socket.emit('sendPoint',{
    value:false
  });
  sendPointActivado = false;
  mapaInfo.textContent = 'SEND TO GOAL seleccionado. Seleccione el destino.';
  botonSendGoal.classList.add('green');
  botonSendPoint.classList.remove('green');
  botonCig1.style.display = 'initial';
  botonBlo2.style.display = 'initial';
  botonLev3.style.display = 'initial';
})

botonCig1.addEventListener('click', () => {
  socket.emit('goalSelected',{
    value:'CIG1'
  });
  socket.emit('goGoal',{
    value:true
  });
})

botonBlo2.addEventListener('click', () => {
  socket.emit('goalSelected',{
    value:'BLO2'
  });
  socket.emit('goGoal',{
    value:true
  });
})

botonLev3.addEventListener('click', () => {
  socket.emit('goalSelected',{
    value:'LEV3'
  });
  socket.emit('goGoal',{
    value:true
  });
})

goal.style.display = 'none';

function showCoords(event) {
   if(sendPointActivado){
    let cX = event.clientX - map.offsetLeft + window.scrollX;
    let sX = event.screenX;
    let cY = event.clientY - map.offsetTop + window.scrollY;
    let sY = event.screenY;
    let coords1 = "client - X: " + cX + ", Y coords: " + cY;
    let coords2 = "screen - X: " + sX + ", Y coords: " + sY;
    // document.getElementById("demo").innerHTML = coords1 + "<br>" + coords2;

    // dot.style.marginLeft = `${cX}px`;
    // dot.style.marginTop = `${cY}px`;

    console.log(cX);
    console.log(cY);

    console.log(goal.style.width.toString())

    goal.style.marginTop = `${cY - 32}px`;
    goal.style.marginLeft = `${cX - (24/2)}px`;

    goal.style.display = 'inherit';

    setTimeout(() => {
      goal.style.display = 'none';
    }, 3000);


    let cX2 = ((event.clientY  -  map.offsetTop + window.scrollY)*17.5)-3900;
    let cY2 = ((event.clientX- map.offsetLeft + window.scrollX)*17.5)-5565;

    console.log(cX2);
    console.log(cY2);

    socket.emit('cX',{
      value:cX2
    });
    socket.emit('cY',{
      value:cY2
    });
    socket.emit('goPoint',{
      value:true
    });
   }
}

  socket.on('posX', (data) => {

      dot.style.marginTop = `${((data.value + 3900)/17.5) -15 }px`;

  })

  socket.on('posY', (data) => {

      dot.style.marginLeft = `${((data.value + 5565)/17.5) -15 }px`;

      // if(data < 330){
      //     dot.style.background = 'red';
      // }else{
      //     dot.style.background = 'rgb(0, 255, 64)';
      // }

  })

  socket.on('heading', (data) => {

    console.log(data.value);
    arrow.style.transform = `rotate(${+135-data.value}deg)`

})

  socket.on('string', function (data) {
    estado = data.value;

      if(estado.includes('GOING')){
        dot.style.backgroundColor = 'rgb(15, 130, 197)';
      }else if(estado.includes('ESTOP')) {
        dot.style.backgroundColor = 'rgb(190, 16, 10)';
      }else if(estado.includes('DOCKED')) {
        dot.style.backgroundColor = 'rgb(223, 209, 20)';
      }else if(estado.includes('STOPPED')) {
        dot.style.backgroundColor = 'orange';
      }else{
      dot.style.backgroundColor = 'rgb(0, 255, 64)';
    }
  });

//   setInterval(function() {
//     dot.style.display = (dot.style.display == 'none' ? '' : 'none');
//  }, 350);