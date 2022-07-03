productos = document.querySelector('.products');
cartContainer = document.querySelector('.cart-container');
cartIcon = document.querySelector('.show-cart');
cartItems = document.querySelector('.cart-products');
actualCart = {};

cartContainer.style.height = window.innerHeight;
cartContainer.addEventListener('click',hideCart);
cartIcon.addEventListener('click',showCart);
productos.addEventListener('click',addProduct);

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
    <div class="botonAgregar greenbtn eaddcart" id="${element.id}">
      <h5 class="eaddcart">Agregar</h5>
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

function addProduct(e){
  if(!e.target.classList.contains('eaddcart')){
    console.log(e.target);
    return;
  }
  
  if(e.target.childElementCount > 0){
    item = e.target.parentElement;
    index = e.target.getAttribute('id');
  }else{
    item = e.target.parentElement.parentElement;
    index = e.target.parentElement.getAttribute('id');
  }
  
  const product = {
    id: index,
    title: item.querySelector('p').textContent,
    price: item.querySelector('h4').textContent,
    image: item.querySelector('img').getAttribute('src'),
    amount: 1
  }

  console.log(product);

  if(actualCart.hasOwnProperty(product.id)){
    actualCart[product.id].amount += 1; 
  }else{
    actualCart[product.id] = { ...product};
  }
  drawCart();
}

function drawCart(){
  cartItems.innerHTML = '';
  Object.values(actualCart).forEach(element =>{
    let div = document.createElement('div');
    div.className ="cart-item";
    div.innerHTML = `
    <img src="${element.image}">
    <div class="cart-item-info">
        <h4>${element.title}</h4>
        <p>Unidades:</p>
        <p>${element.amount}</p>
    </div>
    `;
    cartItems.appendChild(div);
  })
  
}