import { upgrades, ethers } from "hardhat";

async function main(): Promise<void> {
  const ZhekaCoin = await ethers.getContractFactory("ZhekaCoinV1");
  const initialSupply = ethers.parseEther("1000000");

  const proxy = await upgrades.deployProxy(ZhekaCoin, [initialSupply], {
    initializer: "initialize",
  });

  await proxy.waitForDeployment();

  const proxyAddress = await proxy.getAddress();
  console.log("ZhekaCoin Proxy deployed to:", proxyAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
