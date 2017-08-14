const { ipcRenderer } = require('electron');
const buttons = Array.from(document.querySelectorAll('[data-command]'));

function onAction(event) {
  const command = event.currentTarget.dataset.command;

  ipcRenderer.send('show:event:trigger', command);
}

buttons.forEach(element => element.addEventListener('click', onAction));

ipcRenderer.on('interface:log', (event, arg) => { console.log(arg); });
