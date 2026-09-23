// main.js
// Общая логика всех страниц. Здесь НЕ запускаются security-инструменты.

const toast = document.getElementById('toast');
const toastText = document.getElementById('toastText');
let toastTimer;

function notify(message) {
  if (!toast || !toastText) return;
  toastText.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-navigate]');
  if (!trigger) return;
  window.location.href = trigger.dataset.navigate;
});

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    window.location.href = 'laboratory.html';
  }
});
