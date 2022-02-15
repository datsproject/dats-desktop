const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let win = null;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        },
        autoHideMenuBar: true
    })


    win.loadFile(path.join(__dirname + '/pages/register.html'));


}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

    ipcMain.on("key", (err, data) => {
        require('electron').shell.openExternal('http://localhost:9011/');
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})