import { ethers } from "hardhat";

async function main() {
  // Define the list of owners 
  const owners = [
    "0x1cb851699C32DAD6c6C95616EF69e34a4EeF2F34",
    "0x3C9C2404849960140fBA3ae550429ccE521f1f9A"
  ]

  // Set required number of confirmations
  const requiredConfirmations = 2;

  // Deploy the contract
  const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
  const wallet = await MultiSigWallet.deploy(owners, requiredConfirmations);
  await wallet.waitForDeployment();

  const walletAddress = await wallet.getAddress();
  console.log("✅ MultiSigWallet deployed at:", walletAddress);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
