const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test token for Iotex", function () {

  let demoToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function() {
    const DemoToken = await hre.ethers.getContractFactory("ERC20Ownable");
    demoToken = await DemoToken.deploy();
    await demoToken.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();

  });
  
  it("Should should successfully deploy", async function () {
    console.log("success!");
  });

  it("Should deploy with zero supply for the owner of the contract", async function() {
    const balance = await demoToken.balanceOf(owner.address);
    expect(ethers.utils.formatEther(balance) == 0);
  });

  it("Should let you mint tokens for a particular address", async function() {
    await demoToken.mintToken(addr1.address, ethers.utils.parseEther("100"));
    expect(await demoToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
  });

  it("Should let you burn tokens by transferring it to null address", async function() {
    await demoToken.mintToken(addr1.address, ethers.utils.parseEther("100"));
    expect(await demoToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
    await demoToken.burnToken(addr1.address, ethers.utils.parseEther("50"));
    expect(await demoToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("50"));
  });

  it("Should let you give another address the approval to send on your behalf", async function() {
    await demoToken.mintToken(owner.address, ethers.utils.parseEther("1000"));
    await demoToken.connect(addr1).approve(owner.address, ethers.utils.parseEther("1000"));
    await demoToken.transfer(addr1.address, ethers.utils.parseEther("1000"));
    await demoToken.transferFrom(addr1.address, addr2.address, ethers.utils.parseEther("1000"));
    expect(await demoToken.balanceOf(addr2.address)).to.equal(ethers.utils.parseEther("1000"));
  })
});


