import { expect } from "chai";
import { ethers } from "hardhat";

describe("SoulboundVisitCardERC721", function () {
  let Soulbound, soulbound, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    Soulbound = await ethers.getContractFactory("SoulboundVisitCardERC721");
    soulbound = await Soulbound.deploy();
    await soulbound.deployed();
  });

  it("Should deploy and have correct name and symbol", async function () {
    expect(await soulbound.name()).to.equal("StudentVisitCard");
    expect(await soulbound.symbol()).to.equal("SVC");
  });

  it("Owner can mint one NFT", async function () {
    const tokenURI = "ipfs://exampleCID/metadata.json";
    await expect(soulbound.connect(owner).mint(addr1.address, tokenURI))
      .to.emit(soulbound, "Transfer")
      .withArgs(ethers.constants.AddressZero, addr1.address, 1);

    expect(await soulbound.tokenURI(1)).to.equal(tokenURI);
  });

  it("Non-owner cannot mint", async function () {
    const tokenURI = "ipfs://exampleCID/metadata.json";
    await expect(
      soulbound.connect(addr1).mint(addr1.address, tokenURI)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Token is soulbound - transfers should fail", async function () {
    const tokenURI = "ipfs://exampleCID/metadata.json";
    await soulbound.mint(addr1.address, tokenURI);

    await expect(
      soulbound.connect(addr1).transferFrom(addr1.address, owner.address, 1)
    ).to.be.revertedWith("Soulbound: token is non-transferable");
  });

  it("Approvals are disabled", async function () {
    await soulbound.mint(addr1.address, "ipfs://exampleCID/metadata.json");

    await expect(
      soulbound.connect(addr1).approve(owner.address, 1)
    ).to.be.revertedWith("Soulbound: approve disabled");

    await expect(
      soulbound.connect(addr1).setApprovalForAll(owner.address, true)
    ).to.be.revertedWith("Soulbound: setApprovalForAll disabled");
  });
});
