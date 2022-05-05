//const sigUtil = require('eth-sig-util');

let account;

// https://docs.walletconnect.com/quick-start/dapps/web3-provider
let provider = new WalletConnectProvider.default({
    rpc: {
        43113: "https://api.avax-test.network/ext/bc/C/rpc",

    },
    // bridge: 'https://bridge.walletconnect.org',
});


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


const address = "0x4b4f8ca8fb3e66b5ddafcebfe86312cec486dae1"
let abi = [{
    "inputs": [],
    "name": "count",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "increment",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}]