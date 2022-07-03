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
  price = item.querySelector('h4').textContent;

  const product = {
    id: index,
    title: item.querySelector('p').textContent,
    price: parseFloat(price.substring(1)),
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
    let sum = element.price * element.amount;
    div.innerHTML = `
    <img src="${element.image}">
    <div class="cart-item-info">
        <h4>${element.title}</h4>
        <p>Precio individual: $${element.price}</p>
        <p>Total: $${sum}</p>
    </div>
    <div class="cart-item-units">
      <div class="cart-item-contador">
        <i class="fa-solid fa-minus"></i>
        <p>${element.amount}</p>
        <i class="fa-solid fa-plus"></i>
      </div>
    </div>
    `;
    cartItems.appendChild(div);
  });
  calcTotal();
}
function calcTotal(){
  let sum = 0;
  Object.values(actualCart).forEach(element =>{
    sum += element.price * element.amount;
  });
  document.querySelector('#total-amount').textContent = "$" + precisionRound(sum,2);
}
function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}