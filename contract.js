// this is a basic readonly contract interaction file

// this loads the web3 dependency
const Web3 = require("web3")

// this sets up my .env file
require('dotenv').config()

// let's load our environment variables
infuraToken = process.env.INFURA_TOKEN
contractAddress = process.env.CONTRACT_ADDRESS
ownerAddress = process.env.OWNER_ADDRESS

// set up a RPC (remote procedure call) to connect to an ethereum node
const rpcURL = "https://ropsten.infura.io/v3/0eac4561934f4c18a577f61092b30774";

// instantiate web3 with this URL
const web3 = new Web3(rpcURL);

console.log("connected to web3");

// get the ABI (interface) for our contract
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

// specify our contract address 
const address = contractAddress;

// instantiate a contract object
const contract = new web3.eth.Contract(abi, address);

console.log("connected to contract on ropsten");


// specify our owner address
const owner = ownerAddress;

// run some of the methods in our contract (using javascript)

const getTotalSupply = async() => {
    let totSupply = await contract.methods.totalSupply().call();
    return totSupply;
}

const getName = async() => {
    let name = await contract.methods.name().call();
    return name
}

const getBalanceOfAccount = async(account) => {
    let bal = await contract.methods.balanceOf(owner).call();
    return bal;
}

const getDecimals = async() => {
    let decimals = await contract.methods.decimals().call();
    return decimals;
}

const getSymbol = async() => {
    let symbol = await contract.methods.symbol().call();
    return symbol;
}

const returnAllValues = async() => {
    console.log(await getTotalSupply());
    console.log(await getSymbol());
    console.log(await getName());
    console.log(await getDecimals());
    console.log(await getBalanceOfAccount(owner));
}

//returnAllValues();
//console.log("hello world?");

module.exports = { getSymbol, getDecimals, getBalanceOfAccount, getName }



