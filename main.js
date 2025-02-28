import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { getPartners, createPartner, updatePartner, deletePartner } from './server';

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadFile('index.html');
  mainWindow.on('closed', () => (mainWindow = null));
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
ipcMain.handle('get-partners', async () => {
  return await getPartners();
});
ipcMain.handle('create-partner', async (event, partner) => {
  return await createPartner(partner);
});
ipcMain.handle('update-partner', async (event, partner) => {
  return await updatePartner(partner);
});
ipcMain.handle('delete-partner', async (event, id) => {
  return await deletePartner(id);
});
