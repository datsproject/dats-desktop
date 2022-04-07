const saveBlockchainButton = document.querySelector('#saveBlockchain');
const approveAttackPreventionSwitch = document.querySelector('#switchApproveAttackPrevention');


webContents.on("dom-ready", () => {
    loadData();
});


const loadData = () => {
    if (localStorage.getItem("blockchain")) {
        let blockchainData = JSON.parse(localStorage.blockchain);
        approveAttackPreventionSwitch.checked = blockchainData.approveAttackPrevention;
    }
}

saveBlockchainButton.addEventListener('click', () => {

    const Blockchain = {
        approveAttackPrevention: approveAttackPreventionSwitch.checked
    };

    localStorage.removeItem("blockchain");
    localStorage.setItem("blockchain", JSON.stringify(Blockchain));

    localStorage.notificationCount ? localStorage["notificationCount"] = parseInt(localStorage["notificationCount"]) + 1 : localStorage.setItem("notificationCount", 1);
    alertCountSpan.innerHTML = localStorage["notificationCount"];

    if (!alertCountSpan.classList.contains("alert-count")) {
        alertCountSpan.classList.add("alert-count");
    }

    savedSuccessNotify();
    checkNotifications();
});