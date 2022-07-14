// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./IThirdContract.sol";

contract Implementation {
    function callThirdContract(address thirdContractAddress) external view returns (address) {
        console.log('\ncalling third contract from');
        console.log(msg.sender);
        return IThirdContract(thirdContractAddress).doMagic();
    }
}
