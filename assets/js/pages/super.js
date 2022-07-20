const saveSuperCompuerButton = document.querySelector("#saveSuperComputer");
const processingSuperComputerBtn = document.querySelector('#processingSuperComputer');
const approveSuperComputerSwitch = document.querySelector("#approveSuperComputer");
const cpuValueRangeInput = document.querySelector("#rangeCpu");
const selectedCpuRangeValueSpan = document.querySelector("#selectedCpuRangeValue");

contractAbi = JSON.parse(fs.readFileSync(path.join(__dirname, 'contract-abi.json'), 'utf-8'));

webContents.on("did-finish-load", async() => {
    await getSuperComputer();
});

const showRangeValue = (newValue) => {
    selectedCpuRangeValueSpan.innerHTML = `${newValue} core`;
}

async function saveSuperComputer(isApprove, cpuValue, callback) {

    saveSuperCompuerButton.classList.add("d-none");
    processingSuperComputerBtn.classList.remove("d-none");

    setTimeout(async() => {
        const datsContract = await contract(contractAbi, contractAddress);
        await datsContract.saveSuperComputer(isApprove, cpuValue);
        callback(saveSuperCompuerButton, processingSuperComputerBtn);
    }, 0);
}

async function getSuperComputer() {

    setTimeout(async() => {
        const datsContract = await contract(contractAbi, contractAddress);
        const superComputerData = await datsContract.getSuperComputer();
        if (superComputerData) {
            approveSuperComputerSwitch.checked = superComputerData.isApprove;
            cpuValueRangeInput.value = superComputerData.cpuValue;
            showRangeValue(cpuValueRangeInput.value);
        }
    }, 1000);
}

saveSuperCompuerButton.addEventListener('click', async() => {

    await saveSuperComputer(approveSuperComputerSwitch.checked, cpuValueRangeInput.value, (saveBtn, processingBtn) => {
        savedSuccessNotify();
        saveBtn.classList.remove("d-none");
        processingBtn.classList.add("d-none");
    });

    /*
    const SuperComputer = {
        approveSuperComputer: approveSuperComputerSwitch.checked,
        cpuValue: parseFloat(cpuValueRangeInput.value)
    };

    localStorage.removeItem("super");
    localStorage.setItem("super", JSON.stringify(SuperComputer));

    localStorage.notificationCount ? localStorage["notificationCount"] = parseInt(localStorage["notificationCount"]) + 1 : localStorage.setItem("notificationCount", 1);
    alertCountSpan.innerHTML = localStorage["notificationCount"];

    if (!alertCountSpan.classList.contains("alert-count")) {
        alertCountSpan.classList.add("alert-count");
    }
    */

    //savedSuccessNotify();
    //checkNotifications();
});