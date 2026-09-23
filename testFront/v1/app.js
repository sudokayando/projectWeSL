const pages = [...document.querySelectorAll('.page')];
const navLinks = [...document.querySelectorAll('.nav-link')];

function showPage(name) {
  pages.forEach(p => p.classList.toggle('active', p.id === `page-${name}`));
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.page === name));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `#${name}`);
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-page]');
  if (!trigger) return;
  event.preventDefault();
  showPage(trigger.dataset.page);
});

const initialPage = location.hash.replace('#', '');
if (['dashboard', 'lab', 'history', 'projects', 'profile'].includes(initialPage)) showPage(initialPage);

const toast = document.getElementById('toast');
const toastText = document.getElementById('toastText');
let toastTimer;
function notify(message) {
  toastText.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

const targetInput = document.getElementById('targetInput');
const pipelineState = document.getElementById('pipelineState');
const sessionStatus = document.getElementById('sessionStatus');
const sessionTarget = document.getElementById('sessionTarget');
const sessionStarted = document.getElementById('sessionStarted');
const sessionDuration = document.getElementById('sessionDuration');
const objectsTotal = document.getElementById('objectsTotal');
const overviewTarget = document.getElementById('overviewTarget');
const toolCards = [...document.querySelectorAll('.tool-card')];

function setToolState(tool, state) {
  const card = document.querySelector(`[data-tool="${tool}"]`);
  if (!card) return;
  card.classList.remove('running', 'completed');
  card.classList.add(state);
  const label = card.querySelector('.tool-state');
  label.textContent = state === 'running' ? 'Running' : state === 'completed' ? 'Completed' : 'Ready';
}

function appendLog(tool, message, tone = 'accent') {
  const terminal = document.getElementById('terminalOutput');
  const line = document.createElement('p');
  line.innerHTML = `<span class="t-muted">[demo]</span> <span class="t-${tone}">${tool}</span> ${message}`;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

async function runPipeline() {
  const target = targetInput.value.trim() || 'demo.lab.local';
  const now = new Date();
  const start = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  sessionTarget.textContent = target;
  overviewTarget.textContent = target;
  sessionStarted.textContent = start;
  sessionStatus.textContent = 'Running';
  pipelineState.textContent = 'Running';
  pipelineState.className = 'badge badge-orange';

  notify(`Research run started for ${target}`);

  const sequence = [
    ['subfinder', 900, 'normalized 12 domains'],
    ['httpx', 850, 'confirmed 7 live hosts'],
    ['ffuf', 1000, 'discovered 19 response-bearing endpoints'],
    ['nuclei', 1050, 'produced 3 findings for review']
  ];

  for (const [tool, delay, message] of sequence) {
    toolCards.forEach(card => card.classList.remove('running'));
    setToolState(tool, 'running');
    appendLog(tool, message.replace(/\d+ /, '… '));
    await new Promise(resolve => setTimeout(resolve, delay));
    setToolState(tool, 'completed');
    const last = document.getElementById('terminalOutput').lastElementChild;
    if (last) last.innerHTML = last.innerHTML.replace('…', message.match(/^\S+/)?.[0] || 'result');
  }

  sessionStatus.textContent = 'Completed';
  pipelineState.textContent = 'Completed';
  pipelineState.className = 'badge badge-green';
  sessionDuration.textContent = '3.8s (demo)';
  objectsTotal.textContent = '41';
  appendLog('run', 'completed — evidence stored', 'green');
  notify('Research run completed');
}

document.getElementById('runPipelineBtn')?.addEventListener('click', runPipeline);
document.getElementById('clearRunBtn')?.addEventListener('click', () => {
  targetInput.value = 'demo.lab.local';
  sessionStatus.textContent = 'Ready to run';
  sessionStarted.textContent = '—';
  sessionDuration.textContent = '—';
  pipelineState.textContent = 'Ready';
  pipelineState.className = 'badge badge-outline';
  toolCards.forEach(card => { card.classList.remove('running', 'completed'); card.querySelector('.tool-state').textContent = 'Ready'; });
  notify('Lab session reset');
});

// Result tabs
const resultTabs = [...document.querySelectorAll('[data-result-tab]')];
resultTabs.forEach(tab => tab.addEventListener('click', () => {
  const target = tab.dataset.resultTab;
  resultTabs.forEach(t => t.classList.toggle('active', t === tab));
  document.querySelectorAll('.result-view').forEach(view => view.classList.toggle('active', view.id === `result-${target}`));
}));

// History search
const historySearch = document.getElementById('historySearch');
historySearch?.addEventListener('input', () => {
  const q = historySearch.value.toLowerCase().trim();
  document.querySelectorAll('#historyTable tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
});

document.querySelectorAll('.filter').forEach(filter => filter.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
  filter.classList.add('active');
  const mode = filter.textContent.trim().toLowerCase();
  document.querySelectorAll('#historyTable tbody tr').forEach(row => {
    if (mode === 'all') row.style.display = '';
    else row.style.display = row.textContent.toLowerCase().includes(mode) ? '' : 'none';
  });
}));

const projectActions = [document.getElementById('newProjectBtn'), document.getElementById('newProjectBtn2')];
projectActions.forEach(btn => btn?.addEventListener('click', () => notify('Project creation form can be connected to your PHP backend here')));

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    showPage('lab');
    targetInput.focus();
  }
});
