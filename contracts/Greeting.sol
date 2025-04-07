// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Greeting {
    string public name;

    // Конструктор, принимающий имя
    constructor(string memory _name) {
        name = _name;
    }

    // Функция для получения приветственного сообщения
    function greet() public view returns (string memory) {
        return string(abi.encodePacked("Hello, ", name, "!"));
    }
}
