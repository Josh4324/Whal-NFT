// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract JOSHNFTs is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private tokenIds;

    /**
     * @dev _baseTokenURI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`.
     */
    string _baseTokenURI;
    address public marketAddress;
    uint256 public price;

    event Minted(uint256 indexed tokenId, address indexed addr);

    constructor(
        string memory baseURI,
        uint256 nftPrice
    ) ERC721("JoshNFT", "JNFT") {
        _baseTokenURI = baseURI;
        price = nftPrice;
    }

    function mint() public onlyOwner {
        uint256 newTokenId = tokenIds.current();
        _mint(msg.sender, newTokenId);
        tokenIds.increment();
        emit Minted(newTokenId, msg.sender);
    }

    function buy() public payable {
        require(msg.value >= price, "Not enough matic");
        uint256 newTokenId = tokenIds.current();
        _mint(msg.sender, newTokenId);
        tokenIds.increment();
        emit Minted(newTokenId, msg.sender);
    }

    /**
     * @dev _baseURI overides the Openzeppelin's ERC721 implementation which by default
     * returned an empty string for the baseURI
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        string memory t = string(
            abi.encodePacked(Strings.toString(tokenId), ".json")
        );
        return
            bytes(_baseTokenURI).length > 0
                ? string(abi.encodePacked(_baseTokenURI, t))
                : "";
    }

    function setBaseURI(string memory val) public onlyOwner {
        _baseTokenURI = val;
    }

    function setPrice(uint256 val) public onlyOwner {
        price = val;
    }
}
