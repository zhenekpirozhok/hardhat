# Sample Hardhat Project

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
