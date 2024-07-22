const { contextBridge, ipcRenderer, shell } = require('electron');


contextBridge.exposeInMainWorld('electronAPI', {
  openPDF: (path) => ipcRenderer.send('open-pdf', path),
  toggleDevTools: () => ipcRenderer.send('toggle-dev-tools'),
  openLink: (url) => ipcRenderer.send('open-link', url),
  addEntry: (entry) => ipcRenderer.invoke('add-entry', entry),
  getEntries: () => ipcRenderer.invoke('get-entries'),
  updateEntry: (id, entry) => ipcRenderer.invoke('update-entry', id, entry),
  deleteEntry: (id) => ipcRenderer.invoke('delete-entry', id)
})


