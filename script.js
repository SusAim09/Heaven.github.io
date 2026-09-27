let cart=[];

function addProduct(name,price){cart.push({name,price});updateCart();openCart()}
function updateCart(){
const count=document.getElementById("cart-count"),items=document.getElementById("cart-items"),total=document.getElementById("cart-total");
count.textContent=cart.length;
if(!cart.length){items.innerHTML='<p style="color:#888;padding:10px 0;">Your cart is empty.</p>';total.textContent="0.00";return}
let sum=0;
items.innerHTML=cart.map(i=>{sum+=i.price;return `<div class="cart-item"><span>${i.name}</span><strong>$${i.price.toFixed(2)}</strong></div>`}).join("");
total.textContent=sum.toFixed(2)
}
function openCart(){document.getElementById("cart-overlay").classList.add("active")}
function closeCart(e){const o=document.getElementById("cart-overlay");if(!e||e.target===o)o.classList.remove("active")}
function checkout(){alert("SellAuth checkout will be connected here next.")}

/* Scroll state: animations are strongest only while the user is actually scrolling. */
let lastY=window.scrollY,lastT=performance.now(),scrollTimer;
window.addEventListener("scroll",()=>{
const now=performance.now(),y=window.scrollY;
const speed=Math.min(Math.abs(y-lastY)/Math.max(now-lastT,1)*18,1.8);
document.documentElement.style.setProperty("--scrollY",y+"px");
document.documentElement.style.setProperty("--scrollSpeed",speed.toFixed(2));
document.body.classList.add("is-scrolling");
clearTimeout(scrollTimer);
scrollTimer=setTimeout(()=>document.body.classList.remove("is-scrolling"),140);
lastY=y;lastT=now;
},{passive:true});

/* Reveal sections/cards as they enter the viewport. */
const revealTargets=document.querySelectorAll(".section-heading,.product-card,.category,.benefit,details,.final-cta");
revealTargets.forEach(el=>el.classList.add("reveal"));
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}})
},{threshold:.12,rootMargin:"0px 0px -45px 0px"});
revealTargets.forEach(el=>observer.observe(el));

/* Gold star particles */
const canvas=document.getElementById("particles"),ctx=canvas.getContext("2d");
let particles=[];
function resizeCanvas(){
const dpr=Math.min(devicePixelRatio||1,2);
canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";
ctx.setTransform(dpr,0,0,dpr,0,0)
}
function createParticles(){
const n=Math.min(70,Math.max(28,Math.floor(innerWidth/10)));
particles=Array.from({length:n},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,s:Math.random()*1.7+.45,v:Math.random()*.42+.08,d:(Math.random()-.5)*.16,a:Math.random()*.35+.08,p:Math.random()*Math.PI*2}))
}
function drawParticles(){
ctx.clearRect(0,0,innerWidth,innerHeight);
for(const p of particles){
p.y+=p.v;p.x+=p.d;p.p+=.02;
if(p.y>innerHeight+8){p.y=-8;p.x=Math.random()*innerWidth}
if(p.x<-8)p.x=innerWidth+8;if(p.x>innerWidth+8)p.x=-8;
const twinkle=p.a+(Math.sin(p.p)*.06);
ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fillStyle=`rgba(190,157,47,${Math.max(.03,twinkle)})`;ctx.fill()
}
requestAnimationFrame(drawParticles)
}
resizeCanvas();createParticles();drawParticles();
addEventListener("resize",()=>{resizeCanvas();createParticles()});
updateCart();
.nav{height:82px;padding:0 20px}.logo{font-size:35px;letter-spacing:6px}.cart-button{padding:12px 17px}
.hero{min-height:calc(100vh - 82px);padding-top:70px}.hero h1{font-size:clamp(70px,18vw,115px);margin:28px 0 35px}.hero-copy{font-size:17px}.hero-actions{width:100%;max-width:420px}.btn{flex:1;padding:17px 15px}.trust-row{flex-direction:column;gap:10px}
.section{padding:95px 20px}.products{grid-template-columns:1fr;max-width:520px}.product-art{height:220px}.benefits{grid-template-columns:1fr;max-width:520px}.category-grid{grid-template-columns:1fr}
.sun{right:-45px;top:10%;width:125px;height:125px}.sun-glow{right:-250px;top:-160px}.cloud{transform:scale(.72)}.cloud-2{transform:scale(.55)}.cloud-3,.cloud-4{opacity:.3}
}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;scroll-behavior:auto!important;transition:none!important}}
