document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.hero-badge,.hero .eyebrow,.hero h1,.hero-copy,.hero-actions,.trust-row,.hero-orbit,.scroll-cue').forEach(el=>{el.style.opacity='1';el.style.visibility='visible'});
const root=document.documentElement, body=document.body;
let lastY=window.scrollY,lastT=performance.now();
window.addEventListener('scroll',()=>{const now=performance.now(),y=window.scrollY;root.style.setProperty('--scrollY',`${y}px`);root.style.setProperty('--scrollSpeed',`${Math.min(3,Math.abs(y-lastY)/Math.max(16,now-lastT))}`);body.classList.add('is-scrolling');clearTimeout(window.__st);window.__st=setTimeout(()=>body.classList.remove('is-scrolling'),140);lastY=y;lastT=now},{passive:true});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.section,.product-card,.category,.benefit,details,.final-cta').forEach(el=>{el.classList.add('reveal');observer.observe(el)});
const canvas=document.getElementById('particles'),ctx=canvas.getContext('2d');let particles=[];
function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);particles=Array.from({length:Math.min(95,Math.max(42,Math.floor(innerWidth/9)))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2.3+.7,s:Math.random()*.55+.2,a:Math.random()*.45+.2,d:(Math.random()-.5)*.25}))}resize();addEventListener('resize',resize);
function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of particles){p.y+=p.s;p.x+=p.d;if(p.y>innerHeight+10){p.y=-10;p.x=Math.random()*innerWidth}if(p.x<-10)p.x=innerWidth+10;if(p.x>innerWidth+10)p.x=-10;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(194,153,43,${p.a})`;ctx.fill()}requestAnimationFrame(draw)}draw();

});
