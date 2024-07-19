function navigateTo(page) {
  window.location.href = page;
}
function openPDF(pdfPath) {
  window.electronAPI.openPDF(pdfPath)
}
