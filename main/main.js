const { app, BrowserWindow, ipcMain, shell }= require("electron/main");
const path = require("node:path");
const fs = require('fs');
let mainWindow;

app.commandLine.appendSwitch('ignore-certificate-errors')
app.commandLine.appendSwitch('ignore-gpu-blacklist')
app.commandLine.appendSwitch('disable-gpu')
app.commandLine.appendSwitch('disable-software-rasterizer')

function createWindow() {
   mainWindow = new BrowserWindow({

    width: 1280, // Starting width
    height: 720, // Starting height

    minWidth:1280, // Minimum width
    minHeight:720, // Minimum height

    maxWidth:1600, // Maximum width
    maxHeight:900, // Maximum height

    darkTheme: true, // Forces dark theme on windows
    fullscreenable: false, // Disallows fullscreen

    center: true, // Display the window in the center of the screen
    thickFrame: false, // Disable thick frame of window - Windows

    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Specify preload file
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false
    },
  });

  mainWindow.loadFile("renderer/pages/index.html"); // Load the html file
  mainWindow.removeMenu(); // Remove the default menu
}

/* 

  When electron is initalized then we create the window and
  handle macOS specific window functionality so the window
  can open as expected

*/

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  
});


/*

  Handle IPC functions

*/
ipcMain.on('open-pdf', (event, pdfPath) => {
  const fullPath = path.join(__dirname, '..', pdfPath)
  shell.openPath(fullPath)
})

ipcMain.on('toggle-dev-tools', () => {
  if (mainWindow.webContents.isDevToolsOpened()) {
    mainWindow.webContents.closeDevTools()
  } else {
    mainWindow.webContents.openDevTools()
  }
})



/*

  Close all windows if the user is not on macOS

*/

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
