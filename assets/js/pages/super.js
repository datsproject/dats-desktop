const saveSuperCompuerButton = document.querySelector("#saveSuperComputer");
const approveSuperComputerSwitch = document.querySelector("#approveSuperComputer");
const cpuValueRangeInput = document.querySelector("#rangeCpu");
const selectedCpuRangeValueSpan = document.querySelector("#selectedCpuRangeValue");

webContents.on("dom-ready", () => {
    loadData();
    showRangeValue(cpuValueRangeInput.value);
});

const showRangeValue = (newValue) => {
    selectedCpuRangeValueSpan.innerHTML = `${newValue} core`;
}

const loadData = () => {
    if (localStorage.getItem("super")) {
        let superData = JSON.parse(localStorage.super);
        approveSuperComputerSwitch.checked = superData.approveSuperComputer;
        cpuValueRangeInput.value = superData.cpuValue;
    }
}

saveSuperCompuerButton.addEventListener('click', () => {

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

    savedSuccessNotify();
    checkNotifications();
});