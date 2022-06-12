var img = document.querySelector('img');
img.onclick = function(){
    var source = img.getAttribute('src');
    if(source == 'imagenes/gato-pasto.jpg'){
        img.setAttribute('src','imagenes/flor.jpg');
    }else{
        img.setAttribute('src','imagenes/gato-pasto.jpg');
    }
}
function estableceNombre(){
    var miNombre = prompt('Bienvenidx, introduce tu nombre');
    localStorage.setItem('nombre', miNombre);
    var titulo = document.querySelector('h1');
    titulo.textContent = "Bienvenidx " + miNombre;
}

// Main
var btn = document.querySelector('button');
btn.onclick = estableceNombre;

if(!localStorage.getItem('nombre')){
    estableceNombre();
}else{
    var titulo = document.querySelector('h1');
    titulo.textContent = "Bienvenidx " + localStorage.getItem('nombre');
}

