let currentPage = 1;
const entriesPerPage = 10;
let totalEntries = 0;

async function loadEntries() {
  try {
    const entries = await window.electronAPI.getEntries();
    totalEntries = entries.length;
    displayEntries(entries);
    updatePagination();
  } catch (error) {
    alert('Eroare la încărcarea intrărilor');
  }
}

function displayEntries(entries) {
  const entriesList = document.getElementById('entriesList');
  entriesList.innerHTML = '';
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const pageEntries = entries.slice(startIndex, endIndex);

  pageEntries.forEach(entry => {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry';
    entryDiv.innerHTML = `
      <h3>${entry.title}</h3>
      <p>${entry.content}</p>
    `;
    entriesList.appendChild(entryDiv);
  });
}

function updatePagination() {
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  document.getElementById('currentPage').textContent = `Pagina ${currentPage} din ${totalPages}`;
  document.getElementById('prevPage').disabled = currentPage === 1;
  document.getElementById('nextPage').disabled = currentPage === totalPages;
}

document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadEntries();
  }
});

document.getElementById('nextPage').addEventListener('click', () => {
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    loadEntries();
  }
});

document.addEventListener('DOMContentLoaded', loadEntries);