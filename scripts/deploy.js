async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const NumberStore = await ethers.getContractFactory("NumberStore");
  const ns = await NumberStore.deploy(7);
  console.log("NumberStore address:", ns.address);

  const Ballot = await ethers.getContractFactory("Ballot");
  const proposals = ["proposal 1", "proposal 2", "proposal 3"].map(ethers.utils.formatBytes32String)
  const ballot = await Ballot.deploy(proposals, 60 * 5); // 5 minutes expiration
  console.log("Ballot address:", ballot.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
