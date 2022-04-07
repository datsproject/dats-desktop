let account;

// https://docs.walletconnect.com/quick-start/dapps/web3-provider
let provider = new WalletConnectProvider.default({
    rpc: {
        43113: "https://api.avax-test.network/ext/bc/C/rpc", // https://ethereumnodes.com/
        //137: "https://polygon-rpc.com/", // https://docs.polygon.technology/docs/develop/network-details/network/
        // ...

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
        return await w3.eth.personal.sign(msg, account)
    } else {
        return false
    }
}

const signTypedData = async(msgPrm) => {

    const msgParams = [{
            type: 'string',
            name: 'Message',
            value: 'Hi, Alice!'
        },
        {
            type: 'uint32',
            name: 'A number',
            value: '1337'
        }
    ]

    var from = web3.eth.accounts[0]
    if (!from) return connect()

    /*  web3.eth.signTypedData not yet implemented!!!
     *  We're going to have to assemble the tx manually!
     *  This is what it would probably look like, though:
      web3.eth.signTypedData(msg, from) function (err, result) {
        if (err) return console.error(err)
        console.log('PERSONAL SIGNED:' + result)
      })
    */

    console.log('CLICKED, SENDING PERSONAL SIGN REQ')
    var params = [msgParams, from]
    console.dir(params)
    var method = 'eth_signTypedData'

    web3.currentProvider.sendAsync({
        method,
        params,
        from,
    }, function(err, result) {
        if (err) return console.dir(err)
        if (result.error) {
            alert(result.error.message)
        }
        if (result.error) return console.error(result)
        console.log('PERSONAL SIGNED:' + JSON.stringify(result.result))

        const recovered = sigUtil.recoverTypedSignatureLegacy({ data: msgParams, sig: result.result })

        if (ethUtil.toChecksumAddress(recovered) === ethUtil.toChecksumAddress(from)) {
            alert('Successfully ecRecovered signer as ' + from)
        } else {
            alert('Failed to verify signer when comparing ' + result + ' to ' + from)
        }

    })

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
    account = undefined;
}

provider.on("disconnect", (code, reason) => {
    console.log(code, reason);
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