import { ethers, getNamedAccounts, network } from "hardhat"
import { assert, expect } from "chai"
import { developmentChains } from "../../helper-hardhat-config"
import { Lotto } from "../../typechain-types"
import { BigNumber } from "ethers"

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Lotto Unit Tests", () => {
          let lotto: Lotto
          const chainId = network.config.chainId!
          let lottoEntranceFee: BigNumber
          // let interval: BigNumber
          let deployer: any

          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              lotto = await ethers.getContract("Lotto", deployer)
              lottoEntranceFee = await lotto.getEntranceFee()
              // interval = await lotto.getInterval()
          })

          describe("fulfillRandomWords", async () => {
              it("works with live Chainlink Keepers and Chainlink VRF, we get a random winner", async () => {
                  // enter lotto
                  const startingTimestamp = await lotto.getLastTimeStamp()
                  const accounts = await ethers.getSigners()

                  await new Promise<void>(async (resolve, reject) => {
                      lotto.once("WinnerPicked", async () => {
                          console.log("Detected WinnerPicked event!")
                          try {
                              // add asserts here
                              const recentWinner = await lotto.getRecentWinner()
                              const lottoState = await lotto.getLottoState()
                              const winnerEndingBalance = await accounts[0].getBalance()
                              const endingTimestamp = await lotto.getLastTimeStamp()

                              await expect(lotto.getPlayer(0)).to.be.reverted
                              assert.equal(recentWinner.toString(), accounts[0].address)
                              assert.equal(lottoState, 0)
                              assert.equal(
                                  winnerEndingBalance.toString(),
                                  winnerStartingBalance.add(lottoEntranceFee).toString()
                              )
                              assert(startingTimestamp < endingTimestamp)
                              resolve()
                          } catch (error) {
                              console.log(error)
                              console.log("Error: rejected!")
                              reject()
                          }
                      })
                  })

                  console.log("Entering Lotto......")
                  await lotto.enterLotto({ value: lottoEntranceFee })
                  const winnerStartingBalance = await accounts[0].getBalance()
              })
          })
      })
