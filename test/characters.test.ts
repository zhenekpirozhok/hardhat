import { expect } from "chai";
import { ethers } from "hardhat";
import { GameCharacterCollectionERC1155 } from "../typechain-types";
import { Signer } from "ethers";

describe("GameCharacterCollectionERC1155", function () {
  let gameContract: GameCharacterCollectionERC1155;
  let owner: Signer;
  let addr1: Signer;
  let ownerAddress: string;
  let addr1Address: string;

  const baseURI = "ipfs://QmExampleMetadataCID/";

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    ownerAddress = await owner.getAddress();
    addr1Address = await addr1.getAddress();

    const GameCharacter = await ethers.getContractFactory("GameCharacterCollectionERC1155");
    gameContract = (await GameCharacter.deploy(baseURI)) as GameCharacterCollectionERC1155;
    await gameContract.waitForDeployment();
  });

  it("Should deploy and have correct owner", async function () {
    expect(await gameContract.owner()).to.equal(ownerAddress);
  });

  it("Owner can set token URI", async function () {
    await gameContract.setTokenURI(0, `${baseURI}0.json`);
    expect(await gameContract.uri(0)).to.equal(`${baseURI}0.json`);
  });

  it("Non-owner cannot set token URI", async function () {
    await expect(
      gameContract.connect(addr1).setTokenURI(0, `${baseURI}0.json`)
    ).to.be.revertedWithCustomError(gameContract, "OwnableUnauthorizedAccount").withArgs(addr1Address);
  });

  it("Owner can batch mint all 10 characters", async function () {
    await gameContract.batchMintCharacters(addr1Address);
    const balance = await gameContract.balanceOf(addr1Address, 0);
    expect(balance).to.equal(1);
  });

  it("Owner can mint specific tokens in specific amounts", async function () {
    await gameContract.mintCharacters(addr1Address, [1, 2, 3], [5, 2, 1]);
    expect(await gameContract.balanceOf(addr1Address, 1)).to.equal(5);
    expect(await gameContract.balanceOf(addr1Address, 2)).to.equal(2);
    expect(await gameContract.balanceOf(addr1Address, 3)).to.equal(1);
  });

  it("Non-owner cannot mint", async function () {
    await expect(
      gameContract.connect(addr1).mintCharacters(addr1Address, [0], [1])
    ).to.be.revertedWithCustomError(gameContract, "OwnableUnauthorizedAccount").withArgs(addr1Address);
  });

  it("Owner can batch transfer tokens", async function () {
    // Mint first
    await gameContract.mintCharacters(ownerAddress, [0, 1], [2, 3]);

    // Transfer from owner to addr1
    await gameContract.batchTransferCharacters(ownerAddress, addr1Address, [0, 1], [1, 2]);

    expect(await gameContract.balanceOf(addr1Address, 0)).to.equal(1);
    expect(await gameContract.balanceOf(addr1Address, 1)).to.equal(2);
  });

  it("Should reject invalid tokenId in setTokenURI", async function () {
    await expect(
      gameContract.setTokenURI(100, "ipfs://invalid.json")
    ).to.be.revertedWith("Invalid tokenId");
  });

  it("Should reject mismatched array lengths on mint", async function () {
    await expect(
      gameContract.mintCharacters(addr1Address, [0, 1], [1])
    ).to.be.revertedWith("Length mismatch");
  });
});
