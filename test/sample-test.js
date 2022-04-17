const { expect } = require("chai");
const { ethers } = require("hardhat");

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
