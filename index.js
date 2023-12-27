import menuArray from "./data.js";

const foodItem = document.getElementById("menu-container");
const orderEl = document.getElementById("order-container");
let cartArray = [];

function renderMenu() {
  let html = ``;
  const menuRender = menuArray
    .map((food) => {
      let foodLowerCase = food.name.toLowerCase();
      let quantity = foodLowerCase + "Quantity";
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
        <p class="quantity" id="${food.name}-quantity" data-id="${
        food.id
      }">0</p>
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
{
  /* <input type="number" name="quantity" class="quantity" value=0 id="${food.name}-quantity" data-id="${
          food.id
        }"  /> */
}
renderMenu();

function renderOrder(order) {
  const orderList = document.createElement("div");
  orderEl.classList.remove("hidden");
  let html = "";

  order.map((cart) => {
    html += `<div class="order-item-container">
              <p>${cart.name}</p>
                <p>$${cart.price}</p>
                <p></p>
                <p>${cart.price}</p>
                </div>`;
  });
  orderList.innerHTML = `${html}`;
  orderEl.appendChild(orderList);
}

function updateQuantity(item) {
  let quantity = cartArray.find((cart) => cart.id === item);
  document.getElementById(quantity.id).innerHTML = quantity.item;
}

function increment(id) {
  let selectedItem = id;
  let quantity = cartArray.find((cart) => cart.id === selectedItem);
  if (quantity === undefined) {
    cartArray.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    quantity.item++;
  }
  updateQuantity(selectedItem);
  console.log(cartArray);
}

function decrement(id) {
  let selectedItem = id;
  let quantity = cartArray.find((cart) => cart.id === selectedItem);
  if (quantity.item === 0) {
    return;
  } else {
    quantity.item--;
  }
  updateQuantity(selectedItem);
  console.log(cartArray);
}

document.addEventListener("click", (e) => {
  const item = e.target.classList;

  e.preventDefault();
  if (item[0] === "increase-quantity") {
    menuArray.filter((item) => {
      item.quantity = document.getElementById(`${item.name}-quantity`);
      // console.log(item.quantity.id)
      if (item.id.toString() === e.target.dataset.id) {
        increment(item.quantity.id);
        // cartArray.push(item)
      }
    });
    orderEl.innerHTML = "";
    renderOrder(cartArray);
  }
  if (item[0] === "decrease-quantity") {
    menuArray.filter((item) => {
      item.quantity = document.getElementById(`${item.name}-quantity`);
      if (item.id.toString() === e.target.dataset.id) {
        decrement(item.quantity.id);
      }
    });

    orderEl.innerHTML = "";
    if (cartArray.length <= 0) {
      orderEl.innerHTML = "";
      // orderEl.classList.add("hidden")
    }
    if (cartArray.length > 0) {
      // decrement(document.getElementById(`${item.name}-quantity`))
      orderEl.innerHTML = "";
      renderOrder(cartArray);
    }
  }
});
