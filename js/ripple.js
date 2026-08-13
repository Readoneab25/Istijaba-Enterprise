// ===========================================================
// Pond ripple canvas — signature hero element.
// Simulated water surface using layered concentric ripples that
// respond to cursor movement / touch, evoking disturbed pond water.
// ===========================================================
(function () {
    const canvas = document.getElementById('rippleCanvas');
    if (!canvas) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
    const ctx = canvas.getContext('2d');
    let w, h, dpr;
    let ripples = [];
    let lastSpawn = 0;
  
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);
  
    function spawnRipple(x, y, strength = 1) {
      ripples.push({ x, y, r: 0, maxR: 140 + Math.random() * 120, alpha: 0.35 * strength, speed: 1.1 + Math.random() * 0.6 });
      if (ripples.length > 40) ripples.shift();
    }
  
    // ambient auto ripples so it's alive even without interaction
    function ambientTick(t) {
      if (t - lastSpawn > 1400) {
        spawnRipple(Math.random() * w, Math.random() * h * 0.8 + h * 0.1, 0.6);
        lastSpawn = t;
      }
    }
  
    canvas.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      if (Math.random() < 0.5) {
        spawnRipple(e.clientX - rect.left, e.clientY - rect.top, 1);
      }
    });
    canvas.addEventListener('pointerdown', (e) => {
      const rect = canvas.getBoundingClientRect();
      spawnRipple(e.clientX - rect.left, e.clientY - rect.top, 2);
    });
  
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
  
      // base gradient "water"
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, 'rgba(62,112,82,0.10)');
      grad.addColorStop(1, 'rgba(41,79,56,0.18)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
  
      if (!reduceMotion) ambientTick(t);
  
      ripples.forEach((r) => {
        r.r += r.speed;
        const life = 1 - r.r / r.maxR;
        if (life <= 0) return;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,138,61,${(r.alpha * life).toFixed(3)})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
  
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(242,236,221,${(r.alpha * life * 0.6).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      ripples = ripples.filter(r => r.r < r.maxR);
  
      requestAnimationFrame(draw);
    }
  
    if (reduceMotion) {
      draw(0);
    } else {
      requestAnimationFrame(draw);
      for (let i = 0; i < 4; i++) {
        spawnRipple(Math.random() * (canvas.clientWidth || 800), Math.random() * (canvas.clientHeight || 500), 0.8);
      }
    }
  })();