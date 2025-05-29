import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x792ff9Af7dc8293e21dEBB9dF58e4B1f56F77F46";
  const tokenId = 1;

  const [deployer, student] = await ethers.getSigners();

  const contract = await ethers.getContractAt("SoulboundVisitCardERC721", contractAddress);

  console.log(`✅ Contract loaded at: ${contractAddress}`);

  // Check ownerOf
  const owner = await contract.ownerOf(tokenId);
  console.log(`👤 Token ${tokenId} is owned by: ${owner}`);

  // Check tokenURI
  const uri = await contract.tokenURI(tokenId);
  console.log(`🧾 tokenURI(${tokenId}) = ${uri}`);

  // Try to transfer token — should fail
  console.log("🔁 Trying to transfer token from student back to deployer...");

  try {
    const tx = await contract.connect(student).transferFrom(
      student.address,
      deployer.address,
      tokenId
    );
    await tx.wait();
    console.error("❌ Transfer unexpectedly succeeded!");
  } catch (err: any) {
    console.log("✅ Transfer reverted as expected:");
    console.log(`   ↳ ${err.message}`);
  }
}

main().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exitCode = 1;
});
