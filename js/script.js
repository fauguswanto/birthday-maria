const bgCanvas = document.getElementById('bg');
const bgCtx = bgCanvas.getContext('2d');
const fxCanvas = document.getElementById('fx');
const fxCtx = fxCanvas.getContext('2d');
const DPR = Math.min(window.devicePixelRatio || 1, 2);
let W = 0, H = 0;
const MOBILE = matchMedia('(max-width: 640px)').matches;

// KONFIGURASI TEKS & GAMBAR
const greetings = {
  cacan: {
    img: 'kucing-maria.gif',
    alt: 'Cacan',
    w1: 'Meow~ Selamat ulang tahun, Maria! Terima kasih sudah jadi bestie-nya babu aku. Semoga bahagia selalu, jangan lupa makan banyak ya! 🐾',
    w2: 'Meow! Semoga doa dan harapanmu terkabul, Maria! Cacan pamit undur diri dulu. 🐈✨'
  },
  mocca: {
    img: 'anjing-maria.gif',
    alt: 'Mocca',
    w1: 'Woof woof! Happy birthday, Maria! Kamu manusia favoritku. Terima kasih sudah selalu main sama aku ya. Mocca selalu menjagamu! 🐶',
    w2: 'Woof! Horeee! Semoga harimu secerah ekorku yang selalu bergoyang, Maria! 🎉'
  }
};

let currentTheme = 'cacan';

let stars = [], shooting = null;
function initStars() {
  stars = [];
  const count = Math.min(320, Math.floor((W * H) / 8000));
  for (let i = 0; i < count; i++) {
    stars.push({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.5+0.25, phase: Math.random()*Math.PI*2, speed: Math.random()*0.02+0.004, warm: Math.random()<0.35 });
  }
}
function drawStars(t) {
  bgCtx.clearRect(0, 0, W, H);
  for (const s of stars) {
    const a = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(s.phase + t * s.speed));
    bgCtx.globalAlpha = a; bgCtx.fillStyle = s.warm ? '#ffe8b8' : '#dbe6ff';
    bgCtx.beginPath(); bgCtx.arc(s.x, s.y, s.r, 0, Math.PI*2); bgCtx.fill();
  }
  bgCtx.globalAlpha = 1;
  if (!shooting && Math.random() < 0.0035) {
    shooting = { x: Math.random()*W*0.7, y: Math.random()*H*0.45, vx: 7+Math.random()*5, vy: 2.5+Math.random()*2.5, life: 1 };
  }
  if (shooting) {
    const s = shooting; s.x += s.vx; s.y += s.vy; s.life -= 0.012;
    const grad = bgCtx.createLinearGradient(s.x, s.y, s.x-s.vx*10, s.y-s.vy*10);
    grad.addColorStop(0, `rgba(255,255,255,${s.life})`); grad.addColorStop(1, 'rgba(255,255,255,0)');
    bgCtx.strokeStyle = grad; bgCtx.lineWidth = 2;
    bgCtx.beginPath(); bgCtx.moveTo(s.x, s.y); bgCtx.lineTo(s.x-s.vx*10, s.y-s.vy*10); bgCtx.stroke();
    if (s.life <= 0 || s.x > W+100 || s.y > H+100) shooting = null;
  }
}

const sparks = [], confetti = [];
function firework(x, y, baseHue) {
  const n = MOBILE ? 60 : 100, hue = baseHue ?? Math.random()*360;
  for (let i = 0; i < n; i++) {
    const ang = Math.random()*Math.PI*2, spd = Math.random()*5+1.2;
    sparks.push({ x, y, vx: Math.cos(ang)*spd, vy: Math.sin(ang)*spd, life: 1, decay: 0.008+Math.random()*0.013, hue: hue+(Math.random()*50-25), size: Math.random()*2+1 });
  }
}
function dropConfetti(count) {
  const colors = [0, 30, 45, 190, 280, 330, 340];
  for (let i = 0; i < count; i++) {
    confetti.push({ x: Math.random()*W, y: -20-Math.random()*H*0.5, w: Math.random()*7+4, h: Math.random()*5+4, vy: Math.random()*1.5+1, drift: (Math.random()-0.5)*0.8, phase: Math.random()*Math.PI*2, sway: 0.02+Math.random()*0.03, rot: Math.random()*Math.PI*2, spin: (Math.random()-0.5)*0.18, hue: colors[(Math.random()*colors.length)|0] });
  }
}

function loop(now) {
  const t = now * 0.001;
  fxCtx.globalCompositeOperation = 'destination-out';
  fxCtx.fillStyle = 'rgba(0,0,0,0.16)'; fxCtx.fillRect(0, 0, W, H);
  fxCtx.globalCompositeOperation = 'lighter';
  for (let i = sparks.length-1; i >= 0; i--) {
    const p = sparks[i]; p.vx *= 0.975; p.vy *= 0.975; p.vy += 0.045; p.x += p.vx; p.y += p.vy; p.life -= p.decay;
    if (p.life <= 0) { sparks.splice(i, 1); continue; }
    fxCtx.globalAlpha = Math.max(0, p.life); fxCtx.fillStyle = `hsl(${p.hue},100%,${55+p.life*30}%)`;
    fxCtx.beginPath(); fxCtx.arc(p.x, p.y, Math.max(0.4, p.size*p.life), 0, 6.2832); fxCtx.fill();
  }
  fxCtx.globalAlpha = 1; fxCtx.globalCompositeOperation = 'source-over';
  for (let i = confetti.length-1; i >= 0; i--) {
    const c = confetti[i]; c.vy = Math.min(c.vy+0.02, 3.2); c.y += c.vy; c.phase += c.sway; c.x += Math.sin(c.phase)*0.9+c.drift; c.rot += c.spin;
    if (c.y > H+40) { confetti.splice(i, 1); continue; }
    fxCtx.save(); fxCtx.translate(c.x, c.y); fxCtx.rotate(c.rot);
    fxCtx.fillStyle = `hsl(${c.hue},90%,65%)`; fxCtx.globalAlpha = 0.9; fxCtx.fillRect(-c.w/2, -c.h/2, c.w, c.h); fxCtx.restore();
  }
  fxCtx.globalAlpha = 1; drawStars(t); requestAnimationFrame(loop);
}

function resize() {
  W = window.innerWidth; H = window.innerHeight;
  for (const c of [bgCanvas, fxCanvas]) {
    c.width = Math.floor(W*DPR); c.height = Math.floor(H*DPR);
    c.style.width = W+'px'; c.style.height = H+'px';
  }
  bgCtx.setTransform(DPR,0,0,DPR,0,0); fxCtx.setTransform(DPR,0,0,DPR,0,0);
  fxCtx.clearRect(0, 0, W, H); initStars();
}
window.addEventListener('resize', resize);
window.addEventListener('pointerdown', (e) => firework(e.clientX, e.clientY));

// --- LOGIKA AMPLOP & LAGU ---
const bgMusic = document.getElementById('bg-music');
const landingPage = document.getElementById('landing-page');
const mainApp = document.getElementById('main-app');
let isPlaying = false;

landingPage.addEventListener('click', () => {
  // Play music
  bgMusic.play().then(() => {
    isPlaying = true;
    musicBtn.textContent = 'Lagu 🔇';
  }).catch(e => console.log("Audio play failed:", e));

  // Animasi buka amplop
  landingPage.classList.add('open');

  // Transisi cepat ke Main App
  setTimeout(() => {
    landingPage.classList.add('fade-out');
    mainApp.classList.add('show');
    
    // Trigger ledakan pembuka
    setTimeout(() => { firework(W*0.3, H*0.28, 330); firework(W*0.72, H*0.22, 45); }, 300);
  }, 400);
});

// --- LOGIKA UTAMA ---
const petImg = document.getElementById('pet-img');
const cakeEl = document.getElementById('cake');
const wishEl = document.getElementById('wish');
const btnEl = document.getElementById('btn');
const btnCacan = document.getElementById('btn-cacan');
const btnMocca = document.getElementById('btn-mocca');
const musicBtn = document.getElementById('music-btn');

let blown = false;
let typingInterval;

function typeText(el, text, speed) {
  clearInterval(typingInterval);
  let i = 0; el.textContent = ''; el.classList.add('typing'); el.classList.remove('final');
  typingInterval = setInterval(() => {
    el.textContent = text.slice(0, ++i);
    if (i >= text.length) { clearInterval(typingInterval); el.classList.remove('typing'); }
  }, speed);
}

function switchTheme(theme) {
  currentTheme = theme;
  
  // 1. Reset Visual (Lilin & Tombol)
  blown = false;
  cakeEl.classList.remove('out');
  btnEl.disabled = false;
  btnEl.textContent = 'Tiup Lilinnya 🕯️';
  
  // 2. Ubah Gambar & Alt
  petImg.style.opacity = 0;
  setTimeout(() => {
    petImg.src = greetings[theme].img;
    petImg.alt = greetings[theme].alt;
    if (theme === 'mocca') {
      petImg.classList.add('mocca-mode');
    } else {
      petImg.classList.remove('mocca-mode');
    }
    petImg.style.opacity = 1;
  }, 200);
  
  // 3. Ketik Ulang Teks
  typeText(wishEl, greetings[theme].w1, 35);
  
  // 4. Update Tombol Header
  if (theme === 'cacan') {
    btnCacan.classList.add('active');
    btnMocca.classList.remove('active');
  } else {
    btnMocca.classList.add('active');
    btnCacan.classList.remove('active');
  }
}

// Inisialisasi awal
switchTheme('cacan');

// Event Listener Header
btnCacan.addEventListener('click', () => switchTheme('cacan'));
btnMocca.addEventListener('click', () => switchTheme('mocca'));

// Toggle Musik
musicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  isPlaying = !isPlaying;
  musicBtn.textContent = isPlaying ? 'Lagu 🔇' : 'Lagu';
  if (isPlaying) {
    bgMusic.play();
  } else {
    bgMusic.pause();
  }
});

// Event Listener Tiup Lilin
btnEl.addEventListener('click', () => {
  if (btnEl.disabled) return;
  if (!blown) {
    blown = true; btnEl.disabled = true; cakeEl.classList.add('out');
    setTimeout(() => {
      let n = 0;
      const volley = setInterval(() => { firework(W*0.12+Math.random()*W*0.76, H*0.10+Math.random()*H*0.45); if (++n >= 9) clearInterval(volley); }, 280);
      dropConfetti(MOBILE ? 70 : 140);
      let waves = 0;
      const confettiTimer = setInterval(() => { dropConfetti(MOBILE ? 18 : 35); if (++waves >= 4) clearInterval(confettiTimer); }, 1500);
    }, 350);
    
    setTimeout(() => {
      typeText(wishEl, greetings[currentTheme].w2, 35);
      wishEl.classList.add('final');
      btnEl.textContent = 'Rayakan Lagi 🎆'; btnEl.disabled = false;
    }, 1400);
  } else {
    let n = 0;
    const volley = setInterval(() => { firework(W*0.1+Math.random()*W*0.8, H*0.1+Math.random()*H*0.5); if (++n >= 6) clearInterval(volley); }, 220);
    dropConfetti(MOBILE ? 50 : 90);
  }
});

resize(); 
requestAnimationFrame(loop);
