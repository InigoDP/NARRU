
const socket = io();

let botonConfirmar = document.getElementById('botonConfirmar');
let botonEntrega = document.getElementById('botonEntrega');
let botonCancelar = document.getElementById('botonCancelar');
let botonCocina = document.getElementById('botonCocina');
let botonBarra = document.getElementById('botonBarra');
let botonTerraza = document.getElementById('botonTerraza');
let botonMesa1 = document.getElementById('botonMesa1');
let botonMesa2 = document.getElementById('botonMesa2');
let botonMesa3 = document.getElementById('botonMesa3');
let botonMesa4 = document.getElementById('botonMesa4');
let botonMesa5 = document.getElementById('botonMesa5');
let botonMesa6 = document.getElementById('botonMesa6');
let botonMesa7 = document.getElementById('botonMesa7');
let botonMesa8 = document.getElementById('botonMesa8');
let botonCancelarTrabajo = document.getElementById('botonCancelarTrabajo');
let botonDock = document.getElementById('botonDock');
let dot = document.getElementById("dot");
let map = document.getElementById('map');
let arrow = document.getElementById('arrow');

let seleccionado = 0;

botonConfirmar.style.backgroundColor = '#ddd3d3';
botonCancelar.style.display = 'none';
botonEntrega.style.display = 'none';


botonCocina.addEventListener('click', () => {

    seleccionado = 1;
    botonBarra.style = 'initial';
    botonTerraza.style = 'initial';
    botonDock.style = 'initial';
    botonCocina.style.backgroundColor = 'rgb(20, 112, 199)';
    botonMesa1.style = 'initial';
    botonMesa2.style = 'initial';
    botonMesa3.style = 'initial';
    botonMesa4.style = 'initial';
    botonMesa5.style = 'initial';
    botonMesa6.style = 'initial';
    botonMesa7.style = 'initial';
    botonMesa8.style = 'initial';
    botonConfirmar.style.backgroundColor = 'green';

    socket.emit('goalSelected',{
        value:'COCINA'
    });

    console.log('COCINA');
})

botonBarra.addEventListener('click', () => {

    seleccionado = 1;
    botonCocina.style = 'initial';
    botonTerraza.style = 'initial';
    botonDock.style = 'initial';
    botonBarra.style.backgroundColor = 'rgb(20, 112, 199)';
    botonMesa1.style = 'initial';
    botonMesa2.style = 'initial';
    botonMesa3.style = 'initial';
    botonMesa4.style = 'initial';
    botonMesa5.style = 'initial';
    botonMesa6.style = 'initial';
    botonMesa7.style = 'initial';
    botonMesa8.style = 'initial';
    botonConfirmar.style.backgroundColor = 'green';

    socket.emit('goalSelected',{
        value:'BARRA'
    });

    console.log('BARRA');
})

botonTerraza.addEventListener('click', () => {

    seleccionado = 1;
    botonCocina.style = 'initial';
    botonBarra.style = 'initial';
    botonDock.style = 'initial';
    botonTerraza.style.backgroundColor = 'rgb(20, 112, 199)';
    botonMesa1.style = 'initial';
    botonMesa2.style = 'initial';
    botonMesa3.style = 'initial';
    botonMesa4.style = 'initial';
    botonMesa5.style = 'initial';
    botonMesa6.style = 'initial';
    botonMesa7.style = 'initial';
    botonMesa8.style = 'initial';
    botonConfirmar.style.backgroundColor = 'green';

    socket.emit('goalSelected',{
        value:'TERRAZA'
    });

    console.log('TERRAZA');
})

botonMesa1.addEventListener('click', () => {

    seleccionado = 1;
    botonCocina.style = 'initial';
    botonTerraza.style = 'initial';
    botonDock.style = 'initial';
    botonMesa1.style.backgroundColor = 'rgb(20, 112, 199)';
    botonBarra.style = 'initial';
    botonMesa2.style = 'initial';
    botonMesa3.style = 'initial';
    botonMesa4.style = 'initial';
    botonMesa5.style = 'initial';
    botonMesa6.style = 'initial';
    botonMesa7.style = 'initial';
    botonMesa8.style = 'initial';
    botonConfirmar.style.backgroundColor = 'green';

    socket.emit('goalSelected',{
        value:'MESA1'
    });

    console.log('MESA1');
})

botonMesa2.addEventListener('click', () => {

    seleccionado = 1;
    botonCocina.style = 'initial';
    botonTerraza.style = 'initial';
    botonDock.style = 'initial';
    botonMesa2.style.backgroundColor = 'rgb(20, 112, 199)';
    botonMesa1.style = 'initial';
    botonBarra.style = 'initial';
    botonMesa3.style = 'initial';
    botonMesa4.style = 'initial';
    botonMesa5.style = 'initial';
    botonMesa6.style = 'initial';
    botonMesa7.style = 'initial';
    botonMesa8.style = 'initial';
    botonConfirmar.style.backgroundColor = 'green';

    socket.emit('goalSelected',{
        value:'MESA2'
    });

    console.log('MESA2');
})

botonMesa3.addEventListener('click', () => {

    seleccionado = 1;
    botonCocina.style = 'initial';
    botonTerraza.style = 'initial';
    botonDock.style = 'initial';
    botonMesa3.style.backgroundColor = 'rgb(20, 112, 199)';
    botonMesa1.style = 'initial';
    botonMesa2.style = 'initial';
    botonBarra.style = 'initial';
    botonMesa4.style = 'initial';
    botonMesa5.style = 'initial';
    botonMesa6.style = 'initial';
    botonMesa7.style = 'initial';
    botonMesa8.style = 'initial';
    botonConfirmar.style.backgroundColor = 'green';
    socket.emit('goalSelected',{
        value:'MESA3'
    });

    console.log('MESA3');
})

botonMesa4.addEventListener('click', () => {

    seleccionado = 1;
    botonCocina.style = 'initial';
    botonTerraza.style = 'initial';
    botonDock.style = 'initial';
    botonMesa4.style.backgroundColor = 'rgb(20, 112, 199)';
    botonMesa1.style = 'initial';
    botonMesa2.style = 'initial';
    botonMesa3.style = 'initial';
    botonBarra.style = 'initial';
    botonMesa5.style = 'initial';
    botonMesa6.style = 'initial';
    botonMesa7.style = 'initial';
    botonMesa8.style = 'initial';
    botonConfirmar.style.backgroundColor = 'green';

    socket.emit('goalSelected',{
        value:'MESA4'
    });

    console.log('MESA4');
})

botonMesa5.addEventListener('click', () => {

    seleccionado = 1;
    botonCocina.style = 'initial';
    botonTerraza.style = 'initial';
    botonDock.style = 'initial';
    botonMesa5.style.backgroundColor = 'rgb(20, 112, 199)';
    botonMesa1.style = 'initial';
    botonMesa2.style = 'initial';
    botonMesa3.style = 'initial';
    botonMesa4.style = 'initial';
    botonBarra.style = 'initial';
    botonMesa6.style = 'initial';
    botonMesa7.style = 'initial';
    botonMesa8.style = 'initial';
    botonConfirmar.style.backgroundColor = 'green';

    socket.emit('goalSelected',{
        value:'MESA5'
    });

    console.log('MESA5');
})

botonMesa6.addEventListener('click', () => {

    seleccionado = 1;
    botonCocina.style = 'initial';
    botonTerraza.style = 'initial';
    botonDock.style = 'initial';
    botonMesa6.style.backgroundColor = 'rgb(20, 112, 199)';
    botonMesa1.style = 'initial';
    botonMesa2.style = 'initial';
    botonMesa3.style = 'initial';
    botonMesa4.style = 'initial';
    botonMesa5.style = 'initial';
    botonBarra.style = 'initial';
    botonMesa7.style = 'initial';
    botonMesa8.style = 'initial';
    botonConfirmar.style.backgroundColor = 'green';

    socket.emit('goalSelected',{
        value:'MESA6'
    });

    console.log('MESA6');
})

botonMesa7.addEventListener('click', () => {

    seleccionado = 1;
    botonCocina.style = 'initial';
    botonTerraza.style = 'initial';
    botonDock.style = 'initial';
    botonMesa7.style.backgroundColor = 'rgb(20, 112, 199)';
    botonMesa1.style = 'initial';
    botonMesa2.style = 'initial';
    botonMesa3.style = 'initial';
    botonMesa4.style = 'initial';
    botonMesa5.style = 'initial';
    botonMesa6.style = 'initial';
    botonBarra.style = 'initial';
    botonMesa8.style = 'initial';
    botonConfirmar.style.backgroundColor = 'green';

    socket.emit('goalSelected',{
        value:'MESA7'
    });

    console.log('MESA7');
})

botonMesa8.addEventListener('click', () => {

    seleccionado = 1;
    botonCocina.style = 'initial';
    botonTerraza.style = 'initial';
    botonDock.style = 'initial';
    botonMesa8.style.backgroundColor = 'rgb(20, 112, 199)';
    botonMesa1.style = 'initial';
    botonMesa2.style = 'initial';
    botonMesa3.style = 'initial';
    botonMesa4.style = 'initial';
    botonMesa5.style = 'initial';
    botonMesa6.style = 'initial';
    botonMesa7.style = 'initial';
    botonBarra.style = 'initial';
    botonConfirmar.style.backgroundColor = 'green';

    socket.emit('goalSelected',{
        value:'MESA8'
    });

    console.log('MESA8');
})

botonDock.addEventListener('click', () => {

    seleccionado = 2;
    botonCocina.style = 'initial';
    botonTerraza.style = 'initial';
    botonDock.style.backgroundColor = 'rgb(20, 112, 199)';
    botonMesa1.style = 'initial';
    botonMesa2.style = 'initial';
    botonMesa3.style = 'initial';
    botonMesa4.style = 'initial';
    botonMesa5.style = 'initial';
    botonMesa6.style = 'initial';
    botonMesa7.style = 'initial';
    botonMesa8.style = 'initial';
    botonBarra.style = 'initial';
    botonConfirmar.style.backgroundColor = 'green';

    socket.emit('goalSelected',{
        value:'MESA8'
    });

    console.log('MESA8');
})

botonConfirmar.addEventListener('click', () => {
    console.log('Entra')
    botonCocina.style = 'initial';
    botonBarra.style = 'initial';
    botonTerraza.style = 'initial';
    botonMesa1.style = 'initial';
    botonMesa2.style = 'initial';
    botonMesa3.style = 'initial';
    botonMesa4.style = 'initial';
    botonMesa5.style = 'initial';
    botonMesa6.style = 'initial';
    botonMesa7.style = 'initial';
    botonMesa8.style = 'initial';
    botonDock.style = 'initial';

    if(seleccionado == 1){
        socket.emit('goGoal',{
            value:true
        });
        botonConfirmar.style.backgroundColor = '#ddd3d3';
        botonCancelarTrabajo.style.display = 'initial';
    }else if(seleccionado == 2){
        socket.emit('dock',{
            value:true
        });
        botonConfirmar.style.backgroundColor = '#ddd3d3';
        botonCancelarTrabajo.style.display = 'initial';
    }else{
        console.log('No se ha seleccionado el destino')
        botonConfirmar.style.backgroundColor = '#ddd3d3';
    }

    console.log('CONFIRMAR');
})

botonCancelar.addEventListener('click', () => {
    botonCocina.style.display = 'initial';
    botonBarra.style.display = 'initial';
    botonTerraza.style.display = 'initial';
    botonMesa1.style.display = 'initial';
    botonMesa2.style.display = 'initial';
    botonMesa3.style.display = 'initial';
    botonMesa4.style.display = 'initial';
    botonMesa5.style.display = 'initial';
    botonMesa6.style.display = 'initial';
    botonMesa7.style.display = 'initial';
    botonMesa8.style.display = 'initial';
    botonConfirmar.style.display = 'none';
    botonCancelar.style.display = 'none';

    console.log('CANCELAR');
})

socket.on('posX', (data) => {

    dot.style.marginTop = `${((data.value + 3900)/30) - 15 }px`;

})

socket.on('posY', (data) => {

    dot.style.marginLeft = `${((data.value + 5505)/28) - 15 }px`;

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

let destino = document.getElementById('destino');
let string1 = '-';

socket.on('string', function (data) {
    string1 = data.value;
    console.log(string1)
    console.log(data.value);
      if(string1.includes('GOING')){
          console.log('Sí');
          let length = string1.length;
          if(length < 30){
            destino.textContent = `Destino: ${string1.substring(9, length)}`;
          }
      }else{
          destino.textContent = '-';
      }
      console.log('No');
      if(string1 == 'PAUSING'){
        destino.textContent = 'El AMR ha llegado al destino';
        console.log('LLEGA');
        botonEntrega.style.display = 'initial';
        botonCancelarTrabajo.style.display = 'none'; 
      }else{
            botonEntrega.style.display = 'none'; 
        }
    //     console.log('a');
    //     botonCocina.style.display = 'none';
    //     botonBarra.style.display = 'none';
    //     botonTerraza.style.display = 'none';
    //     botonMesa1.style.display = 'none';
    //     botonMesa2.style.display = 'none';
    //     botonMesa3.style.display = 'none';
    //     botonMesa4.style.display = 'none';
    //     botonMesa5.style.display = 'none';
    //     botonMesa6.style.display = 'none';
    //     botonMesa7.style.display = 'none';
    //     botonMesa8.style.display = 'none';
    //     }else if(string1.includes('GOING')){
    //         botonCocina.style.display = 'none';
    //         botonBarra.style.display = 'none';
    //         botonTerraza.style.display = 'none';
    //         botonMesa1.style.display = 'none';
    //         botonMesa2.style.display = 'none';
    //         botonMesa3.style.display = 'none';
    //         botonMesa4.style.display = 'none';
    //         botonMesa5.style.display = 'none';
    //         botonMesa6.style.display = 'none';
    //         botonMesa7.style.display = 'none';
    //         botonMesa8.style.display = 'none';
    //     }
    //     else if(botonCancelar.style.display == 'none'){
    //     console.log('b');
    //     botonCocina.style.display = 'initial';
    //     botonBarra.style.display = 'initial';
    //     botonTerraza.style.display = 'initial';
    //     botonMesa1.style.display = 'initial';
    //     botonMesa2.style.display = 'initial';
    //     botonMesa3.style.display = 'initial';
    //     botonMesa4.style.display = 'initial';
    //     botonMesa5.style.display = 'initial';
    //     botonMesa6.style.display = 'initial';
    //     botonMesa7.style.display = 'initial';
    //     botonMesa8.style.display = 'initial';
        
     
  });

  socket.on('busy', function(data){
      console.log(data.value);
      if(data.value){
        openModal(modal);
      }else{
        closeModal(modal);
      }

    //   if(data.value || string1=='PAUSING'){
    //     botonCocina.style.display = 'none';
    //     botonBarra.style.display = 'none';
    //     botonTerraza.style.display = 'none';
    //     botonMesa1.style.display = 'none';
    //     botonMesa2.style.display = 'none';
    //     botonMesa3.style.display = 'none';
    //     botonMesa4.style.display = 'none';
    //     botonMesa5.style.display = 'none';
    //     botonMesa6.style.display = 'none';
    //     botonMesa7.style.display = 'none';
    //     botonMesa8.style.display = 'none';
    //   }
  } )

  botonEntrega.addEventListener('click', () => {

    socket.emit('pausing',{
        value:true
    });

    closeModal(modal);

    botonBarra.style = 'initial';
    botonTerraza.style = 'initial';
    botonCocina.style = 'initial';
    botonMesa1.style = 'initial';
    botonMesa2.style = 'initial';
    botonMesa3.style = 'initial';
    botonMesa4.style = 'initial';
    botonMesa5.style = 'initial';
    botonMesa6.style = 'initial';
    botonMesa7.style = 'initial';
    botonMesa8.style = 'initial';
    botonConfirmar.style = 'initial';
    botonConfirmar.style.backgroundColor = '#ddd3d3';

})

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

// openModalButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const modal = document.querySelector(button.dataset.modalTarget)
//     openModal(modal)
//   })
// })

// overlay.addEventListener('click', () => {
//   const modals = document.querySelectorAll('.modal.active')
//   modals.forEach(modal => {
//     closeModal(modal)
//   })
// })

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

botonCancelarTrabajo.addEventListener('click', () => {

    socket.emit('cancel',{
        value:true
    });


})