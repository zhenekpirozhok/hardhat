// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZhekaCoin is ERC20, Ownable {
    constructor(uint256 initialSupply) 
        ERC20("ZhekaCoin", "ZHK") 
        Ownable(msg.sender) 
    {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
