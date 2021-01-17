const Token = artifacts.require("Token");
const StakEth = artifacts.require("StakEth");

module.exports = async function(deployer) {
  // Deploy Token
  await deployer.deploy(Token);
  const token = await Token.deployed()

  // Deploy StakEth
  await deployer.deploy(StakEth, token.address);
  const stakEth = await StakEth.deployed()

  // Transfer all tokens to StakEth (1 million)
  await token.transfer(stakEth.address, '1000000000000000000000000')
};
