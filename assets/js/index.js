const electron = require('electron');
const { ipcRenderer } = electron;
const remote = require("@electron/remote");
const axios = require("axios");
const authService = remote.require("./services/auth-service");
const authProcess = remote.require("./main/auth-process");

const webContents = remote.getCurrentWebContents();

const alertCountSpan = document.querySelector("#spanAlertCount");
const notificationListDiv = document.querySelector("#divNotificationList");
const notificationMessageH = document.querySelector("#hNotificationMessage");
const notificationMessageDetailP = document.querySelector("#pNotificationMessageDetail");
const connectToMetamaskButton = document.querySelector("#connectToMetamask");
const connectedProfileDiv = document.querySelector("#connectedProfile");
const accountAddressText = document.querySelector("#accountAddress");

/*

let metaMaskButton = document.querySelector('#metaMaskButton');
metaMaskButton.addEventListener("click", () => {

    let message = {
        "wallet": localStorage.walletAddress,
        "ddos": localStorage.ddos ? JSON.parse(localStorage.ddos) : null,
        "cyber": localStorage.cyber ? JSON.parse(localStorage.cyber) : null,
        "super": localStorage.super ? JSON.parse(localStorage.super) : null,
        "vulnerability": localStorage.vulnerability ? JSON.parse(localStorage.vulnerability) : null,
        "blockchain": localStorage.blockchain ? JSON.parse(localStorage.blockchain) : null
    };

    let buff = new Buffer(JSON.stringify(message));
    let base64message = buff.toString('base64');

    ipcRenderer.send("signatureRequest", base64message);

});

*/




webContents.on("dom-ready", () => {
    /*
    console.log('"' + JSON.stringify(data) + '" converted to Base64 is "' + base64data + '"');

    let decoded = new Buffer(base64data, 'base64');
    console.log(decoded.toString());
    
    

    const profile = authService.getProfile();
    //console.log(profile);
    document.getElementById("picture").src = profile.picture;
    document.getElementById("fullname").innerText = profile.name;
    !!document.getElementById("profilePicture") ? document.getElementById("profilePicture").src = profile.picture : false;
    !!document.getElementById("profileFullname") ? document.getElementById("profileFullname").innerText = profile.name : false;
    !!document.getElementById("txtFullname") ? document.getElementById("txtFullname").value = profile.name : false;
    !!document.getElementById("txtEmail") ? document.getElementById("txtEmail").value = profile.email : false;
*/


    connectToMetamaskButton.click();
    //checkMetamaskConnection(account);
    checkNotifications();

});

document.getElementById("logout").addEventListener("click", async() => {
    // authProcess.createLogoutWindow();
    await disconnect();
    remote.getCurrentWindow().reload();
});


connectToMetamaskButton.addEventListener('click', async() => {
    let connectedAccount = await connectWC();
    console.log("Connected Account: ", connectedAccount);
    checkMetamaskConnection(connectedAccount);
});

function checkMetamaskConnection(acc) {
    if (localStorage.walletconnect == undefined) {
        connectToMetamaskButton.classList.remove("d-none");
        connectedProfileDiv.classList.add("d-none");
    } else {
        !!acc ? accountAddressText.innerHTML = `${acc.substring(0,10)}..........${acc.slice(-10)}` : false;
        connectToMetamaskButton.classList.add("d-none");
        connectedProfileDiv.classList.remove("d-none");
    }
}


function getUserMetadata(id) {
    console.log(authService.getAccessToken());

    axios.get(`https://${authService.getDomain()}/api/v2/users/${id}`, {
            headers: {
                Authorization: `Bearer ${authService.getAccessToken()}`,
            },
        })
        .then((response) => {
            console.log(response.data.user_metadata);
        })
        .catch((error) => {
            if (error) throw new Error(error);
        });
}

function checkNotifications() {
    if (localStorage.notificationCount > 0) {
        alertCountSpan.classList.add("alert-count");
        alertCountSpan.innerHTML = 1;
        notificationListDiv.classList.remove("invisible");
        notificationMessageH.innerHTML = "İmzalanacak verileriniz var.";
        //document.querySelector("#divNotificationList>.dropdown-item").href = "./pages/signature.html";
        notificationMessageDetailP.innerHTML = ""; //`${localStorage.notificationCount} mesaj.`;
    } else {
        alertCountSpan.classList.remove("alert-count");
        notificationListDiv.classList.add("invisible");
    }
}

function savedSuccessNotify() {
    Lobibox.notify('success', {
        pauseDelayOnHover: true,
        size: 'mini',
        rounded: true,
        icon: 'bx bx-check-circle',
        delayIndicator: false,
        continueDelayOnInactiveTab: false,
        position: 'top right',
        msg: 'Saved successfully.'
    });
}