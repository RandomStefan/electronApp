let currentEntries = [];

async function loadEntries() {
  try {
    currentEntries = await window.electronAPI.getEntries();
    const entriesSelect = document.getElementById('entrySelect');
    entriesSelect.innerHTML = '';
    currentEntries.forEach(entry => {
      const option = document.createElement('option');
      option.value = entry.id;
      option.textContent = entry.title;
      entriesSelect.appendChild(option);
    });
    if (currentEntries.length > 0) {
      loadEntryDetails(currentEntries[0].id);
    }
  } catch (error) {
    alert('Eroare la încărcarea intrărilor');
  }
}

function loadEntryDetails(id) {
  const entry = currentEntries.find(e => e.id === parseInt(id));
  if (entry) {
    document.getElementById('title').value = entry.title;
    document.getElementById('content').value = entry.content;
  }
}

document.getElementById('entrySelect').addEventListener('change', (e) => {
  loadEntryDetails(e.target.value);
});

document.getElementById('modifyForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('entrySelect').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  try {
    await window.electronAPI.updateEntry(id, { title, content });
    alert('Intrare actualizată cu succes');
    loadEntries();
  } catch (error) {
    alert('Eroare la actualizarea intrării');
  }
});

document.getElementById('deleteButton').addEventListener('click', async () => {
  const id = document.getElementById('entrySelect').value;
  if (confirm('Sigur doriți să ștergeți această intrare?')) {
    try {
      await window.electronAPI.deleteEntry(id);
      alert('Intrare ștearsă cu succes');
      loadEntries();
    } catch (error) {
      alert('Eroare la ștergerea intrării');
    }
  }
});

document.addEventListener('DOMContentLoaded', loadEntries);