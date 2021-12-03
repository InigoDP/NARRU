
const socket = io();

let dot = document.getElementById("dot");
let map = document.getElementById('map');
let arrow = document.getElementById('arrow');

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