const path = require("path");
const fs = require("fs");

const saveDdosButton = document.querySelector("#saveDdos");
const processingDdosBtn = document.querySelector('#processingDdos');
const approveDdosServiceSwitch = document.querySelector("#approveDdosService");
const trafficScaleRangeInput = document.querySelector("#rangeMbit");
const selectedTrafficScaleRangeValueSpan = document.querySelector("#selectedMbitRangeValue");

abi = JSON.parse(fs.readFileSync(path.join(__dirname, 'contract-abi.json'), 'utf-8'));


webContents.on("did-finish-load", async() => {
    await getDDos();
});

const showRangeValue = (newValue) => {
    selectedTrafficScaleRangeValueSpan.innerHTML = `${newValue} mbit`;
}

async function saveDDos(isApprove, trafficScale, callback) {

    saveDdosButton.classList.add("d-none");
    processingDdosBtn.classList.remove("d-none");

    setTimeout(async() => {
        const datsContract = await contract(abi, address);
        await datsContract.methods.saveDDos(isApprove, trafficScale).send({ from: account });
        callback(saveDdosButton, processingDdosBtn);
    }, 0);
}

async function getDDos() {

    const datsContract = await contract(abi, address);
    const ddosData = await datsContract.methods.getDDos().call({ from: account });
    if (ddosData) {
        approveDdosServiceSwitch.checked = ddosData.isApprove;
        trafficScaleRangeInput.value = ddosData.trafficScale;
        showRangeValue(trafficScaleRangeInput.value);
    }

}

saveDdosButton.addEventListener('click', async() => {

    await saveDDos(approveDdosServiceSwitch.checked, trafficScaleRangeInput.value, (saveBtn, processingBtn) => {
        savedSuccessNotify();
        saveBtn.classList.remove("d-none");
        processingBtn.classList.add("d-none");
    });


    //checkNotifications();
});