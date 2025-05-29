// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GameCharacterCollectionERC1155 is ERC1155, Ownable {
    using Strings for uint256;

    // Total number of unique game characters
    uint256 public constant TOTAL_CHARACTERS = 10;

    // Optional: store names or traits off-chain
    mapping(uint256 => string) public tokenURIs;

    constructor(string memory baseURI) ERC1155(baseURI) Ownable(msg.sender) {}

    /// @notice Sets the URI for a specific token ID
    function setTokenURI(uint256 tokenId, string memory _tokenURI) external onlyOwner {
        require(tokenId < TOTAL_CHARACTERS, "Invalid tokenId");
        tokenURIs[tokenId] = _tokenURI;
    }

    /// @notice Override uri to return custom token-specific URI
    function uri(uint256 tokenId) public view override returns (string memory) {
        require(bytes(tokenURIs[tokenId]).length > 0, "URI not set");
        return tokenURIs[tokenId];
    }

    /// @notice Batch mint the 10 game characters
    function batchMintCharacters(address to) external onlyOwner {
        uint256[] memory ids = new uint256[](TOTAL_CHARACTERS);
        uint256[] memory amounts = new uint256[](TOTAL_CHARACTERS);
        for (uint256 i = 0; i < TOTAL_CHARACTERS; i++) {
            ids[i] = i;
            amounts[i] = 1; // Mint 1 of each character
        }
        _mintBatch(to, ids, amounts, "");
    }

    /// @notice Mint specific characters in specific amounts
    function mintCharacters(address to, uint256[] memory ids, uint256[] memory amounts) external onlyOwner {
        require(ids.length == amounts.length, "Length mismatch");
        for (uint256 i = 0; i < ids.length; i++) {
            require(ids[i] < TOTAL_CHARACTERS, "Invalid tokenId");
        }
        _mintBatch(to, ids, amounts, "");
    }

    /// @notice Batch transfer tokens from owner to student
    function batchTransferCharacters(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) external onlyOwner {
        _safeBatchTransferFrom(from, to, ids, amounts, "");
    }
}
