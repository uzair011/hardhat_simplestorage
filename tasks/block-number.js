const { task } = require("hardhat/config")

task("block-number", "print the current number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`The current bloknumber is: ${blockNumber}`)
    }
)
