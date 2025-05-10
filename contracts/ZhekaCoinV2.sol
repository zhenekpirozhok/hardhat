// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ZhekaCoinV1.sol";

contract ZhekaCoinV2 is ZhekaCoinV1 {
    function version() public pure returns (string memory) {
        return "V2";
    }
}
