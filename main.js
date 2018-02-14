const {app, BrowserWindow} = require('electron')
const path = require('path');
const url = require('url');

require('dotenv').config();

require('electron-reload')(__dirname);

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1270,
        height: 840,
        backgroundColor: '#FFF',
        webPreferences: {
            webSecurity: false
        }
    });

    if (process.env.PACKAGE === 'true'){
        win.loadURL(`file://${__dirname}/dist/index.html`);
    } else {
        win.loadURL(process.env.HOST);
        //win.loadURL(`file://${__dirname}/dist/index.html`);
        win.webContents.openDevTools();
    }

    win.on('close', function () {
      win.removeAllListeners();
    })

    win.on('closed', function () {
        win = null;
    })

}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
