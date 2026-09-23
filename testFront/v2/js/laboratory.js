// laboratory.js
// DEMO-логика лаборатории. Пока здесь нет fetch() и API: pipeline только имитирует работу инструментов.

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
  if (label) label.textContent = state === 'running' ? 'Running' : state === 'completed' ? 'Completed' : 'Ready';
}

function appendLog(tool, message, tone = 'accent') {
  const terminal = document.getElementById('terminalOutput');
  if (!terminal) return;
  const line = document.createElement('p');
  line.innerHTML = `<span class="t-muted">[demo]</span> <span class="t-${tone}">${tool}</span> ${message}`;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

async function runPipeline() {
  const target = targetInput.value.trim() || 'demo.lab.local';
  const start = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  sessionTarget.textContent = target; overviewTarget.textContent = target; sessionStarted.textContent = start;
  sessionStatus.textContent = 'Running'; pipelineState.textContent = 'Running'; pipelineState.className = 'badge badge-orange';
  notify(`Research run started for ${target}`);

  const sequence = [
    ['subfinder', 900, 'normalized 12 domains'],
    ['httpx', 850, 'confirmed 7 live hosts'],
    ['ffuf', 1000, 'discovered 19 response-bearing endpoints'],
    ['nuclei', 1050, 'produced 3 findings for review']
  ];

  for (const [tool, delay, message] of sequence) {
    toolCards.forEach(card => card.classList.remove('running'));
    setToolState(tool, 'running'); appendLog(tool, message.replace(/\d+ /, '… '));
    await new Promise(resolve => setTimeout(resolve, delay));
    setToolState(tool, 'completed');
    const last = document.getElementById('terminalOutput')?.lastElementChild;
    if (last) last.innerHTML = last.innerHTML.replace('…', message.match(/^\S+/)?.[0] || 'result');
  }

  sessionStatus.textContent = 'Completed'; pipelineState.textContent = 'Completed'; pipelineState.className = 'badge badge-green';
  sessionDuration.textContent = '3.8s (demo)'; objectsTotal.textContent = '41';
  appendLog('run', 'completed — evidence stored', 'green'); notify('Research run completed');
}

document.getElementById('runPipelineBtn')?.addEventListener('click', runPipeline);
document.getElementById('clearRunBtn')?.addEventListener('click', () => {
  targetInput.value = 'demo.lab.local'; sessionStatus.textContent = 'Ready to run'; sessionStarted.textContent = '—'; sessionDuration.textContent = '—';
  pipelineState.textContent = 'Ready'; pipelineState.className = 'badge badge-outline';
  toolCards.forEach(card => { card.classList.remove('running', 'completed'); const state=card.querySelector('.tool-state'); if(state) state.textContent='Ready'; });
  notify('Lab session reset');
});

document.querySelectorAll('[data-result-tab]').forEach(tab => tab.addEventListener('click', () => {
  const target = tab.dataset.resultTab;
  document.querySelectorAll('[data-result-tab]').forEach(t => t.classList.toggle('active', t === tab));
  document.querySelectorAll('.result-view').forEach(view => view.classList.toggle('active', view.id === `result-${target}`));
}));
