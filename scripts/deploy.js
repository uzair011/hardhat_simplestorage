const { ContractFactory } = require("ethers")
const { ethers, run, network } = require("hardhat")

async function main() {
    //! deploy the contract
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying simple storage contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Contract deployed to ${simpleStorage.address}`)
    //console.log(network.config)

    //! verify the contract
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        console.log(`waiting for 6 transactions... `)
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    //! get the value and update the contract
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is: ${currentValue}`)

    const transactionResponse = await simpleStorage.store(9)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value ${updatedValue}`)
}

async function verify(contractAddress, args) {
    console.log("verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified contract!")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
