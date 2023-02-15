// Get this link from Alchemy: https://eth-goerli.g.alchemy.com/v2/lsZkJAiCHHiyPl7xr97T_hrLQEL0l6fV
// Website to get goerliETH for free: https://goerlifaucet.com/ (0.2 ETH / day)
// We will need this since during the transaction, a small amount of gas fee (ETH) will be required

require('@nomiclabs/hardhat-ethers'); // import library 

module.exports = {
  solidity: '^0.8.17', // solidity version
  networks: { // define which test net I'm using
    goerli: { // I'm using goerli because this is what they taught, and also the only testnet I could find that can request ETH for developing purpose
      url: 'https://eth-goerli.g.alchemy.com/v2/lsZkJAiCHHiyPl7xr97T_hrLQEL0l6fV',
      accounts: [ '034a401a7abbcff68619fdeb49bab67691c2fe47d0a25b513195eddadd626992' ]
    }
  }
}