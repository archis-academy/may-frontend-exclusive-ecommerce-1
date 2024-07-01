const products = 
    [{
      "id": 8,
      "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
      "price": 10.99,
      "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
      "category": "jewelery",
      "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
      "rating": {
        "rate": 1.9,
        "count": 100
      },
      "quantity": 1
    }]
  
localStorage.setItem('cartProducts', JSON.stringify(products));
const productsTable = document.querySelector(".products-table");
const emptyContainer = document.querySelector(".empty-container");
const subtotal = document.querySelector(".subtotal span");
const total = document.querySelector(".total span");
const updateBtn = document.querySelector(".update-btn");
function renderCartProducts() {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    console.log(cartProducts, cartProducts.length)
    if (cartProducts.length > 0) {
        productsTable.innerHTML = cartProducts
        .map((product) => {
            return `<tr><td  class="image-td"><img src=${product.image}><p>${product.title
            }</p><img onclick="deleteFromCardProducts(${product.id
            })" class="remove-icon" src="images/remove.png"/></td>
        <td>${product.price} $</td>
        <td><span class="quantity-box">${product.quantity
            }<span ><img class="up-icon" onclick="incrementQuantity(${product.id
            })" src="images/angle-up-solid.svg"> <img class="down-icon" onclick="decrementQuantity(${product.id
            })" src="images/angle-down-solid.svg"> </span></span>
        </td>
        <td>${product.quantity * product.price} $</td></tr>`;
        console.log(product.title);
        })
        .join("");
    } else {
        emptyContainer.innerHTML = `<div class="empty-cart"><h1>Your cart is empty</h1>
        <p>Looks like you have no items in your shopping cart.</p><button class="red-button"><a href="index.html">Shop Now</a></button></div>`;
        console.log("Empty");
    }
}
renderCartProducts();

function incrementQuantity(productId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const updatedProducts = cartProducts.map((product) => {
    if (product.id === productId) {
      return { ...product, quantity: product.quantity + 1 };
    }
    return product;
  });
  localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
  renderCartProducts();
}

function decrementQuantity(productId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

  const updatedProducts = cartProducts
    .map((product) => {
      if (productId === product.id) {
        if (product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        } else {
          deleteFromCart(product.id);
          return null;
        }
      }
      return product;
    })
    .filter(Boolean);

  localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
  renderCartProducts();
}
function calculateTotal() {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const total = cartProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  return total.toFixed(2);
}

subtotal.textContent = `${calculateTotal()} $`;
total.textContent = `${calculateTotal()} $`;
updateBtn.addEventListener("click", () => {
  subtotal.textContent = `${calculateTotal()} $`;
  total.textContent = `${calculateTotal()} $`;

});
function deleteFromCardProducts(deletedProductId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const filteredProducts = cartProducts.filter(
    (product) => product.id !== deletedProductId
  );
  localStorage.setItem("cartProducts", JSON.stringify(filteredProducts));
  renderCartProducts();
 }
 