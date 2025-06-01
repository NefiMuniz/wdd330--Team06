import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const order = new CheckoutProcess("so-cart", ".checkout-summary");
  order.init();

  const zipInput = document.querySelector("#zip");
  if (zipInput) {
    zipInput.addEventListener("blur", order.calculateOrderTotal.bind(order));
  }

  const checkoutBtn = document.querySelector("#checkoutSubmit");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const myForm = document.forms[0];
      const chk_status = myForm.checkValidity();
      myForm.reportValidity();
      if (chk_status) order.checkout();
    });
  }
});
