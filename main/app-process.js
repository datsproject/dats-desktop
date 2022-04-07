const { BrowserWindow } = require("electron");

const createAppWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            preload: "../preload.js"
        },
        autoHideMenuBar: true
    });

    require("@electron/remote/main").initialize();
    require("@electron/remote/main").enable(win.webContents);

    win.loadFile("./index.html");

    // win.on("closed", () => {
    //     win = null;
    // });
};

module.exports = createAppWindow;