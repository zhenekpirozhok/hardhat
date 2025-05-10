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
