document.getElementById('addForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    try {
        console.log(title, content);
      await window.electronAPI.addEntry({ title, content });
      alert('Intrare adăugată cu succes');
      // Clear form fields
      document.getElementById('title').value = '';
      document.getElementById('content').value = '';
    } catch (error) {
      alert('Eroare la adăugarea intrării');
    }
  });