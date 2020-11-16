const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const ffmpeg = require('fluent-ffmpeg');

let mainWindow;

app.on('ready', () => {
    console.log("Your app is ready and running");
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('videoData', (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        console.log(metadata.format.duration);
        mainWindow.webContents.send('sendData', metadata.format.duration);
    })
});