//const sigUtil = require('eth-sig-util');
const address = "0x178cD1937f40BC6bba82453e664fA6eD9FC2655e" // DatsContract2
const { contract_abi } = '../../services/contract-abi.json';

let account;

let abi = null;

// https://docs.walletconnect.com/quick-start/dapps/web3-provider
let provider = new WalletConnectProvider.default({
    rpc: {
        43113: "https://api.avax-test.network/ext/bc/C/rpc",

    },
    // bridge: 'https://bridge.walletconnect.org',
});


fetch('https://api.npoint.io/88101b6472674eaf2d5e')
    .then(response => response.json())
    .then(json => abi = json);


const connectWC = async() => {
    await provider.enable();

    //  Create Web3 instance
    const web3 = new Web3(provider);
    window.w3 = web3

    var accounts = await web3.eth.getAccounts(); // get all connected accounts
    account = accounts[0]; // get the primary account

    return account;
}

const sign = async(msg) => {
    if (w3) {
        return await w3.eth.sign(w3.utils.sha3(msg), account)
    } else {
        return false
    }
}

const contract = async(abi, address) => {
    if (w3) {
        return new w3.eth.Contract(abi, address)
    } else {
        return false
    }
}

const disconnect = async() => {
    // Close provider session
    await provider.disconnect()
}

provider.on("disconnect", (code, reason) => {
    console.log(code, reason);
    account = undefined;
});