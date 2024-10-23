// Inicio de variables
let tarjetasDestapadas = 0;
let tarjetaBloqueada = null;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timerInicial = 30;
let timer = 30;
let tiempoRegresivoId = null;

// Html Document
let mostrarAciertos = document.getElementById('aciertos');
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarTiempo = document.getElementById('t-restante');

let winAudio = new Audio(`./sounds/win.wav`);
let loseAudio =  new Audio(`./sounds/lose.wav`);
let clickAudio =  new Audio(`./sounds/click.wav`);
let rightAudio =  new Audio(`./sounds/right.wav`);
let wrongAudio =  new Audio(`./sounds/wrong.wav`);

// Numeros Aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]; // 
numeros = numeros.sort(()=>{return Math.random()-0.5});


// Funciones 

function contarTiempo(){
   tiempoRegresivoId =  setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo restante: ${timer} segundos`
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            loseAudio.play();
        }
    },1000)

}


function bloquearTarjetas(){
    for(let i = 0; i <= 15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png" alt= "">`;
        tarjetaBloqueada.disabled = true;
    }
}

// Funcion Destapar
function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;
    // Mostrar primer numero
    if(tarjetasDestapadas === 1){
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt= "">`;
        clickAudio.play();
        // Deshabilitar luego del click
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas === 2){
        // Mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt= "">`; 

        // Desabilitar luego del click
        tarjeta2.disabled = true;

        if(primerResultado === segundoResultado){
            // Encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;
            // aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightAudio.play();
           
            if(aciertos === 8){
                winAudio.play();
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 💪`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😎` ;
                mostrarTiempo.innerHTML = `Fantastico!!! Solo demoraste 💪 : ${timerInicial - timer} segundos`;
            }
        }else{
            wrongAudio.play();
            // Mostrar valores y tapar
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);
        }
    }
    //  increment movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
}