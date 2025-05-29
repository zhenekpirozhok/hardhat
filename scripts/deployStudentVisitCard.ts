import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with account:", deployer.address);

    const Soulbound = await ethers.getContractFactory("SoulboundVisitCardERC721");
    const soulbound = await Soulbound.deploy();

    await soulbound.waitForDeployment();
    console.log("SoulboundVisitCardERC721 deployed to: ", await soulbound.getAddress());

    const yourAddress = deployer.address;
    const tokenURI = "ipfs://bafybeic5sibu6lkd6y65uursvrjpmlql3aoyjgimrumbjpzmfltxbtruxq/student_zhenya.json";

    const tx = await soulbound.mint(yourAddress, tokenURI);
    await tx.wait();

    console.log(`Minted soulbound NFT to ${yourAddress} with tokenURI ${tokenURI}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
