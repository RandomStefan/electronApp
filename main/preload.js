const { contextBridge, ipcRenderer, shell } = require('electron');


contextBridge.exposeInMainWorld('electronAPI', {
  openPDF: (path) => ipcRenderer.send('open-pdf', path),
  toggleDevTools: () => ipcRenderer.send('toggle-dev-tools'),
  openLink: (url) => ipcRenderer.send('open-link', url)
})


