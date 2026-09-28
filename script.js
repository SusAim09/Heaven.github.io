(() => {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(innerWidth * dpr);
    canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const count = innerWidth < 650 ? 55 : 90;
    particles = Array.from({length:count}, () => ({
      x: Math.random()*innerWidth,
      y: Math.random()*innerHeight,
      r: Math.random()*2.5+0.8,
      v: Math.random()*0.65+0.25,
      drift: (Math.random()-.5)*0.22,
      a: Math.random()*.45+.2
    }));
  }
  function draw(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for(const p of particles){
      p.y += p.v; p.x += p.drift;
      if(p.y > innerHeight+8){p.y=-8;p.x=Math.random()*innerWidth}
      if(p.x < -8)p.x=innerWidth+8;
      if(p.x > innerWidth+8)p.x=-8;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(183,139,37,${p.a})`;
      ctx.shadowBlur=7; ctx.shadowColor='rgba(210,170,55,.55)';
      ctx.fill();
    }
    ctx.shadowBlur=0;
    requestAnimationFrame(draw);
  }
  resize(); addEventListener('resize',resize,{passive:true}); draw();

  const observer = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
})();
