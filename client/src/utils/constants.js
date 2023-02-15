import abi from './Transactions.json'

// What is abi?
// abi is the contract application binary interface that's the standard way
// to interact with contracts in the ethereum ecosystem both from outside
// of the blockchain and for contract to contract interactions

// P/S: The content of Transactions.json in this dir is copied from 
// ./smart_contract/artifacts/contracts/Transactions.json
export const contractAddress = '0x9b7eF0DaAba1e3F9C9e33b6B6A1E6fE17c85E50b';
export const contractABI = abi.abi;