const path = require("path");
const fs = require("fs");

const saveCyberButton = document.querySelector("#saveCyber");
const processingCyberButton = document.querySelector("#processingCyber");
const approveCyberSecurityResearchSwitch = document.querySelector("#switchApproveCyberSecurityResearch");
const webSecurityCheckbox = document.querySelector("#chkWebSecurity");
const serverSecurityCheckbox = document.querySelector("#chkServerSecurity");
const ransomwareResearchCheckbox = document.querySelector("#chkRansomwareResearch");
const malwareResearchCheckbox = document.querySelector("#chkMalwareResearch");

abi = JSON.parse(fs.readFileSync(path.join(__dirname, 'contract-abi.json'), 'utf-8'));


webContents.on("did-finish-load", async() => {
    await getCyber();
});


async function saveCyber(isApprove, webSecurity, serverSecurity, ransomwareResearch, malwareResearch, callback) {

    saveCyberButton.classList.add("d-none");
    processingCyberButton.classList.remove("d-none");

    setTimeout(async() => {
        const datsContract = await contract(abi, address);
        await datsContract.methods.saveCyberSecurity(isApprove, webSecurity, serverSecurity, ransomwareResearch, malwareResearch).send({ from: account });
        callback(saveCyberButton, processingCyberButton);
    }, 0);
}

async function getCyber() {

    setTimeout(async() => {
        const datsContract = await contract(abi, address);
        const cyberData = await datsContract.methods.getCyberSecurity().call({ from: account });
        if (cyberData) {
            approveCyberSecurityResearchSwitch.checked = cyberData.isApprove;
            webSecurityCheckbox.checked = cyberData.webSecurity;
            serverSecurityCheckbox.checked = cyberData.serverSecurity;
            ransomwareResearchCheckbox.checked = cyberData.ransomwareResearch;
            malwareResearchCheckbox.checked = cyberData.malwareResearch;
        }
    }, 1000);

}

saveCyberButton.addEventListener('click', async() => {

    await saveCyber(
        approveCyberSecurityResearchSwitch.checked,
        webSecurityCheckbox.checked,
        serverSecurityCheckbox.checked,
        ransomwareResearchCheckbox.checked,
        malwareResearchCheckbox.checked, (saveBtn, processingBtn) => {
            savedSuccessNotify();
            saveBtn.classList.remove("d-none");
            processingBtn.classList.add("d-none");
        });
});