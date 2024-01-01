import menuArray from "./data.js";

const foodItem = document.getElementById("menu-container");
const orderEl = document.getElementById("order-container");
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
        <div>
        <button class="decrease-quantity" data-name="${food.name}" data-id="${
        food.id
      }">-</button>
        <p class="quantity" id="${food.name}-quantity" data-id="${food.id}">${
        quantity.item === undefined ? 0 : quantity.item
      }</p>
        <button class="increase-quantity" data-name="${food.name}" data-id="${
        food.id
      }">+</button>
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

function renderOrder() {
  const total = [];
  if (cartArray.length !== 0) {
    orderEl.innerHTML = cartArray
      .map((cart) => {
        let subtotal = Number(cart.price * cart.item);
        total.push(subtotal);
        return `<div class="order-item-container">
      <p>${cart.emoji}</p>
        <p>$${cart.price}</p>
        <p>${cart.item}</p>
        <p>$${subtotal}</p>
        <p id="${cart.name}-delete" class="delete-item" data-id=${cart.itemId}>X</p>
        </div>`;
      })
      .join("");
    orderEl.innerHTML += `<div class="order-total-container">
    <p>Total: $${total.reduce((a, b) => {
      return a + b;
    })}
    <button>Submit Order</button>
    </div>`;
  } else {
    renderEmptyCart();
  }
}

renderOrder();

function updateQuantity(item) {
  let quantity = cartArray.find((cart) => cart.id === item);
  document.getElementById(quantity.id).innerHTML = quantity.item;
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
  renderOrder()
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
        document.getElementById(item.delete.id).textContent = 0
        console.log(cartArray)
      }
    });
  }
});
