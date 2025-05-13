# Sample Hardhat Project

## 📚 Table of Contents

* [Multi-Signature Wallet](#multi-signature-wallet)

* [Proxy Contract](#proxy-contract)



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
