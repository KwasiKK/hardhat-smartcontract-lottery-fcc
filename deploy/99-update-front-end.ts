import fs from "fs"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
const FRONT_END_ADDRESSES_FILE =
    "../nextjs-smartcontract-lottery-fcc/constants/contractAddresses.json"
const FRONT_END_ABI_FILE = "../nextjs-smartcontract-lottery-fcc/constants/abi.json"

const updateUI: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating front end...")
        updateContractAddresses(hre)
        updateAbi(hre)
    }
}

async function updateContractAddresses(hre: HardhatRuntimeEnvironment) {
    const { network, ethers } = hre
    const lotto = await ethers.getContract("Lotto")
    const currentAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"))
    const chainId = network.config.chainId
    if (chainId.toString() in currentAddresses) {
        if (!currentAddresses[chainId].includes(lotto.address)) {
            currentAddresses[chainId].push(lotto.address)
        }
    } else {
        currentAddresses[chainId] = [lotto.address]
    }
    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses))
}

async function updateAbi(hre: HardhatRuntimeEnvironment) {
    const { ethers } = hre
    const lotto = await ethers.getContract("Lotto")
    fs.writeFileSync(FRONT_END_ABI_FILE, lotto.interface.format(ethers.utils.FormatTypes.json))
}

export default updateUI
module.exports.tags = ["all", "frontend"]
