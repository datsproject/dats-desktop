const path = require("path");
const fs = require("fs");

const saveCyberButton = document.querySelector("#saveCyber");
const approveCyberSecurityResearchSwitch = document.querySelector("#switchApproveCyberSecurityResearch");
const webSecurityCheckbox = document.querySelector("#chkWebSecurity");
const serverSecurityCheckbox = document.querySelector("#chkServerSecurity");
const ransomwareResearchCheckbox = document.querySelector("#chkRansomwareResearch");
const malwareResearchCheckbox = document.querySelector("#chkMalwareResearch");

abi = JSON.parse(fs.readFileSync(path.join(__dirname, 'contract-abi.json'), 'utf-8'));


webContents.on("did-finish-load", () => {
    loadData();
});

const loadData = () => {
    if (localStorage.getItem("cyber")) {
        let cyberData = JSON.parse(localStorage.cyber);
        approveCyberSecurityResearchSwitch.checked = cyberData.approveCyberSecurityResearch;
        webSecurityCheckbox.checked = cyberData.webSecurity;
        serverSecurityCheckbox.checked = cyberData.serverSecurity;
        ransomwareResearchCheckbox.checked = cyberData.ransomwareResearch;
        malwareResearchCheckbox.checked = cyberData.malwareResearch;
    }
}


saveCyberButton.addEventListener('click', () => {
    const Cyber = {
        approveCyberSecurityResearch: approveCyberSecurityResearchSwitch.checked,
        webSecurity: webSecurityCheckbox.checked,
        serverSecurity: serverSecurityCheckbox.checked,
        ransomwareResearch: ransomwareResearchCheckbox.checked,
        malwareResearch: malwareResearchCheckbox.checked
    }

    localStorage.removeItem("cyber");
    localStorage.setItem("cyber", JSON.stringify(Cyber));

    localStorage.notificationCount ? localStorage["notificationCount"] = parseInt(localStorage["notificationCount"]) + 1 : localStorage.setItem("notificationCount", 1);
    alertCountSpan.innerHTML = localStorage["notificationCount"];

    if (!alertCountSpan.classList.contains("alert-count")) {
        alertCountSpan.classList.add("alert-count");
    }

    savedSuccessNotify();
    checkNotifications();
});