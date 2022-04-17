//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract NumberStore {
    uint private number;

    constructor(uint _number) {
        console.log("Deploying a Greeter with greeting:");
        number = _number;
    }

    function storeNumber(uint _number) public {
        console.log("Changing value from %d to %d", number, _number);
        number = _number;
    }

    function retrieveNumber() external view returns(uint) {
        return number;
    }
}
