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
const n=Math.min(120,Math.max(45,Math.floor(innerWidth/7)));
particles=Array.from({length:n},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,s:Math.random()*2.1+.65,v:Math.random()*.62+.12,d:(Math.random()-.5)*.18,a:Math.random()*.42+.22,p:Math.random()*Math.PI*2}))
}
function drawParticles(){
ctx.clearRect(0,0,innerWidth,innerHeight);
for(const p of particles){
p.y+=p.v;p.x+=p.d;p.p+=.02;
if(p.y>innerHeight+8){p.y=-8;p.x=Math.random()*innerWidth}
if(p.x<-8)p.x=innerWidth+8;if(p.x>innerWidth+8)p.x=-8;
const twinkle=p.a+(Math.sin(p.p)*.06);
ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fillStyle=`rgba(224,193,83,${Math.max(.10,twinkle)})`;ctx.fill()
}
requestAnimationFrame(drawParticles)
}
resizeCanvas();createParticles();drawParticles();
addEventListener("resize",()=>{resizeCanvas();createParticles()});
updateCart();
                 
