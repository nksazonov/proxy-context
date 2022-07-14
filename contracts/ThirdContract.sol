// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./IThirdContract.sol";

contract ThirdContract is IThirdContract {
    function doMagic() external view returns (address) {
        console.log('\nin third contract');
        console.log(msg.sender);

        return msg.sender;
    }
}
