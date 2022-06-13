var intentos = 0;
var resetButton;
var btnEnviar = document.querySelector('#enviar');
var elegido = 50;
var txtIntentos = document.querySelector('#intentos');
var txtResultado = document.querySelector('#resultado');
btnEnviar.onclick = function(){
    if(intentos == 0){
        iniciarJuego();
    }
    nuevoIntento();
}
function iniciarJuego(){
    elegido = Math.floor(Math.random() *100) + 1;
    txtIntentos.textContent = "Intentos anteriores: ";
    txtResultado.textContent = "";
    btnEnviar.disabled = false;
    document.querySelector('input').disabled = false;
    
    if(resetButton != null){
        resetButton.parentNode.removeChild(resetButton);
    }
}
function nuevoIntento(){
    txtResultado.textContent = "";
    var actual = document.querySelector('input');
    txtIntentos.textContent += actual.value + " ";
    if(actual.value == elegido){
        txtResultado.textContent = "Felicidades, ganaste";
        txtResultado.style.backgroundColor = 'green';
        txtResultado.style.color = 'white';
        gameOver();
    }else if(intentos >= 10){
        txtResultado.textContent = "Te quedaste sin intentos";
        txtResultado.style.backgroundColor = 'red';
        txtResultado.style.color = 'white';
        gameOver();
    }else{
        txtResultado.style.backgroundColor = 'red';
        txtResultado.style.color = 'white';
        txtResultado.textContent = "Incorrecto: ";
        if(actual.value > elegido){
            txtResultado.textContent += "Demasiado grande";
        }else{
            txtResultado.textContent += "Demasiado pequeño";
        }
    }
    intentos++;
    actual.value = "";
}
function gameOver(){
    intentos = 0;
    btnEnviar.disabled = true;
    document.querySelector('input').disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Iniciar nuevo juego';
    document.querySelector('.cuerpo').append(resetButton);
    resetButton.addEventListener('click', iniciarJuego);
}


