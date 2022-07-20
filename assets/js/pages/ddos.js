const saveDdosButton = document.querySelector("#saveDdos");
const processingDdosButton = document.querySelector('#processingDdos');
const approveDdosServiceSwitch = document.querySelector("#approveDdosService");
const trafficScaleRangeInput = document.querySelector("#rangeMbit");
const selectedTrafficScaleRangeValueSpan = document.querySelector("#selectedMbitRangeValue");

contractAbi = JSON.parse(fs.readFileSync(path.join(__dirname, 'contract-abi.json'), 'utf-8'));


webContents.on("did-finish-load", async() => {
    await getDDos();
});

const showRangeValue = (newValue) => {
    selectedTrafficScaleRangeValueSpan.innerHTML = `${newValue} mbit`;
}

async function saveDDos(isApprove, trafficScale, callback) {

    saveDdosButton.classList.add("d-none");
    processingDdosButton.classList.remove("d-none");

    setTimeout(async() => {
        const datsContract = await contract(contractAbi, contractAddress);
        await datsContract.saveDDos(isApprove, trafficScale);
        callback(saveDdosButton, processingDdosButton);
    }, 0);
}

async function getDDos() {

    setTimeout(async() => {
        const datsContract = await contract(contractAbi, contractAddress);
        const ddosData = await datsContract.getDDos();
        if (ddosData) {
            approveDdosServiceSwitch.checked = ddosData.isApprove;
            trafficScaleRangeInput.value = ddosData.trafficScale;
            showRangeValue(trafficScaleRangeInput.value);
        }
    }, 1000);

}

saveDdosButton.addEventListener('click', async() => {

    await saveDDos(approveDdosServiceSwitch.checked, trafficScaleRangeInput.value, (saveBtn, processingBtn) => {
        savedSuccessNotify();
        saveBtn.classList.remove("d-none");
        processingBtn.classList.add("d-none");
    });


    //checkNotifications();
});