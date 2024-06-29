const CategoryBoxes = document.querySelectorAll(".category-box");
for (let i = 0; i < CategoryBoxes.length; i++) {
  CategoryBoxes[i].addEventListener("click", () => {
    for (let j = 0; j < CategoryBoxes.length; j++) {
      CategoryBoxes[j].style.backgroundColor = "#FFFFFF";
    }
    CategoryBoxes[i].style.backgroundColor = "#FF0000";
  });
}

//Timer Start
const countdownDate = new Date().getTime() + (4 * 24 * 60 * 60 * 1000);

const remainingDay = document.getElementById("remainingDay");
const remaininHours = document.getElementById("remaininHours");
const remaininMunites = document.getElementById("remaininMinutes");
const remaininSeconds = document.getElementById("remaininSeconds");
updateCountDay();
updateCountHours();
updateCountMinute();
updateCountSecond();

setInterval(updateCountDay, 1000);
setInterval(updateCountHours, 1000);
setInterval(updateCountMinute, 1000);
setInterval(updateCountSecond, 1000);

function updateCountDay() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  remainingDay.innerHTML = `0${days}`;
}
function updateCountHours() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  remaininHours.innerHTML = `${hours}`;
}
function updateCountMinute() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  remaininMunites.innerHTML = `${minutes}`;
}
function updateCountSecond() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  remaininSeconds.innerHTML = `${seconds}`;
}


// Timer End
//Flash Sale Start

const endpoint = "https://fakestoreapi.com/products";

let allProducts = [];
let wishListProduct = [];
async function getProducts() {
  const response = await fetch(endpoint);
  const products = await response.json();
  allProducts = products;
  productFlashSale(products)

}

getProducts();

function addToCart(productId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const productToAdd = allProducts.find((product) => product.id === productId);

  const isProductInCart = cartProducts.some(
    (product) => product.id === productId
  );

  if (!isProductInCart) {
    const newCart = [...cartProducts, { ...productToAdd, quantity: 1 }];
    localStorage.setItem("cartProducts", JSON.stringify(newCart));
  } else {
    alert("Bu ürün zaten sepette ekli!");
  }
}

function productFlashSale(products) {
  const productFlashSaleContainer = document.querySelector("#productFlashSaleContainer");
  let priceDiscount;
  const productFS = products
    .map((product) => {
      return `<div class="product-card">
                  <div class="img-container">
                    <img src="${product.image}" />
                    <div class="discountDetails">-50%</div>       
                    <div class="add-card">
                      <h3 onClick="addToCart(${product.id})" class="add-to-cart" id="addToCart">Add To Cart</h3>
                    </div>
                  </div>
                  <div class="favori-Button">
                      <input onClick="favoriButton(${product.id})" type="button" id="favoriButton" value="♡">
                    </div>
                  <div class="product-title">
                    <h5 class="product-title-text">${product.title}</h5>
                  </div>
                  <div class="product-price">
                    <h4>$${makeDiscountPrice(product.price, 50)}</h4>
                    <div class="product-price_block">
                      <h4>$${product.price}</h4>
                    </div>
                  </div>
                  <div class="product-stars">
                    <div class="product-img">
                      ${renderRatingStars(product.rating.rate)}
                    </div>
                    <div class="product-stars_voting">
                      <p>(${product.rating.count})</p>
                    </div>
                  </div>
            </div>`
    }).join("");
  productFlashSaleContainer.innerHTML = productFS;
}
function favoriButton(favorite) {
  const wishList = JSON.parse(localStorage.getItem("wishListProduct")) || [];
  const WishListToAdd = allProducts.find((product) => product.id === favorite);

  const ProductInFavorite = wishList.some(
    (product) => product.id === favorite
  );

  if (!ProductInFavorite) {
    const newWishList = [...wishList, { ...WishListToAdd, quantity: 1 }];
    localStorage.setItem("wishListProduct", JSON.stringify(newWishList));
  } else {
    alert("Bu ürün zaten favorilere ekli!");
  }
}

function renderRatingStars(rating) {
  let stars = "";
  const emptyStars = 5 - Math.round(rating);
  for (let i = 0; i < Math.round(rating); i++) {
    stars += '<img src="images/starNone.png" />'
  }
  if (stars !== 0) {
    for (let z = 0; z < emptyStars; z++) {
      stars += '<img src="images/star.png" />'
    }
  }
  else { }
  return stars;
}

const initSlider = () => {
  const productList = document.querySelector(".todaysProduct .product-Flash-Sale-Container");
  const slideButtons = document.querySelectorAll(".productDirection .direction-Button");
  const maxScrollLeft = productList.scrollWidth - productList.clientWidth;

  slideButtons.forEach(button => {
    button.addEventListener("click", () => {
      let direction;
      if (button.id === "prevButton") {
        direction = -1;
      }
      else {
        direction = 1;
      }
      const scrollAmount = productList.clientWidth * direction;
      productList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });
  const handleSlideButtons = () => {
    slideButtons[0].style.display = productList.scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display = productList.scrollLeft >= 4960 ? " none" : "block";
  }
  productList.addEventListener("scroll", () => {
    handleSlideButtons();
  });
}
window.addEventListener("load", initSlider);

function makeDiscountPrice(price, discount) {
  return (price - (price * discount) / 100).toFixed(2);
}

//Flash Sale End