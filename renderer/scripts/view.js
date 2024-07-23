let currentPage = 1;
const entriesPerPage = 5;
let totalEntries = 0;

async function loadEntries() {
  try {
    const entries = await window.electronAPI.getEntries();
    console.log("Loaded entries in visualize.js:", entries);
    totalEntries = entries.length;
    displayEntries(entries);
    updatePagination();
  } catch (error) {
    console.error("Error loading entries:", error);
    alert("Eroare la încărcarea intrărilor");
  }
}

function displayEntries(entries) {
  const entriesList = document.getElementById("entriesList");
  entriesList.innerHTML = "";
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const pageEntries = entries.slice(startIndex, endIndex);

  console.log("Displaying entries:", pageEntries);

  if (pageEntries.length === 0) {
    entriesList.innerHTML = "<p>No entries found.</p>";
    return;
  }

  pageEntries.forEach((entry) => {
    console.log("Processing entry:", entry);
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry";
    entryDiv.innerHTML = `
      <h3>${entry.title || "Untitled"}</h3>
      <p>${entry.content || "No content"}</p>
    `;
    entriesList.appendChild(entryDiv);
  });
}

function updatePagination() {
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  document.getElementById(
    "currentPage"
  ).textContent = `Pagina ${currentPage} din ${totalPages}`;
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadEntries();
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    loadEntries();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  loadEntries();
});
