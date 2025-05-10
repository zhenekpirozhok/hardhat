import { ethers } from "hardhat";

async function main() {
  const proxyAddress = "0x71dfE3BcF0aE68f48753ee1680Ae4C813bE7889d";
  const token = await ethers.getContractAt("ZhekaCoinV2", proxyAddress);

  const [owner, user1] = await ethers.getSigners();

  console.log("🔎 Owner address:", owner.address);
  console.log("🔎 User1 address:", user1.address);

  console.log("\n📍 === BALANCES BEFORE ===");
  const ownerBalanceBefore = await token.balanceOf(owner.address);
  const user1BalanceBefore = await token.balanceOf(user1.address);

  console.log("💰 Owner balance:", ethers.formatEther(ownerBalanceBefore), "ZHK");
  console.log("💰 User1 balance:", ethers.formatEther(user1BalanceBefore), "ZHK");

  console.log("\n🔍 Calling version() from proxy...");
  const version = await token.version();
  console.log("🆕 Current version:", version);

  console.log("\n🛠 Minting 10 tokens to User1...");
  const mintTx = await token.connect(owner).mint(user1.address, ethers.parseEther("10"));
  await mintTx.wait();
  console.log("✅ Mint successful");

  console.log("\n🔁 Transferring 5 tokens from User1 to Owner...");
  const transferTx = await token.connect(user1).transfer(owner.address, ethers.parseEther("5"));
  await transferTx.wait();
  console.log("✅ Transfer successful");

  console.log("\n📍 === BALANCES AFTER ===");
  const ownerBalanceAfter = await token.balanceOf(owner.address);
  const user1BalanceAfter = await token.balanceOf(user1.address);

  console.log("📊 Final Owner balance:", ethers.formatEther(ownerBalanceAfter), "ZHK");
  console.log("📊 Final User1 balance:", ethers.formatEther(user1BalanceAfter), "ZHK");
}

main().catch(console.error);
