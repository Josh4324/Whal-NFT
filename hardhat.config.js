require("@nomiclabs/hardhat-etherscan");
require("dotenv").config({ path: ".env" });
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-contract-sizer");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVATE_API_KEY_URL = process.env.PRIVATE_API_KEY_URL;
const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;
const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY;
const GOERLI_API_KEY_URL = process.env.GOERLI_API_KEY_URL;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const MUMBAI_API_KEY = process.env.MUMBAI_API_KEY;
const MUMBAI_API_KEY_URL = process.env.MUMBAI_API_KEY_URL;
const MUMBAI_PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.10",
  networks: {
    bsc: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: [PRIVATE_KEY],
    },
    rinkeby: {
      url: PRIVATE_API_KEY_URL,
      accounts: [PRIVATE_KEY],
    },
    ropsten: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [ROPSTEN_PRIVATE_KEY],
    },
    goerli: {
      url: GOERLI_API_KEY_URL,
      accounts: [GOERLI_PRIVATE_KEY],
    },
    mumbai: {
      url: MUMBAI_API_KEY_URL,
      accounts: [MUMBAI_PRIVATE_KEY],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    //apiKey: BSCSCAN,
    //apiKey: ETHERSCAN,
    apiKey: MUMBAI_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  mocha: {
    timeout: 10000000000,
  },
};
