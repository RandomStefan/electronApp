// Import the required 'shell' module from Electron
const { shell } = require('electron');

// Add an event listener to the external link
document.addEventListener('DOMContentLoaded', () => {
  const externalLink = document.getElementById('external-link');

  externalLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default action
    const url = externalLink.href;
    shell.openExternal(url); // Open the URL in the default browser
  });
});