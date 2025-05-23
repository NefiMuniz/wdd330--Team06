import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const category = 'tents';
const dataSource = new ProductData('category');

const listElement = document.querySelector('.product-list');
const productList = new ProductList(category, dataSource, listElement);

productList.init();