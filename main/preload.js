const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('electronAPI', {
  openPDF: (path) => ipcRenderer.send('open-pdf', path)
})