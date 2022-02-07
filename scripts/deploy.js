async function main() {
  const ERC20Ownable = await ethers.getContractFactory("ERC20Ownable");

  // Start deployment, returning a promise that resolves to a contract object
  const ERC20Test = await ERC20Ownable.deploy();
  console.log("Contract deployed to address:", ERC20Test.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//0xc4D4D832e18015B9aCDa6f63C32E0A9378FaA54B
