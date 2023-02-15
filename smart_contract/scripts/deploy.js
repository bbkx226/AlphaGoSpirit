// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat"); 
// Javascript without type: "module" will require this kind of method to import library, and obviously we are using hardhat

const main = async () => {
  
  // async/await is kind of like the code will only execute after the `promises` are returned
  // Why we need it? It's because Javascript is a synchronous single-threaded language
  // So async/await allows programmer to write asynchronous code in a more synchronous way

  // A function call in the Ethers.js library used  to create a contract factory object that can be used to deploy, interact with, and manage a smart contract on the Ethereum blockchain.
  // The argument "Transactions" is the name of the Solidity contract to be compiled and deployed.
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  
  console.log('Deploying Box...');

  // Once the contract factory object is created, it can be used to deploy the smart contract to the Ethereum blockchain by calling `deploy()`
  const transactions = await Transactions.deploy();

  // waits for the deployment of a smart contract to the blockchain network.
  await transactions.deployed();

  console.log( // convenient during the debugging session, telling the user/programmer the contract has been deployed to which wallet (via address)
    `Transactions deployed to ${transactions.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const runMain = async () => {
  try { // Run the code and see if all functions have been execute successfully
    await main();
    process.exit(0);

  } catch (error) { // If not, the program jumped to this section and execute console.log() to reveal the bug & error

    console.error(error);
    process.exit(1);

  }
}

runMain();