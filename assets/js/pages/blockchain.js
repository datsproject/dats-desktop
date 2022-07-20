const saveBlockchainButton = document.querySelector('#saveBlockchain');
const processingBlockchainButton = document.querySelector('#processingBlockchain');
const approveAttackPreventionSwitch = document.querySelector('#switchApproveAttackPrevention');

contractAbi = JSON.parse(fs.readFileSync(path.join(__dirname, 'contract-abi.json'), 'utf-8'));


webContents.on("did-finish-load", async() => {
    await getBlockchain();
});

async function saveBlockchain(isApprove, callback) {

    saveBlockchainButton.classList.add("d-none");
    processingBlockchainButton.classList.remove("d-none");

    setTimeout(async() => {
        const datsContract = await contract(contractAbi, contractAddress);
        await datsContract.saveBlockchain(isApprove);
        callback(saveBlockchainButton, processingBlockchainButton);
    }, 0);
}

async function getBlockchain() {

    setTimeout(async() => {
        const datsContract = await contract(contractAbi, contractAddress);
        const blockchainData = await datsContract.getBlockchain();
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