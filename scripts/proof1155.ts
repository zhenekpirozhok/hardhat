import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x6D7c23F26899c164adF634325Bde293E43F6F9fE"; 
  const tokenIds = [0, 1]; 
  const tokenAmounts = [1, 1]; 

  const [deployer, student] = await ethers.getSigners();
  const contract = await ethers.getContractAt("GameCharacterCollectionERC1155", contractAddress);

  console.log(`✅ ERC-1155 Contract loaded at: ${contractAddress}`);

  console.log("🛠 Minting test tokens to deployer...");
  const mintTx = await contract.mintCharacters(deployer.address, tokenIds, tokenAmounts);
  await mintTx.wait();
  console.log("✅ Tokens minted to deployer");

  for (const id of tokenIds) {
    const bal = await contract.balanceOf(deployer.address, id);
    console.log(`📦 Deployer balance of token ${id}: ${bal}`);
  }

  // Show URI
  for (const id of tokenIds) {
    const uri = await contract.uri(id);
    console.log(`🔗 URI of token ${id}: ${uri}`);
  }

  // Perform batch transfer to student
  console.log(`🔁 Transferring tokens to student (${student.address})...`);
  const tx = await contract.batchTransferCharacters(deployer.address, student.address, tokenIds, tokenAmounts);
  await tx.wait();
  console.log("✅ Transfer complete");

  // Check student balances
  for (const id of tokenIds) {
    const bal = await contract.balanceOf(student.address, id);
    console.log(`🎒 Student balance of token ${id}: ${bal}`);
  }
}

main().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exitCode = 1;
});
