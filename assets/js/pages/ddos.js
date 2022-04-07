const saveDdosButton = document.querySelector("#saveDdos");
const approveDdosServiceSwitch = document.querySelector("#approveDdosService");
const trafficScaleRangeInput = document.querySelector("#rangeMbit");
const selectedTrafficScaleRangeValueSpan = document.querySelector("#selectedMbitRangeValue");


webContents.on("dom-ready", () => {
    loadData();
    showRangeValue(trafficScaleRangeInput.value);
});

const showRangeValue = (newValue) => {
    selectedTrafficScaleRangeValueSpan.innerHTML = `${newValue} mbit`;
}

const loadData = () => {
    if (localStorage.getItem("ddos")) {
        let ddosData = JSON.parse(localStorage.ddos);
        approveDdosServiceSwitch.checked = ddosData.approveDdosService;
        trafficScaleRangeInput.value = ddosData.trafficScale;
    }
}

saveDdosButton.addEventListener('click', () => {

    const DDos = {
        approveDdosService: approveDdosServiceSwitch.checked,
        trafficScale: parseFloat(trafficScaleRangeInput.value)
    }

    localStorage.removeItem("ddos");
    localStorage.setItem("ddos", JSON.stringify(DDos));

    localStorage.notificationCount ? localStorage["notificationCount"] = parseInt(localStorage["notificationCount"]) + 1 : localStorage.setItem("notificationCount", 1);
    alertCountSpan.innerHTML = localStorage["notificationCount"];

    if (!alertCountSpan.classList.contains("alert-count")) {
        alertCountSpan.classList.add("alert-count");
    }

    savedSuccessNotify();
    checkNotifications();
});