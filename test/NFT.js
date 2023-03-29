const { expect, use } = require("chai");
const { ethers } = require("hardhat");

describe("Test 1", function () {
  it("should pass", async function () {
    const [owner, user1, user2, user3, user4] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("BakerNFTs");
    const nft = await NFT.deploy(
      "https://baker.mypinata.cloud/ipfs/QmRqTgta6phW96W7neDrfojN6uJs3g3zUVogbz9yzF2pmj?_gl=1*po7as5*_ga*NDg4NjUzMzc4LjE2NzQwMTA5NjQ.*_ga_5RMPXG14TE*MTY3NTMyMjk5MC4xMC4xLjE2NzUzMjMwMDYuNDQuMC4w/",
      ethers.utils.parseEther("200")
    );

    await nft.deployed();

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const balance0ETH = await ethers.provider.getBalance(owner.address);
    console.log(balance0ETH);

    await nft.buy({ value: ethers.utils.parseEther("300") });
  });
});
