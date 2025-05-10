import { ethers } from "hardhat";

async function main() {
  const proxyAddress = "0x71dfE3BcF0aE68f48753ee1680Ae4C813bE7889d"; 
  const token = await ethers.getContractAt("ZhekaCoinV1", proxyAddress);

  const [owner, user1] = await ethers.getSigners();

  console.log("👤 Owner:", owner.address);
  console.log("👤 User1:", user1.address);

  const mintAmount = ethers.parseEther("100");
  const tx1 = await token.mint(owner.address, mintAmount);
  await tx1.wait();
  console.log(`✅ Minted ${mintAmount} to ${owner.address}`);

  const tx2 = await token.transfer(user1.address, ethers.parseEther("50"));
  await tx2.wait();
  console.log(`🔁 Transferred 50 tokens to ${user1.address}`);

  const ownerBalance = await token.balanceOf(owner.address);
  const user1Balance = await token.balanceOf(user1.address);

  console.log(`💰 Owner balance: ${ethers.formatEther(ownerBalance)} ZHK`);
  console.log(`💰 User1 balance: ${ethers.formatEther(user1Balance)} ZHK`);
}

main().catch(console.error);
