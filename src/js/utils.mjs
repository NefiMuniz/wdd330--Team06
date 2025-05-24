// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data)
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  if (response.ok) {
    return await response.text();
  } else { throw new Error(`Could not load ${path}`) }
}

export async function loadHeaderFooter() {
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  const headerHTML = await loadTemplate("/partials/header.html");
  const footerHTML = await loadTemplate("/partials/footer.html");

  renderWithTemplate(headerHTML, headerElement, null, headerSetup);
  renderWithTemplate(footerHTML, footerElement);
}

// Example function to attach event listeners
function headerSetup() {
  // Add event listeners here that apply to your header
  const cartLink = document.querySelector(".cart a");
  if (cartLink) {
    cartLink.addEventListener("click", (e) => {
      console.log("Cart link clicked");
      // any other dynamic logic
    });
  }

  // Example: highlight current nav link, or add dropdown behavior
}





export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}