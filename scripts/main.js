const html = document.querySelector('html');
const productos = document.querySelector('.productos');
const btnRegistrar = document.querySelector('#registrar');


btnRegistrar.addEventListener('click',function(){
    var obj = {
        nombre : document.querySelector('#titulo').value,
        precio : document.querySelector('#precio').value,
        imagen : document.querySelector('#url').value
    }
    agregarProducto(obj);
});

function agregarProducto(objeto){
    var contenedor = document.createElement('div');
    contenedor.setAttribute('class','item');
    productos.append(contenedor);

    var img = document.createElement('img');
    img.setAttribute('src',objeto.imagen);
    contenedor.appendChild(img);

    var precio = document.createElement('h4');
    precio.textContent = '$' + objeto.precio;
    contenedor.appendChild(precio);

    var titulo = document.createElement('p');
    titulo.textContent = objeto.nombre;
    contenedor.appendChild(titulo);

    let boton = document.createElement('button');
    boton.textContent = 'Agregar';
    contenedor.appendChild(boton);
}
