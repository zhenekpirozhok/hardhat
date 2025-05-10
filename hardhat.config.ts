import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_API}`, // Сюда вставь свой API ключ от Infura
      accounts: [`0x${process.env.PRIVATE_KEY}`, `0x${process.env.PRIVATE_KEY_2}`], // Приватный ключ из MetaMask
    },
    localhost: {
      url: 'http://127.0.0.1:8545'
    }
  },
};

export default config;
