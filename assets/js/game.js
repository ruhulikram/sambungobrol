/**
 * game.js — Ngobrol Abjad Game Logic
 * @description Handles game state, animations, swipe gesture, key control, and confetti trigger.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ─── DOM Elements ─────────────────────────────────────────────
  const startScreen = document.getElementById('start-screen');
  const gameScreen  = document.getElementById('game-screen');
  const endScreen   = document.getElementById('end-screen');

  const btnStart    = document.getElementById('btn-start');
  const btnNext     = document.getElementById('btn-next');
  const btnRestart  = document.getElementById('btn-restart');
  const btnHome     = document.getElementById('btn-home');

  const letterEl    = document.getElementById('current-letter');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const gameContainer = document.getElementById('game-container');

  // ─── Game Constants / State ──────────────────────────────────
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let currentIndex = 0;

  // ─── Screen Navigation ────────────────────────────────────────
  function goTo(incoming, outgoing) {
    if (outgoing) {
      outgoing.classList.remove('active');
      outgoing.style.display = 'none';
    }
    incoming.style.display = 'flex';
    // Small delay to trigger CSS transition correctly
    setTimeout(() => {
      incoming.classList.add('active');
    }, 20);
  }

  // ─── Update UI state ──────────────────────────────────────────
  function updateUI() {
    // Letter switch animation (fade-out, text change, fade-in)
    letterEl.classList.add('changing');

    setTimeout(() => {
      letterEl.textContent = ALPHABET[currentIndex];
      letterEl.classList.remove('changing');
    }, 150);

    // Progress updates
    const currentStep = currentIndex + 1;
    const progressPct = (currentStep / ALPHABET.length) * 100;
    progressBar.style.width = `${progressPct}%`;
    progressText.textContent = `${currentStep}/${ALPHABET.length}`;

    // Done button at the last letter (Z)
    const isLast = currentIndex === ALPHABET.length - 1;
    if (isLast) {
      btnNext.innerHTML = `
        <span>SELESAI ✓</span>
      `;
      btnNext.classList.add('btn-finish');
    } else {
      btnNext.innerHTML = `
        <span>SELANJUTNYA</span>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      `;
      btnNext.classList.remove('btn-finish');
    }
  }

  // ─── Container physical press pop effect ─────────────────────
  function triggerContainerPop() {
    gameContainer.style.transform = 'scale(0.975)';
    setTimeout(() => {
      gameContainer.style.transform = 'scale(1)';
    }, 100);
  }

  // ─── Game Lifecycle ───────────────────────────────────────────
  function startGame() {
    currentIndex = 0;
    letterEl.textContent = ALPHABET[0];
    progressBar.style.width = `${(1 / ALPHABET.length) * 100}%`;
    progressText.textContent = `1/${ALPHABET.length}`;
    btnNext.classList.remove('btn-finish');
    goTo(gameScreen, startScreen);
  }

  // ─── Confetti Generator (Pure CSS fallback) ──────────────────
  function spawnConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;
    container.innerHTML = '';

    const colors = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f43f5e'];

    for (let i = 0; i < 12; i++) {
      const piece = document.createElement('div');
      piece.classList.add('confetti-piece');
      piece.style.left = `${Math.random() * 90 + 5}%`;
      piece.style.animationDelay = `${(Math.random() * 0.6).toFixed(2)}s`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      const size = Math.floor(Math.random() * 6 + 6);
      piece.style.width = `${size}px`;
      piece.style.height = `${size}px`;
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      
      container.appendChild(piece);
    }
  }

  // ─── Event Handlers ───────────────────────────────────────────
  btnStart.addEventListener('click', startGame);

  btnHome.addEventListener('click', () => {
    goTo(startScreen, gameScreen);
  });

  btnNext.addEventListener('click', () => {
    triggerContainerPop();

    if (currentIndex < ALPHABET.length - 1) {
      currentIndex++;
      updateUI();
    } else {
      goTo(endScreen, gameScreen);
      spawnConfetti();
    }
  });

  btnRestart.addEventListener('click', () => {
    startGame();
    goTo(gameScreen, endScreen);
  });

  // ─── Desktop keyboard bindings ────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (gameScreen.classList.contains('active')) {
      if (e.code === 'Space' || e.code === 'ArrowRight') {
        e.preventDefault();
        btnNext.click();
      }
      if (e.code === 'Escape') {
        btnHome.click();
      }
    }
  });

  // ─── Touch horizontal swipe gesture ───────────────────────────
  let startX = 0;
  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (!gameScreen.classList.contains('active')) return;
    const deltaX = e.changedTouches[0].clientX - startX;
    
    // Swipe left to trigger Next
    if (deltaX < -60) {
      btnNext.click();
    }
  }, { passive: true });

});
