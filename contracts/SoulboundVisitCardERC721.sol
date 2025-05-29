// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoulboundVisitCardERC721 is ERC721, Ownable {
    uint256 private _nextTokenId = 1;
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("StudentVisitCard", "SVC") Ownable(msg.sender) {}

    function mint(address to, string memory uri) external onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        _tokenURIs[tokenId] = uri;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }

    function _update(address to, uint256 tokenId, address auth) internal override returns (address from) {
        from = super._update(to, tokenId, auth);
        require(from == address(0), "Soulbound: token is non-transferable");
    }

    function approve(address, uint256) public pure override {
        revert("Soulbound: approve disabled");
    }

    function setApprovalForAll(address, bool) public pure override {
        revert("Soulbound: setApprovalForAll disabled");
    }

    function getApproved(uint256) public pure override returns (address) {
        return address(0);
    }

    function isApprovedForAll(address, address) public pure override returns (bool) {
        return false;
    }
}
