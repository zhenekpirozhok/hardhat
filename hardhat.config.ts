import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`, // Сюда вставь свой API ключ от Infura
      accounts: [`0x${process.env.PRIVATE_KEY}`],  // Приватный ключ из MetaMask
    },
  },
};

export default config;
