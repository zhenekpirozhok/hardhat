import { ethers } from "hardhat";

async function main() {
  const baseURI = "ipfs://bafybeiffbhpv6k6bnlzeffg6px7hkwr5q4wgrrz5kzgwwmu2k3squuhrjq/";

  const GameCharacter = await ethers.getContractFactory("GameCharacterCollectionERC1155");
  const gameCharacter = await GameCharacter.deploy(baseURI);

  await gameCharacter.waitForDeployment();

  console.log("✅ GameCharacterCollectionERC1155 deployed to:", await gameCharacter.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
