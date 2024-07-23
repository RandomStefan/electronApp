const { app, BrowserWindow, ipcMain, shell } = require("electron/main");
const path = require("node:path");
const fs = require("fs");
const { sequelize, Entry } = require("./database");
let mainWindow;

app.commandLine.appendSwitch("ignore-certificate-errors");
app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendSwitch("disable-software-rasterizer");

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280, // Starting width
    height: 720, // Starting height

    minWidth: 1280, // Minimum width
    minHeight: 720, // Minimum height

    maxWidth: 1600, // Maximum width
    maxHeight: 900, // Maximum height

    darkTheme: true, // Forces dark theme on windows
    fullscreenable: false, // Disallows fullscreen

    center: true, // Display the window in the center of the screen
    thickFrame: false, // Disable thick frame of window - Windows

    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Specify preload file
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
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

app.whenReady().then(async () => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  try {
    const testEntry = await Entry.create({
      title: "Test Title",
      content: "Test Content",
    });
    console.log("Test entry created:", testEntry.toJSON());

    const entries = await Entry.findAll();
    console.log(
      "All entries:",
      entries.map((e) => e.toJSON())
    );
  } catch (error) {
    console.error("Error testing database:", error);
  }
});

/*

  Handle IPC functions

*/
ipcMain.on("open-pdf", (event, pdfPath) => {
  const fullPath = path.join(__dirname, "..", pdfPath);
  shell.openPath(fullPath);
});

ipcMain.on("toggle-dev-tools", () => {
  if (mainWindow.webContents.isDevToolsOpened()) {
    mainWindow.webContents.closeDevTools();
  } else {
    mainWindow.webContents.openDevTools();
  }
});

ipcMain.on("open-link", (event, url) => {
  shell.openExternal(url);
});

ipcMain.handle("add-entry", async (event, entry) => {
  try {
    console.log("Received entry to add:", entry);
    const newEntry = await Entry.create(entry);
    console.log("New entry created:", newEntry.toJSON());
    return newEntry.toJSON();
  } catch (error) {
    console.error("Error adding entry:", error);
    throw error;
  }
});

ipcMain.handle('get-entries', async () => {
  try {
    const entries = await Entry.findAll();
    console.log('Retrieved entries in main process:', entries.map(e => e.toJSON()));
    return entries.map(e => e.toJSON());
  } catch (error) {
    console.error('Error getting entries:', error);
    throw error;
  }
});

ipcMain.handle("update-entry", async (event, id, updatedEntry) => {
  try {
    const entry = await Entry.findByPk(id);
    if (entry) {
      await entry.update(updatedEntry);
      return entry;
    }
    throw new Error("Entry not found");
  } catch (error) {
    console.error("Error updating entry:", error);
    throw error;
  }
});

ipcMain.handle("delete-entry", async (event, id) => {
  try {
    const entry = await Entry.findByPk(id);
    if (entry) {
      await entry.destroy();
      return true;
    }
    throw new Error("Entry not found");
  } catch (error) {
    console.error("Error deleting entry:", error);
    throw error;
  }
});

/*

  Close all windows if the user is not on macOS

*/

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
