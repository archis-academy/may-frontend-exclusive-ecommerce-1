const CategoryBoxes = document.querySelectorAll(".category-box");
for (let i = 0; i < CategoryBoxes.length; i++) {
  CategoryBoxes[i].addEventListener("click", () => {
    for (let j = 0; j < CategoryBoxes.length; j++) {
      CategoryBoxes[j].style.backgroundColor = "#FFFFFF";
    }
    CategoryBoxes[i].style.backgroundColor = "#FF0000";
  });
}
const productsContainer = document.querySelector("#productsContainer");
const endpoint = "https://fakestoreapi.com/products";
let allProducts = [];
let currentIndex = 0;
const itemsPerPage = 8;
let showingAll = false;

async function getProducts() {
  try {
    const response = await fetch(endpoint);
    const products = await response.json();
    allProducts = products;
    renderProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function renderProducts() {
  const productsToDisplay = showingAll
    ? allProducts
    : allProducts.slice(currentIndex, currentIndex + itemsPerPage);
  const productsHTML = productsToDisplay
    .map((product) => {
      return `
        <div class="product">
          <img src="${product.image}" alt="${product.title}" />
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <p class="price">$${product.price}</p>
          <div class="rating">
            ${getRatingStars(product.rating.rate)}
            <span>(${product.rating.count})</span>
          </div>
          <button class="wishlist-btn" onclick="addToWishList(${
            product.id
          })">Add to Wishlist</button>
          <button class="cart-btn" onclick="addToCart(${
            product.id
          })">Add to Cart</button>
        </div>`;
    })
    .join("");
  productsContainer.innerHTML = productsHTML;

  const viewAllBtn = document.getElementById("viewAllBtn");
  viewAllBtn.textContent = showingAll ? "View Less" : "View All Products";
}

function getRatingStars(rating) {
  const starFull = "&#9733;";
  const starEmpty = "&#9734;";
  let stars = "";
  for (let i = 0; i < 5; i++) {
    stars += i < Math.round(rating) ? starFull : starEmpty;
  }
  return stars;
}

function addToWishList(productId) {
  const wishListProducts =
    JSON.parse(localStorage.getItem("wishListProducts")) || [];
  const isWishListed = wishListProducts.some(
    (product) => product.id === productId
  );

  if (!isWishListed) {
    const productToAdd = allProducts.find(
      (product) => product.id === productId
    );
    localStorage.setItem(
      "wishListProducts",
      JSON.stringify([...wishListProducts, productToAdd])
    );
    showNotification("Product added to Wishlist");
  } else {
    alert("Product is already in your wishlist");
  }
}

function addToCart(productId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const isInCart = cartProducts.some((product) => product.id === productId);

  if (!isInCart) {
    const productToAdd = allProducts.find(
      (product) => product.id === productId
    );
    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...cartProducts, productToAdd])
    );
    showNotification("Product added to Cart");
  } else {
    alert("Product is already in your cart");
  }
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= itemsPerPage;
    renderProducts();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentIndex + itemsPerPage < allProducts.length) {
    currentIndex += itemsPerPage;
    renderProducts();
  }
});

document.getElementById("viewAllBtn").addEventListener("click", () => {
  showingAll = !showingAll;
  renderProducts();
});

getProducts();
