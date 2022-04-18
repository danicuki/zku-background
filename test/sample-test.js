const { expect } = require("chai");
const { ethers } = require("hardhat");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("NumberStore", function () {
  it("Should store and return stored value", async function () {
    const NumberStore = await ethers.getContractFactory("NumberStore");
    const numberStore = await NumberStore.deploy(7);
    await numberStore.deployed();
    expect(await numberStore.retrieveNumber()).to.equal(7);

    const tx = await numberStore.storeNumber(8);
    await tx.wait();

    expect(await numberStore.retrieveNumber()).to.equal(8);
  });
});

describe("Ballot", function () {
  it("test ballot", async function () {
    const Ballot = await ethers.getContractFactory("Ballot");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const proposals = ["proposal 1", "proposal 2", "proposal 3"].map(ethers.utils.formatBytes32String)
    const ballot = await Ballot.deploy(proposals, 10);
    await ballot.deployed();

    await ballot.giveRightToVote(addr1.address);
    await ballot.giveRightToVote(addr2.address);
    
    await ballot.connect(addr1).vote(1);
    await ballot.connect(addr2).vote(2);
    await ballot.connect(owner).vote(2);

    expect(await ballot.winningProposal()).to.equal(2);
  });
});


describe("Ballot 2", function () {
  it("test ballot expiration", async function () {
    const Ballot = await ethers.getContractFactory("Ballot");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const proposals = ["proposal 1", "proposal 2", "proposal 3"].map(ethers.utils.formatBytes32String)
    const ballot = await Ballot.deploy(proposals, 4);
    await ballot.deployed();

    await ballot.giveRightToVote(addr1.address);
    await ballot.giveRightToVote(addr2.address);
    await ballot.connect(addr1).vote(1);
    await sleep(1000);
    await expect(ballot.connect(addr2).vote(2)).to.be.revertedWith("voting timed out");
  });
});



