import menuArray from "./data.js";

const foodItem = document.getElementById("menu-container");
const orderEl = document.getElementById("order-container");
const pizzaInput = document.getElementById(`pizza-quantity`)
let cartArray = [];

function renderMenu() {
  let html = ``;
  const menuRender = menuArray
    .map((food) => {
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
        <input type="number" name="quantity" class="quantity" value=0 id="${food.name}-quantity" data-id="${
          food.id
        }"  />
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

function renderOrder(order) {
  const orderList = document.createElement("div");
  orderEl.classList.remove("hidden");
  let html = "";
console.log(order)
 
  order.map((cart) => {
    html += `<div class="order-item-container">
              <p>${cart.name}</p>
                <p>$${cart.price}</p>
                <p></p>
                <p>${cart.price}</p>
                </div>`
  });
  orderList.innerHTML = `${html}`;
  orderEl.appendChild(orderList);
}

function quantityUpdate (order) {

}
 
document.addEventListener("click", (e) => {
  const item = e.target.classList;

  e.preventDefault();
  console.log(document.getElementById('Pizza-quantity').value)
  if (item[0] === "increase-quantity") {

    menuArray.filter((item) =>{
      item.quantity = Number(document.getElementById(`${item.name}-quantity`).value)
      if(item.id.toString() === e.target.dataset.id)  {
        item.quantity++
        cartArray.push(item)} 
        // updateQuantityInMenu(item);
      }
    );

      renderOrder(cartArray);
  }
  if(item[0] === "decrease-quantity"){
    menuArray.filter((item) => item.id.toString() === e.target.dataset.id ? cartArray.pop(item) : null)
    renderOrder(cartArray);
    if (cartArray.length <= 0) {
        orderEl.innerHTML = "";
        // orderEl.classList.add("hidden")
    }
    else {
        console.log(cartArray)
    }
  }
});
