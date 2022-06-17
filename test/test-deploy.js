const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage

    //* deploying the SimpleStorge contract before test all the codes
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    //* it.only => to test the selected test
    it("Should start with a favourite number equal to ZERO", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        //* assert or expect
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update the favourite number when we call store", async function () {
        const expectedValue = "9"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Adding favourite number to the person", async function () {
        const expectedPersonName = "uzair"
        const expectedFavouriteNumber = "99"
        const transactionResponse = await simpleStorage.addPerson(
            expectedPersonName,
            expectedFavouriteNumber
        )
        await transactionResponse.wait(1)
        const { name, favoriteNumber } = await simpleStorage.people(0)
        assert.equal(expectedPersonName, name)
        assert.equal(expectedFavouriteNumber.toString(), favoriteNumber)
    })
})
