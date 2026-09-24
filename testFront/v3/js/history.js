// history.js
// Логика поиска и фильтрации страницы History.

const historySearch = document.getElementById('historySearch');
const rows = [...document.querySelectorAll('#historyTable tbody tr')];

function filterRows() {
    const query = historySearch?.value.toLowerCase().trim() || '';
    const activeFilter =
        document.querySelector('.filter.active')?.textContent
            .trim()
            .toLowerCase() || 'all';

    rows.forEach((row) => {
        const rowText = row.textContent.toLowerCase();

        const matchesText = rowText.includes(query);
        const matchesStatus =
            activeFilter === 'all' || rowText.includes(activeFilter);

        row.style.display = matchesText && matchesStatus ? '' : 'none';
    });
}

historySearch?.addEventListener('input', filterRows);

document.querySelectorAll('.filter').forEach((filter) => {
    filter.addEventListener('click', () => {
        document.querySelectorAll('.filter').forEach((item) => {
            item.classList.remove('active');
        });

        filter.classList.add('active');
        filterRows();
    });
});
