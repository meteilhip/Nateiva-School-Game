const fs = require('fs');

let html = fs.readFileSync('edukids.html', 'utf8');

// 1. Add Canvas Confetti
const confettiCSS = `
    #confettiCanvas {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 9999;
    }
`;
html = html.replace('</style>', confettiCSS + '\n  </style>');
html = html.replace('<body>', '<body>\n  <canvas id="confettiCanvas"></canvas>');

// 2. Add Parent Portal Button
const parentCSS = `
    .parent-lock {
      position: fixed; bottom: 20px; right: 20px;
      background: rgba(0,0,0,0.1); width: 44px; height: 44px;
      border-radius: 22px; display: flex; justify-content: center; align-items: center;
      font-size: 1.5rem; cursor: pointer; z-index: 100;
      transition: background 0.2s;
    }
    .parent-lock:hover { background: rgba(0,0,0,0.2); }
    
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); z-index: 1000; display: none;
      justify-content: center; align-items: center;
    }
    .modal-overlay.active { display: flex; }
    .modal-content {
      background: white; padding: 24px; border-radius: 20px; width: 90%; max-width: 400px;
      text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    .modal-input { width: 100%; padding: 12px; margin: 10px 0; border-radius: 10px; border: 2px solid #ccc; font-size: 1.2rem; text-align: center; }
`;
html = html.replace('</style>', parentCSS + '\n  </style>');

const parentHTML = `
  <div class="parent-lock" onclick="openParentModal()">🔒</div>
  <div class="modal-overlay" id="parentModal">
    <div class="modal-content">
      <h2>Parent Portal 👨‍👩‍👧</h2>
      <p style="margin-top:10px; color:#666;">Pour accéder, résolvez : <strong style="color:var(--primary)">12 × 12 = ?</strong></p>
      <input type="number" id="pinInput" class="modal-input" placeholder="Réponse / Answer" />
      <button class="btn-action" onclick="verifyPin()">Déverrouiller / Unlock</button>
      <button class="btn-action outline" onclick="closeParentModal()">Fermer / Close</button>
      
      <div id="parentDashboard" style="display:none; margin-top:20px; border-top: 2px solid #eee; padding-top:20px;">
        <h3>📊 Statistiques / Stats</h3>
        <p style="margin: 10px 0;">Total Points: <strong id="pdScore">0</strong> ⭐</p>
        <p style="margin: 10px 0;">Leçons complétées: <strong id="pdLessons">0</strong></p>
        <button class="btn-action" style="background:var(--danger)" onclick="hardReset()">Effacer les données / Wipe Data</button>
      </div>
    </div>
  </div>
`;
html = html.replace('<div class="app-shell">', parentHTML + '\n  <div class="app-shell">');

// 3. Add JS Logic for Confetti, Sound FX, Parent Dashboard
const newJS = `
    // --- SOUND FX SYNTHESIS ---
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playTone(freq, type, duration, vol=0.1) {
      if (!appState.soundOn) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(vol, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    }
    function playCorrectSFX() {
      playTone(600, 'sine', 0.1, 0.2);
      setTimeout(() => playTone(800, 'sine', 0.2, 0.2), 100);
    }
    function playWrongSFX() {
      playTone(300, 'sawtooth', 0.3, 0.2);
      setTimeout(() => playTone(200, 'sawtooth', 0.4, 0.2), 150);
    }
    function playWinSFX() {
      [400, 500, 600, 800, 1000].forEach((freq, i) => {
        setTimeout(() => playTone(freq, 'square', 0.1, 0.1), i * 100);
      });
    }

    // --- CONFETTI ENGINE ---
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    function fireConfetti() {
      for(let i=0; i<100; i++) {
        particles.push({
          x: canvas.width/2, y: canvas.height/2,
          r: Math.random()*6+2,
          dx: Math.random()*10-5, dy: Math.random()*-10-5,
          color: 'hsl('+Math.random()*360+', 100%, 50%)'
        });
      }
      requestAnimationFrame(renderConfetti);
    }
    function renderConfetti() {
      if(particles.length === 0) return;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach((p, i) => {
        p.x += p.dx; p.y += p.dy; p.dy += 0.3; // gravity
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fillStyle = p.color; ctx.fill();
        if(p.y > canvas.height) particles.splice(i, 1);
      });
      requestAnimationFrame(renderConfetti);
    }

    // --- PARENT DASHBOARD ---
    function openParentModal() { document.getElementById('parentModal').classList.add('active'); }
    function closeParentModal() { document.getElementById('parentModal').classList.remove('active'); document.getElementById('pinInput').value=''; document.getElementById('parentDashboard').style.display='none'; }
    function verifyPin() {
      if(document.getElementById('pinInput').value === '144') {
        document.getElementById('parentDashboard').style.display='block';
        document.getElementById('pdScore').innerText = appState.score;
        document.getElementById('pdLessons').innerText = localStorage.getItem('edukids_lessons') || '0';
      } else { alert('Code incorrect / Incorrect PIN'); }
    }
    function hardReset() {
      if(confirm('Are you sure? This deletes all progress.')) {
        localStorage.clear(); appState.score = 0; refreshUI(); closeParentModal();
      }
    }
`;

html = html.replace('// --- LOCAL CURRICULUM DATA', newJS + '\n    // --- LOCAL CURRICULUM DATA');

// Update feedback to include sounds
html = html.replace("button.classList.add('correct');", "button.classList.add('correct');\n        if(audioCtx.state === 'suspended') audioCtx.resume();\n        playCorrectSFX();");
html = html.replace("button.classList.add('incorrect');", "button.classList.add('incorrect');\n        if(audioCtx.state === 'suspended') audioCtx.resume();\n        playWrongSFX();");
html = html.replace("const won = appState.lives > 0;", "const won = appState.lives > 0;\n      if(won) { if(audioCtx.state === 'suspended') audioCtx.resume(); playWinSFX(); fireConfetti(); let l = parseInt(localStorage.getItem('edukids_lessons')||'0')+1; localStorage.setItem('edukids_lessons', l); }");

fs.writeFileSync('edukids.html', html);
