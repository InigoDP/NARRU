
const socket = io();

const container = document.getElementById('container');
const buttons = document.querySelectorAll('.boton')

botonConfirmar.style.backgroundColor = '#ddd3d3';
botonEntrega.style.display = 'none';

let seleccionado = 0;

//Escuchamos evento click en algún botón dentro del div container. Identificamos el botón y mostramos el botón de confirmar.

container.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton || event.target.id == 'botonConfirmar') {
      return;
    }else{
        seleccionado = 1;
        for(let i = 0; i < buttons.length; i++){
            if(event.target.id == buttons[i].id){
                let goalSelected = buttons[i].textContent.replace(/ /g, "");
                console.log(goalSelected);
                socket.emit('goalSelected',{
                    value:goalSelected
                });
                buttons[i].style.backgroundColor = 'rgb(20, 112, 199)';
            }else{
                buttons[i].style = 'initial';
            }
        }
        botonConfirmar.style.backgroundColor = 'green';
    }
})

//Escuchamos evento click del botón confirmar. Desaparece el botón confirmar y aparece el de cancelar dentro del modal.

botonConfirmar.addEventListener('click', () => {
    for(let i = 0; i < buttons.length; i++){
        buttons[i].style = 'initial';
    }
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

botonCancelarTrabajo.addEventListener('click', () => {
    socket.emit('cancel',{
        value:true
    });
})

//En caso de que el AMR se encuentre busy (en ruta), aparece el modal

socket.on('busy', function(data){
    console.log(data.value);
    if(data.value){
    openModal(modal);
    }else{
    closeModal(modal);
    }
})

//Lectura del estado del AMR para imprimir el destino y mostrar/ocultar los botones de cancelar trabajo y confirmar entrega

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

      //Si el AMR se encuentra en Pausing, aparece el botón de confirmar entrega
      
      if(string1 == 'PAUSING'){
        destino.textContent = 'El AMR ha llegado al destino';
        console.log('LLEGA');
        botonEntrega.style.display = 'initial';
        botonCancelarTrabajo.style.display = 'none'; 
      }else{
            botonEntrega.style.display = 'none'; 
        }
  });

//Al confirmar la entrega, el AMR sale del pausing y se cierra el modal

botonEntrega.addEventListener('click', () => {
    socket.emit('pausing',{
        value:true
    });
    closeModal(modal);
})

//Modal

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

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

