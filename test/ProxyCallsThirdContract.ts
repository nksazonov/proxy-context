import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Proxy", function () {
  let owner: any;

  async function deployOneYearLockFixture() {
    
    [owner] = await ethers.getSigners();

    const ProxyFactory = await ethers.getContractFactory("Proxy");
    const Proxy = await ProxyFactory.deploy();

    const ImplementationFactory = await ethers.getContractFactory("Implementation");
    const Implementation = await ImplementationFactory.deploy();

    await Proxy.setImplementation(Implementation.address);

    const abi = ['function callThirdContract(address thirdContractAddress) external view returns (address)'];
    const Proxied = new ethers.Contract(Proxy.address, abi, owner);

    const ThirdContractFactory = await ethers.getContractFactory("ThirdContract");
    const ThirdContract = await ThirdContractFactory.deploy();

    return { Proxied, Implementation, ThirdContract };
  }

  describe("Proxy context", function () {
    it("msg.sender in third contract called by implementation", async function () {
      const { Proxied, Implementation, ThirdContract } = await loadFixture(deployOneYearLockFixture);

      console.log('owner:', owner.address);
      console.log('Proxy:', Proxied.address);
      console.log('Implementation:', Implementation.address);
      console.log('ThirdContract:', ThirdContract.address);
      console.log('-----------------------------------');
        
      expect(await Proxied.callThirdContract(ThirdContract.address)).to.equals(Proxied.address);
    });
  });

});
