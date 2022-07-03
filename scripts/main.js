productos = document.querySelector('.products');
cartContainer = document.querySelector('.cart-container');
cartIcon = document.querySelector('.show-cart');

cartContainer.style.height = window.innerHeight;
cartContainer.addEventListener('click',hideCart);
cartIcon.addEventListener('click',showCart);

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
  if(e.target.classList.contains('close-cart')){
    cartContainer.style.display = "none";
    document.querySelector('body').style.overflow = '';
    document.querySelector('body').style.height = 'auto';
  }
  e.stopPropagation();
}

function showCart(){
  cartContainer.style.display = "flex";
  document.querySelector('body').style.height = window.innerHeight;
  document.querySelector('body').style.overflow = 'hidden';
}