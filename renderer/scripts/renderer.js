function navigateTo(page) {
  window.location.href = page;
}
function openPDF(pdfPath) {
  window.electronAPI.openPDF(pdfPath);
}

function toggleDevTools() {
  window.electronAPI.toggleDevTools();
}

function openLink(url) {
  window.electronAPI.openLink(url);
}
