//
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

let cartItemsTotal = document.querySelector(".cart-total");

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
   >
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove-item" data-id="${item.Id}" title="Remove from cart">Remove ❌</button>
</li>`;

  return newItem;
}

// Attach listeners to all ❌ buttons

function attachRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });
}

// Remove item and re-render

function removeCartItem(e) {
  const idToRemove = e.target.dataset.id;
  let cart = getLocalStorage("so-cart") || [];
  cart = cart.filter((item) => item.Id !== idToRemove);
  setLocalStorage("so-cart", cart);
  renderCartContents(); // Re-render cart

  // update the total price after removal
  getTotal();
  displayEmptyCartMessage();
}

// Update renderCartContents to call attachRemoveListeners
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  console.log("Cart Items:", cartItems);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  attachRemoveListeners();
}

function displayEmptyCartMessage() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length === 0) {
    document.querySelector(".cart-empty").textContent = "Your cart is empty!";
  }
}

function getTotal() {
  cartItemsTotal = getLocalStorage("so-cart") || [];
  const total = cartItemsTotal.reduce((sum, item) => sum + item.FinalPrice, 0);
  document.querySelector(".cart-total").textContent =
    `Total: $${total.toFixed(2)}`;
}

renderCartContents();
getTotal();
displayEmptyCartMessage();
