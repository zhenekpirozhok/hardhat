# Sample Hardhat Project

## 📚 Table of Contents

* [Multi-Signature Wallet](#multi-signature-wallet)

* [Proxy Contract](#proxy-contract)

* [Soulbound Visit Card & Game Character NFT Collection](#soulbound-visit-card-&-game-character-nft-collection) 

## Soulbound Visit Card & Game Character NFT Collection

This project contains two smart contracts written in Solidity:

1. **SoulboundVisitCardERC721** – A non-transferable ERC-721 NFT representing a student's personal visit card.
2. **GameCharacterCollectionERC1155** – A multi-token ERC-1155 collection of 10 unique game character NFTs with batch minting and transfer capabilities.

---

### 📚 Learning Goals

- Understand the difference between ERC-721 and ERC-1155.
- Learn how to implement soulbound (non-transferable) NFTs.
- Manage batch operations and metadata in ERC-1155.
- Store metadata and images using IPFS.
- Apply smart contract security and access control patterns.

---

### 🛠️ Project Structure

```

contracts/
│   SoulboundVisitCardERC721.sol
│   GameCharacterCollectionERC1155.sol
scripts/
│   deployStudentVisitCard.ts
│   deployCharacters.ts 
test/
│   characters.test.ts
│   studentcard.test.ts
metadata/game_characters
│   0.json ... 9.json       ← IPFS metadata

````

---

### 🔧 Requirements

- Node.js >= 16
- Hardhat
- TypeScript
- IPFS account (e.g. Web3.Storage)

Install dependencies:

```bash
npm install
````

Compile contracts:

```bash
npx hardhat compile
```

---

### 🚀 Deployment

#### 1. SoulboundVisitCardERC721

This contract is not transferable after minting.

```solidity
function mint(address to, string memory tokenURI) external onlyOwner;
```

Deployment:

```bash
npx hardhat run scripts/deployStudentVisitCard.ts --network sepolia
```

### 2. GameCharacterCollectionERC1155

```ts
const baseURI = "ipfs://bafybeiffbhpv6k6bnlzeffg6px7hkwr5q4wgrrz5kzgwwmu2k3squuhrjq/";
await contract.setTokenURI(0, baseURI + "0.json");
```

Deployment:

```bash
npx hardhat run scripts/deployCharacters.ts --network sepolia
```

---

### 🧪 Testing

Run full test suite (ERC-721 + ERC-1155):

```bash
npx hardhat test
```

---

### 🖼️ Metadata & IPFS

Each NFT (ERC-721 and ERC-1155) must have:

* `name`, `description`
* `image` hosted on IPFS
* Attributes (`speed`, `color`, `strength`, etc.)

Metadata example (`0.json`):

```json
{
  "name": "Red Kitty",
  "description": "A fearless red cat warrior with blazing speed.",
  "image": "ipfs://Qm.../0.png",
  "attributes": [
    { "trait_type": "Color", "value": "Red" },
    { "trait_type": "Speed", "value": 9 },
    { "trait_type": "Strength", "value": 5 },
    { "trait_type": "Rarity", "value": "Epic" }
  ]
}
```

Upload folder via [web3.storage](https://web3.storage):

```bash
web3.storage put metadata --token=YOUR_TOKEN
```

---

### 📸 Proof of Functionality

#### ✅ Soulbound ERC-721

Contract creation transaction: https://sepolia.etherscan.io/tx/0x61f9b59ad40de3e613e55606d627d01977dc37bd963af13b38d694f207b7ee0e

Mint transaction: https://sepolia.etherscan.io/tx/0x895e2250d7b27cf315061899e00f1fcce1473ea2ecb1202b98f9b8d39b32be3d

![изображение](https://github.com/user-attachments/assets/27e94ea4-f195-40f9-8d2c-e2022af3c737)

the script can be found in scripts/proof721.ts


#### ✅ Game Character ERC-1155

Contract creation: https://sepolia.etherscan.io/tx/0x31a70c4d5d6dfd521f3ccb4f98e7febb859086cdf489b77c040a26c30728990c

![изображение](https://github.com/user-attachments/assets/4ac4f2c5-2008-4779-a9da-0dd39ee3afa2)

the script can be found in scripts/proof1155.ts

---

### 🔐 Security

* `onlyOwner` used for minting and admin actions
* Soulbound NFT disables all transfer/approval logic
* ERC-1155 uses batch-safe mint and transfer


## Multi-Signature wallet

### 💼 Overview

This is a simple and secure **Multi-Signature Wallet** smart contract built in Solidity. It allows multiple owners to jointly manage and execute transactions with a configurable confirmation threshold. Transactions require approval from multiple authorized signers before execution, providing strong protection against unauthorized actions.
The solidity contract is stored in **contracts/MultiSigWallet.sol**
Deployment script - **scripts/deployMultiSig.ts**
Tests - **test/multisig.test.ts**

---

### 🧠 Design Decisions

#### ✅ Owner Management

* A fixed list of owners is initialized at deployment.
* The mapping `isOwner[address]` provides efficient access control.
* Each owner has equal voting power.

#### ✅ Transaction Lifecycle

Each transaction follows this exact flow:

1. **Submission** — An owner proposes a transaction (`to`, `value`, `data`)
2. **Confirmation** — Other owners approve the transaction
3. **Execution** — Anyone (not necessarily an owner) can execute after enough confirmations
4. **Revocation** — Owners can revoke their confirmation prior to execution

This design balances **control and flexibility**, and avoids centralization.

#### ✅ Confirmation Threshold

* The number of required confirmations (`required`) is set during deployment.
* Must be ≤ number of owners and ≥ 1.

#### ✅ Simplicity and Transparency

* No upgradeable pattern or owner changing logic is included by design.
* Focus is on clarity, testability, and composability.

---

### ⚙️ Contract Features

| Feature                | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `submitTransaction()`  | Propose a new transaction                                     |
| `confirmTransaction()` | Approve a proposed transaction                                |
| `revokeConfirmation()` | Remove a previous confirmation                                |
| `executeTransaction()` | Execute the transaction if approved                           |
| `getTransaction()`     | Read transaction data                                         |
| `receive()`            | Accept ETH and log deposit event                              |
| Events                 | Emits `Submit`, `Confirm`, `Execute`, `Revoke`, and `Deposit` |

---

### 🛠 Usage Instructions

#### 🧪 Local Testing

```bash
npx hardhat test
```

Includes tests for:

* Deployment
* Submission, confirmation, execution
* Revoke and access control
* Edge cases (duplicate confirmations, invalid txs)

#### 🧵 Deployment (Example Script)

```ts
const owners = [
  "0xYourAccount1",
  "0xYourAccount2"
];
const required = 2;

const factory = await ethers.getContractFactory("MultiSigWallet");
const wallet = await factory.deploy(owners, required);
```

#### 💰 Sending ETH

Send ETH directly to the wallet address. It will be stored and used only when transactions are executed.

#### ✍️ Proposing a Transaction

```ts
await wallet.connect(owner1).submitTransaction(
  "0xRecipientAddress",
  ethers.parseEther("1.0"),
  "0x" // optional data
);
```

#### ✅ Confirming

```ts
await wallet.connect(owner2).confirmTransaction(0);
```

#### 🔁 Executing

```ts
await wallet.connect(owner1).executeTransaction(0);
```

---

### 🔐 Security Analysis

| Area                       | Measures                                                                    |
| -------------------------- | --------------------------------------------------------------------------- |
| 🔒 Access Control          | Only `isOwner` addresses can submit/confirm/revoke/execute                  |
| ⛓️ Confirmation Tracking   | Prevents duplicate confirmations per owner                                  |
| ✅ Threshold Validation     | Checked at deploy time                                                      |
| ⚠️ Re-entrancy             | Safe due to `checks-effects-interactions` pattern in `executeTransaction()` |
| 🧼 Clean State             | Transaction can’t be executed twice                                         |
| 🔍 Transparency            | Events log all important actions                                            |
| ❌ No dynamic owner changes | Reduces attack surface                                                      |
| 🧪 Unit tested             | With Hardhat and Chai assertions                                            |




## Proxy contract

Proxy contract: ZhekaCoinV1.sol

Deployment script: deployProxyCoin1.ts

Interaction script: interactWithProxy.ts

Output of interaction:

``` bash
$ npx hardhat run scripts/interactWithProxy.ts --network sepolia
👤 Owner: 0x1cb851699C32DAD6c6C95616EF69e34a4EeF2F34
👤 User1: 0x3C9C2404849960140fBA3ae550429ccE521f1f9A
✅ Minted 100000000000000000000 to 0x1cb851699C32DAD6c6C95616EF69e34a4EeF2F34
🔁 Transferred 50 tokens to 0x3C9C2404849960140fBA3ae550429ccE521f1f9A
💰 Owner balance: 1000050.0 ZHK
💰 User1 balance: 50.0 ZHK
```

Version 2 conract: ZhekaCoinV2.sol

Deployment script: deployProxyCoin2.ts

Output:

``` bash
$ npx hardhat run scripts/deployProxyCoin2.ts --network sepolia
✅ ZhekaCoinV2 implementation deployed at: 0xFB5B91cbF8c07076683570F3b7B6A747237bF48d
```

Upgrade script: upgradeToV2.ts

Output:

``` bash
$ npx hardhat run scripts/upgradeToV2.ts --network sepolia
✅ Proxy successfully upgraded to V2
🔎 Current version: V2
```

Upgrade validation script: validateUpgrade.ts

Output:

``` bash
$ npx hardhat run scripts/validateUpgrade.ts --network sepolia
🔎 Owner address: 0x1cb851699C32DAD6c6C95616EF69e34a4EeF2F34
🔎 User1 address: 0x3C9C2404849960140fBA3ae550429ccE521f1f9A

📍 === BALANCES BEFORE ===
💰 Owner balance: 1000060.0 ZHK
💰 User1 balance: 60.0 ZHK

🔍 Calling version() from proxy...
🆕 Current version: V2

🛠 Minting 10 tokens to User1...
✅ Mint successful

🔁 Transferring 5 tokens from User1 to Owner...
✅ Transfer successful

📍 === BALANCES AFTER ===
📊 Final Owner balance: 1000065.0 ZHK
📊 Final User1 balance: 65.0 ZHK
```
