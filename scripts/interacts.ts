import { ethers } from "hardhat";
import { Greeting } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners(); // Получаем деплойера для аутентификации

  const greetingAddress = "0xe773371ad30919F0DDb33Fba67C04d3de556ea5a"; // Адрес контракта (замени на свой адрес контракта)

  const greeting = (await ethers.getContractAt(
    "Greeting",
    greetingAddress
  )) as Greeting;

  const message = await greeting.greet();
  console.log("Greeting message:", message);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
