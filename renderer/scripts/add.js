document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const statusMessage = document.getElementById('statusMessage');

  if (!title || !content) {
    alert("Please fill in both title and content.");
    return;
  }

  try {
    const newEntry = await window.electronAPI.addEntry({ title, content });
    console.log("New entry added:", newEntry);
    statusMessage.textContent = 'Intrare adăugată cu succes';
    statusMessage.style.color = 'green';
    // Clear form fields
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("title").disabled  = false;
    document.getElementById("content").disabled = false;
  } catch (error) {
    console.error("Error adding entry:", error);
    statusMessage.textContent = 'Eroare la adăugarea intrării';
    statusMessage.style.color = 'red';
  }

});
