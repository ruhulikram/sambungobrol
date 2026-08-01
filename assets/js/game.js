document.addEventListener('DOMContentLoaded', () => {
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const SCREEN_MOTION_MS = 180;
  const LETTER_OUT_MS = 120;

  const startScreen = document.getElementById('start-screen');
  const gameScreen = document.getElementById('game-screen');
  const endScreen = document.getElementById('end-screen');
  const screens = [startScreen, gameScreen, endScreen];

  const btnStart = document.getElementById('btn-start');
  const btnNext = document.getElementById('btn-next');
  const btnRestart = document.getElementById('btn-restart');
  const btnHome = document.getElementById('btn-home');
  const btnCancelExit = document.getElementById('btn-cancel-exit');
  const btnConfirmExit = document.getElementById('btn-confirm-exit');

  const letterEl = document.getElementById('current-letter');
  const progressBar = document.getElementById('progress-bar');
  const progressTrack = document.querySelector('.progress-track');
  const progressText = document.getElementById('progress-text');
  const exitDialog = document.getElementById('exit-dialog');

  let currentIndex = 0;
  let isAnimating = false;
  let touchStartX = 0;
  let touchStartY = 0;

  function showScreen(nextScreen) {
    const currentScreen = screens.find((screen) => screen.classList.contains('active'));

    if (!currentScreen || currentScreen === nextScreen) return;

    currentScreen.classList.remove('active');
    currentScreen.classList.add('leaving');

    window.setTimeout(() => {
      currentScreen.classList.remove('leaving');
      nextScreen.classList.add('active');

      const firstButton = nextScreen.querySelector('button');
      if (firstButton) firstButton.focus({ preventScroll: true });
    }, SCREEN_MOTION_MS);
  }

  function setProgress() {
    const step = currentIndex + 1;
    const percentage = (step / ALPHABET.length) * 100;
    const isLastLetter = currentIndex === ALPHABET.length - 1;

    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `Huruf ${step} dari ${ALPHABET.length}`;
    progressTrack.setAttribute('aria-valuenow', String(step));

    btnNext.textContent = isLastLetter
      ? 'Selesaikan permainan'
      : 'Huruf berikutnya';
    btnNext.classList.toggle('is-finish', isLastLetter);
  }

  function resetGame() {
    currentIndex = 0;
    letterEl.textContent = ALPHABET[currentIndex];
    letterEl.classList.remove('letter-in', 'letter-out');
    setProgress();
  }

  function changeLetter() {
    if (isAnimating) return;
    isAnimating = true;
    letterEl.classList.remove('letter-in');
    letterEl.classList.add('letter-out');

    window.setTimeout(() => {
      letterEl.textContent = ALPHABET[currentIndex];
      letterEl.classList.remove('letter-out');
      letterEl.classList.add('letter-in');
      setProgress();
      isAnimating = false;
    }, LETTER_OUT_MS);
  }

  function startGame() {
    resetGame();
    showScreen(gameScreen);
  }

  function nextTurn() {
    if (isAnimating) return;

    if (currentIndex === ALPHABET.length - 1) {
      showScreen(endScreen);
      return;
    }

    currentIndex += 1;
    changeLetter();
  }

  function openExitDialog() {
    exitDialog.hidden = false;
    document.body.style.overflow = 'hidden';
    btnCancelExit.focus();
  }

  function closeExitDialog() {
    exitDialog.hidden = true;
    document.body.style.overflow = '';
    btnHome.focus();
  }

  function confirmExit() {
    exitDialog.hidden = true;
    document.body.style.overflow = '';
    resetGame();
    showScreen(startScreen);
  }

  btnStart.addEventListener('click', startGame);
  btnNext.addEventListener('click', nextTurn);
  btnRestart.addEventListener('click', startGame);
  btnHome.addEventListener('click', openExitDialog);
  btnCancelExit.addEventListener('click', closeExitDialog);
  btnConfirmExit.addEventListener('click', confirmExit);

  exitDialog.addEventListener('click', (event) => {
    if (event.target === exitDialog) closeExitDialog();
  });

  document.addEventListener('keydown', (event) => {
    if (!exitDialog.hidden) {
      if (event.key === 'Escape') closeExitDialog();
      return;
    }

    if (!gameScreen.classList.contains('active')) return;

    if (event.code === 'Space' || event.code === 'ArrowRight') {
      event.preventDefault();
      nextTurn();
    }

    if (event.key === 'Escape') openExitDialog();
  });

  gameScreen.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  gameScreen.addEventListener('touchend', (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 1.5;

    if (isHorizontalSwipe && deltaX < -60) nextTurn();
  }, { passive: true });

  setProgress();
});
