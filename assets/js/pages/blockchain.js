const path = require("path");
const fs = require("fs");

const saveBlockchainButton = document.querySelector('#saveBlockchain');
const processingBlockchainButton = document.querySelector('#processingBlockchain');
const approveAttackPreventionSwitch = document.querySelector('#switchApproveAttackPrevention');

abi = JSON.parse(fs.readFileSync(path.join(__dirname, 'contract-abi.json'), 'utf-8'));


webContents.on("did-finish-load", async() => {
    await getBlockchain();
});

async function saveBlockchain(isApprove, callback) {

    saveBlockchainButton.classList.add("d-none");
    processingBlockchainButton.classList.remove("d-none");

    setTimeout(async() => {
        const datsContract = await contract(abi, address);
        await datsContract.methods.saveBlockchain(isApprove).send({ from: account });
        callback(saveBlockchainButton, processingBlockchainButton);
    }, 0);
}

async function getBlockchain() {

    setTimeout(async() => {
        const datsContract = await contract(abi, address);
        const blockchainData = await datsContract.methods.getBlockchain().call({ from: account });
        if (blockchainData) {
            approveAttackPreventionSwitch.checked = blockchainData.approveAttackPrevention;
        }
    }, 1000);

}

saveBlockchainButton.addEventListener('click', async() => {

    await saveBlockchain(approveAttackPreventionSwitch.checked, (saveBtn, processingBtn) => {
        savedSuccessNotify();
        saveBtn.classList.remove("d-none");
        processingBtn.classList.add("d-none");
    });
});