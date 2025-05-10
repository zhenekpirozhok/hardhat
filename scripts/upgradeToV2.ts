import { ethers, upgrades } from "hardhat";

async function main() {
  const proxyAddress = "0x71dfE3BcF0aE68f48753ee1680Ae4C813bE7889d";

  const ZhekaCoinV2 = await ethers.getContractFactory("ZhekaCoinV2");
  await upgrades.upgradeProxy(proxyAddress, ZhekaCoinV2);

  console.log("✅ Proxy successfully upgraded to V2");

  const upgraded = await ethers.getContractAt("ZhekaCoinV2", proxyAddress);
  const version = await upgraded.version();

  console.log("🔎 Current version:", version);
}

main().catch(console.error);
