// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract ZhekaCoinV1 is Initializable, ERC20Upgradeable, OwnableUpgradeable {
    function initialize(uint256 initialSupply) public initializer {
        __ERC20_init("ZhekaCoin", "ZHK");
        __Ownable_init(msg.sender);
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
