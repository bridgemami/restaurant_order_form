import menuArray from "./data.js";

const bodyEl = document.body

document.addEventListener("click", (e) => {
        e.preventDefault();
})

function renderMenu () {
    const foodItem = document.createElement("main");
    let html = ``
    const menuRender = menuArray.map((food)=> {
       return html = `
       <section class="foodContainer">
        <p class="icon">${food.emoji}</p>
        <div class="foodInformationContainer">
        <h4>${food.name}</h4>
        <p>${food.ingredients.join(', ')}</p>
        <p>$${food.price}</p>
        </div>
        <div>
        <button class="decrease-quantity" data-name="${food.name}" data-id="${food.id}">-</button>
        <input type="number" name="quantity" class="quantity" value='0' id="${food.name}-quantity" />
        <button class="increase-quantity" data-name="${food.name}" data-id="${food.id}">+</button>
        </div>
        </section>
        `
    }
    ).join("");

    foodItem.innerHTML = menuRender
    bodyEl.appendChild(foodItem)
}

renderMenu()
