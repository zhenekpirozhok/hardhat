import { ethers } from "hardhat";

async function main() {
  const ZhekaCoinV2 = await ethers.getContractFactory("ZhekaCoinV2");
  const logic = await ZhekaCoinV2.deploy();

  await logic.waitForDeployment();
  const logicAddress = await logic.getAddress();

  console.log("✅ ZhekaCoinV2 implementation deployed at:", logicAddress);
}

main().catch(console.error);
