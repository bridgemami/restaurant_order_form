import menuArray from "./data.js";

const headerEl = document.getElementById("header");
const foodItem = document.getElementById("menu-container");
const orderEl = document.getElementById("order-container");
const checkOutEl = document.getElementById("check-out-container");

// let cartArray = JSON.parse(localStorage.getItem("cart")) || [];
let cartArray = [];
function renderMenu() {
  let html = ``;
  const menuRender = menuArray
    .map((food) => {
      let quantity =
        cartArray.find((cart) => cart.id === `${food.name}-quantity`) || [];
      return (html = `
       <section class="foodContainer">
        <p class="icon">${food.emoji}</p>
        <div class="foodInformationContainer">
        <h4>${food.name}</h4>
        <p>${food.ingredients.join(", ")}</p>
        <p>$${food.price}</p>
        </div>
        <div class="quantity-container">
        <button class="decrease-quantity btn" data-name="${
          food.name
        }" data-id="${food.id}">-</button>
        <p class="quantity" id="${food.name}-quantity" data-id="${food.id}">${
        quantity.item === undefined ? 0 : quantity.item
      }</p>
        <button class="increase-quantity btn" data-name="${
          food.name
        }" data-id="${food.id}">+</button>
        </div>
        </section>
        `);
    })
    .join("");

  foodItem.innerHTML = menuRender;
}

renderMenu();

function renderEmptyCart() {
  orderEl.innerHTML = `<div class="empty-cart">
  <h2>Cart is empty</h2>
  </div>`;
}

// let quantity =
// cartArray.find((cart) => cart.id === `${food.name}-quantity`) || [];

function renderOrder() {
  const total = [];
  if (cartArray.length !== 0) {
    orderEl.innerHTML = cartArray
      .map((cart) => {
        let subtotal = Number(cart.price * cart.item);
        total.push(subtotal);
        return `<div class="order-item-container">
      <p class="icon">${cart.emoji}</p>
        <p>$${cart.price}</p>
        <div class="quantity-container">
        <button class="decrease-quantity-cart btn" data-name="${
          cart.name
        }" data-id="${cart.id}">-</button>
          <p class="quantity" id="${cart.name}-quantity" data-id="${cart.id}">${
          cart.item === undefined ? 0 : cart.item
        }</p>
          <button class="increase-quantity-cart btn" data-name="${
            cart.name
          }" data-id="${cart.id}">+</button>
          </div>
        <p>$${subtotal}</p>
        <button id="${cart.name}-delete" class="delete-item btn" data-id=${
          cart.itemId
        }>X</button>
        </div>`;
      })
      .join("");
    orderEl.innerHTML += `<div class="order-total-container">
    <p class="total">Total: $${total.reduce((a, b) => {
      return a + b;
    })}</p>
    <div class="checkout-container">
    <button id ="checkout-btn" class="checkout-btn btn">Checkout</button>
    <button id="clear-cart-btn" class="clear-cart-btn btn">Clear Order</button>
    </div>
    </div>`;
  } else {
    renderEmptyCart();
  }
  renderMenu();
}

renderOrder();

function renderCheckout(e) {
  e.preventDefault();
  checkOutEl.classList.remove("hidden");
  orderEl.classList.add("whiteout");
  foodItem.classList.add("whiteout");
  headerEl.classList.add("whiteout");
  checkOutEl.classList.remove("whiteout");
  let createDiv = document.createElement("div");
  const date = new Date();
  let getMonth = date.getMonth() + 1;
  let getYear = date.getFullYear();
  function month() {
    if (getMonth < 10) {
      return getMonth.toString().padStart(2, "0");
    } else {
      return getMonth;
    }
  }

  createDiv.innerHTML = `
  <section class="payment-container">
  <div class="form-header">
  <button id="close-payment-btn" class="close-checkout btn">x</button>
  <h3 class="cc">Enter card details</h3>
  </div>
  <form class="form-container">
  <label for="name">
  <input type="text" id="name" name="name" placeholder="Full Name" pattern="[A-Za-z]{2,25}" required />
  </label>

  <label for="credit-card-number">
  <input type="text" id="credit-card-number" name="credit-card-number" placeholder="Credit Card Number" pattern="[0-9]{3}" required /></label>

  <label for="credit-card-date">
  <input type="month" id="credit-card-date" name="credit-card-date" min="${getYear}-${month()}" value="${getYear}-${month()}" required /></label>

  <label for="credit-card-code">
  <input type="text" id="credit-card-code" name="credit-card-code" placeholder="CSC code" pattern="[0-9]{3}" required /></label>
  <p id="missing" class="missing"></p>

  <button type="submit" id="payment-btn" class="payment-btn btn">Submit</button>
  </form>
  </section>
  `;
  return checkOutEl.appendChild(createDiv);
}

function paymentRequirements(e) {
  const missingEl = document.getElementById("missing");
  const nameEl = document.getElementById("name");
  const creditCardNumEl = document.getElementById("credit-card-number");
  const cvvEl = document.getElementById("credit-card-code");
  if (
    nameEl.value.length > 2 &&
    creditCardNumEl.value.length === 16 &&
    cvvEl.value.length === 3
  ) {
    document.querySelector("body").innerHTML = `<h2 class="thank-you">Thank you ${
      nameEl.value
    } for your order!</h2>
                                                <p>It should ready in ${
                                                  10 * cartArray.length
                                                } minutes.</p>
                                                <p>The page will automatically go back to the ordering page in 10 seconds.</p>
    `;
    setTimeout(() => location.reload(), 10000);
  } else if (nameEl.value.length < 2) {
    if (
      creditCardNumEl.value.length < 16 ||
      creditCardNumEl.value.length > 16
    ) {
      missingEl.innerHTML = "";
      missingEl.innerHTML = `<p>Please enter your 16 digit credit card number and name with more than 2 letters</p>`;
    } else if (cvvEl.value.length > 3 || cvvEl.value.length < 3) {
      missingEl.innerHTML = "";
      missingEl.innerHTML = `<p>Please enter your 3 digit credit card cvv code and name with more than 2 letters</p>`;
    } else {
      missingEl.innerHTML = "";
      missingEl.innerHTML = `<p>Please enter name with more than 2 letters</p>`;
    }
  } else if (
    creditCardNumEl.value.length < 16 ||
    creditCardNumEl.value.length > 16
  ) {
    if (cvvEl.value.length > 3 || cvvEl.value.length < 3) {
      missingEl.innerHTML = "";
      missingEl.innerHTML = `<p>Please enter your 16 digit credit card number and 3 digit credit card cvv code</p>`;
    } else {
      missingEl.innerHTML = "";
      missingEl.innerHTML =
        "<p>Please enter your 16 digit credit card number</p>";
    }
  } else if (cvvEl.value.length > 3 || cvvEl.value.length < 3) {
    missingEl.innerHTML = "";
    missingEl.innerHTML =
      "<p>Please enter your 3 digit credit card cvv code</p>";
  } else {
    missingEl.innerHTML = "";
    missingEl.innerHTML = `<p>Please enter all the information</p>`;
  }
}

function updateQuantity(item) {
  let quantity = cartArray.find((cart) => cart.id === item);
  document.getElementById(quantity.id).innerHTML = quantity.item;
}

function cartQuantityIncrement(id) {
  let selectedItem = id;
  let quantity = cartArray.find((cart) => cart.id === selectedItem);
  return quantity.item++;
}

function cartQuantityDecrement(id) {
  let selectedItem = id;
  let quantity = cartArray.find((cart) => cart.id === selectedItem);
  if (quantity.item > 1) {
    quantity.item--;
    return cartArray;
  } else if (quantity.item === 1) {
    console.log(quantity.item);
    cartArray = cartArray.filter((cart) => cart.id !== selectedItem);
    return cartArray;
  } else {
    return;
  }
}

function increment(id, item) {
  let selectedItem = id;
  let quantity = cartArray.find((cart) => cart.id === selectedItem);
  if (quantity === undefined) {
    cartArray.push({
      id: selectedItem,
      item: 1,
      ingredients: item.ingredients,
      price: item.price,
      emoji: item.emoji,
      name: item.name,
      // delete: `${item.name}-delete`,
      itemId: item.id,
    });
  } else {
    quantity.item++;
  }
  updateQuantity(selectedItem);
  // localStorage.setItem("cart", JSON.stringify(cartArray));
}

function decrement(id) {
  let selectedItem = id;
  let quantity = cartArray.find((cart) => cart.id === selectedItem);
  if (quantity === undefined) {
    return;
  } else if (quantity.item === 0) {
    return;
  } else {
    quantity.item--;
  }
  updateQuantity(selectedItem);

  cartArray = cartArray.filter((cart) => cart.item !== 0);
  // localStorage.setItem("cart", JSON.stringify(cartArray));
}

function deleteItemFromCart(id) {
  let selectedItem = id;
  // console.log(cartArray)
  cartArray = cartArray.filter((cart) => cart.id !== selectedItem);
  //  localStorage.setItem("cart", JSON.stringify(cartArray));
  renderOrder();
}

function clearCart() {
  cartArray = [];
  renderMenu();
  renderOrder();
  checkOutEl.innerHTML = ``;
}

document.addEventListener("click", (e) => {
  const item = e.target.classList;
  e.preventDefault();
  if (item[0] === "increase-quantity") {
    menuArray.filter((item) => {
      item.quantity = document.getElementById(`${item.name}-quantity`);
      if (item.id.toString() === e.target.dataset.id) {
        increment(item.quantity.id, item);
        renderOrder();
        console.log(cartArray);
      }
    });
  }
  if (item[0] === "decrease-quantity") {
    menuArray.filter((item) => {
      item.quantity = document.getElementById(`${item.name}-quantity`);
      if (item.id.toString() === e.target.dataset.id) {
        decrement(item.quantity.id);
        renderOrder();
      }
    });
  }
  if (item[0] === "delete-item") {
    menuArray.filter((item) => {
      item.delete = document.getElementById(`${item.name}-quantity`);
      if (item.id.toString() === e.target.dataset.id) {
        deleteItemFromCart(item.delete.id);
        document.getElementById(item.delete.id).textContent = 0;
        console.log(cartArray);
      }
    });
  }
  if (item[0] === "increase-quantity-cart") {
    cartArray.filter((item) => {
      item.quantity = document.getElementById(`${item.name}-quantity`);
      if (item.id.toString() === e.target.dataset.id) {
        cartQuantityIncrement(item.quantity.id);
        renderOrder();
      }
    });
  }
  if (item[0] === "decrease-quantity-cart") {
    cartArray.filter((item) => {
      item.quantity = document.getElementById(`${item.name}-quantity`);
      if (item.id.toString() === e.target.dataset.id) {
        cartQuantityDecrement(item.quantity.id);
        console.log(cartArray);
        renderOrder();
      }
    });
  }
  if (item[0] === "clear-cart-btn") {
    clearCart();
  }

  if (item[0] === "checkout-btn") {
    renderCheckout(e);
  }

  if (item[0] === "payment-btn") {
    paymentRequirements(e);
  }
  if (item[0] === "close-checkout") {
    checkOutEl.innerHTML = ``;
    orderEl.classList.remove("whiteout");
    foodItem.classList.remove("whiteout");
    headerEl.classList.remove("whiteout");
  }
});
