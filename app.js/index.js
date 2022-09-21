// Inicio de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 50;
let tiempoRegresivoId = null;

// Html Document
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');
// Numeros Aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
numeros = numeros.sort(()=>{return Math.random()-0.5});


// Funciones 

function contarTiempo(){
   tiempoRegresivoId =  setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
    },1000)

}


function bloquearTarjetas(){
    for(let i = 0; i <= 15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
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
    // Show the first number
    if(tarjetasDestapadas === 1){
        tarjeta1 = document.getElementById(id)
        primerResultado = numeros[id]
        tarjeta1.innerHTML = primerResultado;



        // Deshabilitar luego del click
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas === 2){
        // Show the second number
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        // Desabilitar luego del click
        tarjeta2.disabled = true;
    }


    //  increment movements

    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;


    if(primerResultado === segundoResultado){
        // Encerar contador tarjetas destapadas
        tarjetasDestapadas = 0;
        // increment aciertos
        aciertos++;
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

        if(aciertos === 8){
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}   Muy Bienn!!!`;
            mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}` 
        }
    }else{
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