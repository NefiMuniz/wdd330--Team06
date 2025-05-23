import { renderListWithTemplate } from "./utils.mjs";

function productTemplate(product) {
    return `
    <li class="product-card">
      <a href="#" class="product-card__image">
        <img src="${product.Image}" alt="${product.Name}" />
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const products = await this.dataSource.getProducts(this.category);
        this.render(products);
    }

    render(products) {
        renderListWithTemplate(this.listElement, products, productTemplate);
    }
}