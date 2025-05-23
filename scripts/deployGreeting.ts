import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Greeting = await ethers.getContractFactory("Greeting");

  const greeting = await Greeting.deploy("Zhenya");

  await greeting.waitForDeployment();

  console.log("Greeting contract deployed to:", await greeting.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
