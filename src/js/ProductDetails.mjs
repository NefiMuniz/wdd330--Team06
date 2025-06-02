import { cartCounter, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {

    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
    //
    this.loadComments();
    this.setupCommentForm();
  }

  loadComments() {
    const allComments = getLocalStorage("product-comments") || {};
    const productComments = allComments[this.productId] || [];
    const commentsList = document.getElementById("commentsList");

    commentsList.innerHTML = "";
    productComments.forEach(comment => {
      const li = document.createElement("li");
      li.textContent = comment;
      commentsList.appendChild(li);
    });
  }

  setupCommentForm() {
    const form = document.getElementById("commentForm");
    const textarea = document.getElementById("commentText");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const comment = textarea.value.trim();
      if (comment === "") return;

      const allComments = getLocalStorage("product-comments") || {};
      if (!allComments[this.productId]) {
        allComments[this.productId] = [];
      }
      allComments[this.productId].push(comment);
      setLocalStorage("product-comments", allComments);

      textarea.value = "";
      this.loadComments(); // Refresh list
    });

  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);

    // Message that will be displayed when the user adds a product to the Cart
    const message = document.querySelector(".message-to-cart");
    message.textContent = "Added to the Cart";
    message.style.opacity = "1";
    message.style.transform = "translateY(0)";
    // Set a timeout for the message to disappear
    setTimeout(() => {
      message.style.opacity = "0";
      message.style.transform = "translateY(20px)";
    }, 3000);
    // Update the cart Counter
    cartCounter(cartItems.length);
  }

  renderProductDetails() {
    document.querySelector("main").innerHTML = productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  const discount = product.SuggestedRetailPrice - product.FinalPrice;
  const hasDiscount = discount > 0;

  return `
  <section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider" src="${product.Images.PrimaryMedium}" id="productImage" alt="${product.Name}" />
    <p id="productPrice" class="product-card__price">
      <span class="final-price">$${product.FinalPrice.toFixed(2)}</span>
      ${hasDiscount
      ? `<span class="original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
             <span class="discount-badge">Save $${discount.toFixed(2)}</span>`
      : `$${product.FinalPrice}`
    }
    </p>
    <p id="productColor" class="product__color">${product.Colors[0].ColorName}</p>
    <p id="productDescription" class="product__description">${product.DescriptionHtmlSimple}</p>

    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
    
    <div class="message-added-to-cart">
      <span class="message-to-cart"></span>
    </div>

    <!-- 💬 Comments Section -->
    <section class="comments-section">
      <h3>Customer Comments</h3>
      <ul id="commentsList" class="comments-list"></ul>
      <form id="commentForm">
        <label for="commentText">Add a comment:</label>
        <textarea id="commentText" rows="3" required></textarea>
        <button type="submit">Submit Comment</button>
      </form>
    </section>
  </section>`;
}
