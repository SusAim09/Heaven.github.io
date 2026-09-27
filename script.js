let cart = [];

function addProduct(name, price) {
  cart.push({ name, price });
  updateCart();
  openCart();
}

function updateCart() {
  const count = document.getElementById("cart-count");
  const items = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");

  count.textContent = cart.length;

  if (!cart.length) {
    items.innerHTML = '<p style="color:#888;padding:10px 0;">Your cart is empty.</p>';
    total.textContent = "0.00";
    return;
  }

  let totalPrice = 0;
  items.innerHTML = cart.map(item => {
    totalPrice += item.price;
    return `<div class="cart-item"><span>${item.name}</span><strong>$${item.price.toFixed(2)}</strong></div>`;
  }).join("");

  total.textContent = totalPrice.toFixed(2);
}

function openCart() {
  document.getElementById("cart-overlay").classList.add("active");
}

function closeCart(event) {
  const overlay = document.getElementById("cart-overlay");
  if (!event || event.target === overlay) overlay.classList.remove("active");
}

function checkout() {
  alert("SellAuth checkout will be connected here next.");
}

window.addEventListener("scroll", () => {
  document.documentElement.style.setProperty("--scroll", `${window.scrollY * 0.18}px`);
});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function createParticles() {
  const amount = Math.min(55, Math.max(22, Math.floor(innerWidth / 14)));
  particles = Array.from({ length: amount }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    size: Math.random() * 1.8 + 0.5,
    speed: Math.random() * 0.45 + 0.15,
    drift: (Math.random() - 0.5) * 0.18,
    alpha: Math.random() * 0.38 + 0.10
  }));
}

function animateParticles() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (const p of particles) {
    p.y += p.speed;
    p.x += p.drift;

    if (p.y > innerHeight + 5) {
      p.y = -5;
      p.x = Math.random() * innerWidth;
    }
    if (p.x < -5) p.x = innerWidth + 5;
    if (p.x > innerWidth + 5) p.x = -5;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(184, 151, 45, ${p.alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(animateParticles);
}

resizeCanvas();
createParticles();
animateParticles();

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

updateCart();
