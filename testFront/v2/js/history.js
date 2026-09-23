// history.js
const historySearch = document.getElementById('historySearch');
const rows = [...document.querySelectorAll('#historyTable tbody tr')];

function filterRows() {
  const q = historySearch?.value.toLowerCase().trim() || '';
  const active = document.querySelector('.filter.active')?.textContent.trim().toLowerCase() || 'all';
  rows.forEach(row => {
    const matchesText = row.textContent.toLowerCase().includes(q);
    const matchesStatus = active === 'all' || row.textContent.toLowerCase().includes(active);
    row.style.display = matchesText && matchesStatus ? '' : 'none';
  });
}

historySearch?.addEventListener('input', filterRows);
document.querySelectorAll('.filter').forEach(filter => filter.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
  filter.classList.add('active'); filterRows();
}));
