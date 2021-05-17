
const ETHBSCSwap = artifacts.require('ETHBSCSwap');

module.exports = function (deployer) {
  const fee = 0;
  const tokenAddress = "0x35FD295179DD39A05d99fEb058510dD4928cb91a";
  const ownerAddress = "0x69c831Bb8C8838a33078Dfd7C7c91Ee099802668";
  const vaultAddress = "0x9BfF1D516a09Ab700f16F64353981faCd41283Cd";

  deployer.deploy(ETHBSCSwap, fee, tokenAddress, ownerAddress, vaultAddress);
};
