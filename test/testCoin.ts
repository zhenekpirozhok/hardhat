import { expect } from "chai";
import { ethers } from "hardhat";
import { parseEther } from "ethers";
import { ZhekaCoin } from "../typechain-types";

describe("ZhekaCoin", function () {
  let zhekaCoin: ZhekaCoin;
  let deployer: any;
  let user1: any;

  beforeEach(async function () {
    [deployer, user1] = await ethers.getSigners();

    const ZhekaCoinFactory = await ethers.getContractFactory("ZhekaCoin");
    zhekaCoin = (await ZhekaCoinFactory.deploy(
      parseEther("1000000")
    )) as ZhekaCoin;

    await zhekaCoin.waitForDeployment();
  });

  it("Should deploy with correct initial supply", async function () {
    const balance = await zhekaCoin.balanceOf(deployer.address);
    expect(balance).to.equal(parseEther("1000000"));
  });

  it("Should allow owner to mint tokens", async function () {
    await zhekaCoin.mint(user1.address, parseEther("500"));
    const balance = await zhekaCoin.balanceOf(user1.address);
    expect(balance).to.equal(parseEther("500"));
  });

  it("Should fail if non-owner tries to mint", async function () {
    await expect(
      zhekaCoin.connect(user1).mint(user1.address, parseEther("100"))
    ).to.be.reverted;
  });

  it("Should transfer tokens between accounts", async function () {
    await zhekaCoin.transfer(user1.address, parseEther("100"));
    const balance = await zhekaCoin.balanceOf(user1.address);
    expect(balance).to.equal(parseEther("100"));
  });

  it("Should fail if transfer exceeds balance", async function () {
    await expect(
      zhekaCoin.connect(user1).transfer(deployer.address, parseEther("100"))
    ).to.be.reverted;
  });
});
