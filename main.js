const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { createAuthWindow } = require("./main/auth-process");
const createAppWindow = require("./main/app-process");
const authService = require("./services/auth-service");

async function showWindow() {

    return createAppWindow();

    /*
    try {
        await authService.refreshTokens();
        return createAppWindow();
    } catch (err) {
        createAuthWindow();
    }
    */
}


app.whenReady().then(() => {
    //createWindow()
    showWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            //createWindow()
            showWindow();
        }
    });

    ipcMain.on("signatureRequest", (err, data) => {
        //require('electron').shell.openExternal(`http://localhost:9011?message=${data}`);
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})