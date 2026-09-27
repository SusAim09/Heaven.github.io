let cart = [];

function addProduct(name, price) {
  cart.push({
    name: name,
    price: price
  });

  updateCart();

  openCart();
}

function updateCart() {

  const count = document.getElementById("cart-count");
  const items = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");

  count.textContent = cart.length;

  if (cart.length === 0) {
    items.innerHTML = `
      <p style="color:#888;">
        Your cart is empty.
      </p>
    `;

    total.textContent = "0.00";
    return;
  }

  let totalPrice = 0;

  items.innerHTML = cart.map((item, index) => {

    totalPrice += item.price;

    return `
      <div class="cart-item">
        <span>${item.name}</span>

        <strong>
          $${item.price.toFixed(2)}
        </strong>
      </div>
    `;

  }).join("");

  total.textContent = totalPrice.toFixed(2);
}

function openCart() {
  document
    .getElementById("cart-overlay")
    .classList.add("active");
}

function closeCart(event) {

  if (
    !event ||
    event.target === document.getElementById("cart-overlay")
  ) {
    document
      .getElementById("cart-overlay")
      .classList.remove("active");
  }
}

function checkout() {

  alert(
    "SellAuth checkout will be connected here next."
  );

}

updateCart();
