// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameCharacterCollectionERC1155 is ERC1155, Ownable {
    string public name = "GameCharacterNFTs";
    string public symbol = "GCN";

    // Optional: store URIs per token ID
    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory _baseURI) ERC1155(_baseURI) Ownable(msg.sender) {}

    function setTokenURI(uint256 tokenId, string memory uri) public onlyOwner {
        _tokenURIs[tokenId] = uri;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    /// Mint batch of 10 game character NFTs (1 each)
    function mintBatchToOwner() external onlyOwner {
        for (uint256 i = 0; i < 10; i++) {
            ids[i] = i;
            amounts[i] = 1;
        }

        _mintBatch(msg.sender, ids, amounts, "");
    }


    /// Transfer 1 or 2 tokens to a student (example call)
    function transferToStudent(address student, uint256[] memory ids, uint256[] memory amounts) external onlyOwner {
        require(ids.length == amounts.length, "Length mismatch");
        safeBatchTransferFrom(msg.sender, student, ids, amounts, "");
    }
}
