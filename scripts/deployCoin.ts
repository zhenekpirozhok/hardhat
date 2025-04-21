import { ethers } from "hardhat";
import { parseEther } from "ethers";
import { ZhekaCoin } from "../typechain-types"; // Import your contract type (adjust path if needed)

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);

  const ZhekaCoinFactory = await ethers.getContractFactory("ZhekaCoin");
  const zhekaCoin = (await ZhekaCoinFactory.deploy(
    parseEther("1000000")
  )) as ZhekaCoin;

  await zhekaCoin.waitForDeployment();

  console.log("ZhekaCoin deployed to: ", await zhekaCoin.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
