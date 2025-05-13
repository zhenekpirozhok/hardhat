import { expect } from "chai";
import { ethers } from "hardhat";
import { MultiSigWallet } from "../typechain-types";

describe("MultiSigWallet", function () {
  let wallet: MultiSigWallet;
  let owner1: any;
  let owner2: any;
  let notOwner: any;

  beforeEach(async function () {
    [owner1, owner2, notOwner] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("MultiSigWallet");
    wallet = await factory.deploy(
      [owner1.address, owner2.address],
      2 // required confirmations
    );
    await wallet.waitForDeployment();
  });

  it("should deploy with correct owners and threshold", async function () {
    expect(await wallet.isOwner(owner1.address)).to.be.true;
    expect(await wallet.isOwner(owner2.address)).to.be.true;
    expect(await wallet.required()).to.equal(2);
  });

  it("should allow an owner to submit a transaction", async function () {
    const to = owner2.address;
    const value = ethers.parseEther("1");
    const data = "0x";

    const tx = await wallet.connect(owner1).submitTransaction(to, value, data);
    await expect(tx).to.emit(wallet, "Submit").withArgs(0);

    const txCount = await wallet.getTransactionCount();
    expect(txCount).to.equal(1);

    const txn = await wallet.getTransaction(0);
    expect(txn.to).to.equal(to);
    expect(txn.value).to.equal(value);
    expect(txn.executed).to.equal(false);
    expect(txn.numConfirmations).to.equal(0);
  });

  it("should allow owners to confirm and execute a transaction", async function () {
    const to = owner2.address;
    const value = ethers.parseEther("0");
    const data = "0x";

    await wallet.connect(owner1).submitTransaction(to, value, data);

    await wallet.connect(owner1).confirmTransaction(0);
    await wallet.connect(owner2).confirmTransaction(0);

    const execute = await wallet.connect(owner1).executeTransaction(0);
    await expect(execute).to.emit(wallet, "Execute").withArgs(0);

    const txn = await wallet.getTransaction(0);
    expect(txn.executed).to.equal(true);
  });

  it("should not allow non-owner to confirm or submit", async function () {
    await expect(
      wallet.connect(notOwner).submitTransaction(owner1.address, 0, "0x")
    ).to.be.revertedWith("not owner");

    await wallet.connect(owner1).submitTransaction(owner2.address, 0, "0x");
    await expect(
      wallet.connect(notOwner).confirmTransaction(0)
    ).to.be.revertedWith("not owner");
  });

  it("should allow owner to revoke a confirmation", async function () {
    const to = owner2.address;
    const value = 0;
    const data = "0x";

    await wallet.connect(owner1).submitTransaction(to, value, data);
    await wallet.connect(owner1).confirmTransaction(0);

    const revoke = await wallet.connect(owner1).revokeConfirmation(0);
    await expect(revoke).to.emit(wallet, "Revoke").withArgs(owner1.address, 0);

    const txn = await wallet.getTransaction(0);
    expect(txn.numConfirmations).to.equal(0);
  });
});
