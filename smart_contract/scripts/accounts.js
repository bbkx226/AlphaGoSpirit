const hre = require("hardhat"); 


const main = async () => {
    // List out all the available accounts
    const accounts = await ethers.provider.listAccounts();
    console.log(accounts);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  const runMain = async () => {
    try { // Run the code and see if all functions have been execute successfully
      await main()
      process.exit(0);
  
    } catch (error) { // If not, the program jumped to this section and execute console.log() to reveal the bug & error
  
      console.error(error);
      process.exit(1);
  
    }
  }
  
runMain();
