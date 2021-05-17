const MITx = artifacts.require('MITx');
const BSCETHSwap = artifacts.require('BSCETHSwap');

module.exports = function (deployer) {
  const bscSwapFee = 0;
  const ethSwapInitTxHash = '0x84b2f804a5678a46ffa23bb3c33fd8240c43c7147ea0216f1524ae879c9b6add';
  const erc20Addr = '0xB176b2f01487a1A452e058f2b386a6eD30D38128';
  const ownerAddr = '0x9A17bE5E06433182fe40695A3d14Aa744Fd845F7';
  const hotWalletAddress = '0x9A17bE5E06433182fe40695A3d14Aa744Fd845F7';

  let tokenContract;
  let swapContract;

  deployer.deploy(MITx)
  .then(instance => {
    tokenContract = instance;
    // deploy swap contract
    return deployer.deploy(BSCETHSwap, bscSwapFee, ethSwapInitTxHash, erc20Addr, instance.address)
  })
  .then(instance => {
    swapContract = instance;
    // transferOwner of token to swap for mint
    return tokenContract.transferOwnership(instance.address);
  })
  .then(txHash => {
    //console.log(txHash);
    // add hotwallet
    return swapContract.addWhitelist(hotWalletAddress);
  })
  .then(txHash => {
    return swapContract.transferOwnership(ownerAddr);
  })
  .then(txHash => {
    // console.log(txHash);
  });
};
