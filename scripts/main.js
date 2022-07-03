productos = document.querySelector('.products');
cartContainer = document.querySelector('.cart-container');

cartContainer.addEventListener('click',hideCart);

loadItems();

async function loadItems(){

  const res = await fetch('api.json');
  const data = await res.json();

  data.forEach(element => {
    let div = document.createElement('div');
    div.className = "item";
    div.innerHTML = `
    <img src="${element.image}">
    <h4>$${element.price}</h4>
    <p>${element.title}</p>
    <div class="botonAgregar greenbtn">
      <h5>Agregar</h5>
    </div>
    `;
    productos.appendChild(div);
  });
}

function hideCart(e){
  if(e.target.classList.contains('closes')){
    cartContainer.style.display = "none";
  }
  e.stopPropagation();
}