//

import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

async function addToCartHandler(e) {
  const id = e.target.dataset.id;
  console.log("Add to Cart clicked with ID:", id);

  const product = await dataSource.findProductById(id);
  if (!product) {
    console.error("Product not found for ID:", id);
    return;
  }

  console.log("Product found:", product);
  addProductToCart(product);
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addToCart");
  if (addBtn) {
    addBtn.addEventListener("click", addToCartHandler);
  }
});
