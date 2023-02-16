// const networkConfig = {
// //   4: {
// //     name: "rinkeby",
// //     ethUsdPriceFeed: "0xAc559F25B1619171CbC396a50854A3240b6A4e99",
// //   },
//   5: {
//     name: "goerli",
//     ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
//   },
// }

import { BigNumber } from "ethers"
import { ethers } from "hardhat"

export interface networkConfigItem {
    vrfCoordinator?: string
    blockConfirmations?: number
    entranceFee?: BigNumber
    gasLane?: string
    subscriptionId?: number
    callbackGasLimit?: string
    interval?: string
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    localhost: {
        blockConfirmations: 1,
    },
    31337: {
        blockConfirmations: 1,
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        callbackGasLimit: "500000",
        interval: "30",
    },
    // kovan: {
    //     vrfCoordinator: "0x9326BFA02ADD2366b30bacB125260Af641031331",
    //     blockConfirmations: 6,
    // },
    5: {
        vrfCoordinator: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        blockConfirmations: 6,
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId: 8493,
        callbackGasLimit: "500000",
        interval: "30",
    },
}

export const developmentChains = ["hardhat", "localhost"]
