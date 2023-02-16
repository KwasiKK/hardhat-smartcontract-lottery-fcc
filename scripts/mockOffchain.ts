import { BigNumber } from "ethers"
import { ethers, network } from "hardhat"
import { Lotto, VRFCoordinatorV2Mock } from "../typechain-types"

async function mockKeepers() {
    const lotto: Lotto = await ethers.getContract("Lotto")
    const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))
    const { upkeepNeeded } = await lotto.callStatic.checkUpkeep(checkData)
    if (upkeepNeeded) {
        const tx = await lotto.performUpkeep(checkData)
        const txReceipt = await tx.wait(1)
        const requestId = txReceipt.events![1].args!.requestId
        console.log(`Performed upkeep with RequestId: ${requestId}`)
        if (network.config.chainId == 31337) {
            await mockVrf(requestId, lotto)
        }
    } else {
        console.log("No upkeep needed!")
    }
}

async function mockVrf(requestId: BigNumber, lotto: Lotto) {
    console.log("We on a local network? Ok let's pretend...")
    const vrfCoordinatorV2Mock: VRFCoordinatorV2Mock = await ethers.getContract(
        "VRFCoordinatorV2Mock"
    )
    await vrfCoordinatorV2Mock.fulfillRandomWords(requestId, lotto.address)
    console.log("Responded!")
    const recentWinner = await lotto.getRecentWinner()
    console.log(`The winner is: ${recentWinner}`)
}

mockKeepers()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
