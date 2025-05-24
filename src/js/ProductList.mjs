import { renderListWithTemplate } from "./utils.mjs";
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?products=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
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
        const list = this.category
        ? await this.dataSource.getProducts(this.category)
        : await this.dataSource.getData():
        this.renderList(list):
    }

    renderList(products) {
        renderListWithTemplate(this.listElement, products, productTemplate);
    }
}


 

   async filterProducts(query) {
    const list = await this.dataSource.getData();
        const filteredProducts = list.filter(product =>
            product.Name.toLowerCase().includes(query)
        );
    renderListWithTemplate(productCardTemplate, this.listElement, filteredProducts, "afterbegin", true);
    }
}