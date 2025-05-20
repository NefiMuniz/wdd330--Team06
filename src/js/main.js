import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0]?.ColorName ?? ""}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button class="remove-item" data-id="${item.Id}">❌</button>
    </li>
  `;
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
}

// Update renderCartContents to call attachRemoveListeners
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  console.log("Cart Items:", cartItems);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  attachRemoveListeners();
}

renderCartContents();
