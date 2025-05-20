import { getLocalStorage, getParam, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource)
product.init();

// Add product to cart functionality
function addProductToCart(product) {
  const cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

// Add to cart button event handler
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

// Attach event listener after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addToCart");
  if (addBtn) {
    addBtn.addEventListener("click", addToCartHandler);
  }
});