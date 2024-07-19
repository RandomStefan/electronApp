const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('electronAPI', {
  openPDF: (path) => ipcRenderer.send('open-pdf', path),
  toggleDevTools: () => ipcRenderer.send('toggle-dev-tools')
})