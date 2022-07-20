const { ethers } = require('ethers');
const path = require("path");
const fs = require("fs");
require('dotenv').config();

const contractAddress = process.env.CONTRACT_ADDRESS;
//const contractAbi = JSON.parse(fs.readFileSync(path.join(__dirname, 'contract-abi.json'), 'utf-8'));
let contractAbi = null;

//const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

let provider = new WalletConnectProvider.default({
    rpc: {
        43113: process.env.RPC_URL,
        //65535: "http://144.91.97.243:9650/ext/bc/FnTgpjfC8HiCCZu35MCjRxT7oN6yjGHvvGJ3GaENMHxG2tJzL/rpc",

    },
});

// const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const web3Provider = new ethers.providers.Web3Provider(provider);
const signer = web3Provider.getSigner();
//const contract = new ethers.Contract(contractAddress, contractAbi, signer);



const connectWC = async() => {
    await provider.enable();

    window.w3 = web3Provider;

    var accounts = await web3Provider.listAccounts(); // get all connected accounts
    account = accounts[0]; // get the primary account

    return account;
}

const contract = async(contractAbi, contractAddress) => {
    if (w3) {
        return new ethers.Contract(contractAddress, contractAbi, signer);
    } else {
        return false;
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