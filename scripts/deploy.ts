import { ethers } from "hardhat";

async function main() {
  const currentTime = Math.floor(Date.now() / 1000);
  const unlockTime = currentTime + 60; // через 60 секунд

  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime);

  await lock.waitForDeployment();

  console.log(`✅ Contract deployed to: ${await lock.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
