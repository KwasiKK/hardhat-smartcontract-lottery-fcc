import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { assert, expect } from "chai"
import { developmentChains, networkConfig } from "../../helper-hardhat-config"
import { Lotto, VRFCoordinatorV2Mock } from "../../typechain-types"
import { BigNumber } from "ethers"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Lotto Unit Tests", () => {
          let lotto: Lotto
          let vrfCoordinatorV2Mock: VRFCoordinatorV2Mock
          const chainId = network.config.chainId!
          let lottoEntranceFee: BigNumber
          let interval: BigNumber
          let deployer: any
          let subscriptionId: number
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              lotto = await ethers.getContract("Lotto", deployer)
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
              lottoEntranceFee = await lotto.getEntranceFee()
              interval = await lotto.getInterval()
              subscriptionId = await lotto.getSubscriptionId()
              if (chainId == 31337) {
                  await vrfCoordinatorV2Mock.addConsumer(subscriptionId, lotto.address)
              }
          })

          describe("constructor", () => {
              it("initializes the lotto correctly", async () => {
                  // Ideally, we ,ake our test have 1 assert per 'it'
                  const lottoState = await lotto.getLottoState()
                  assert.equal(lottoState.toString(), "0")
                  assert.equal(interval.toString(), networkConfig[chainId]["interval"])
              })
          })

          describe("enterLotto", () => {
              it("reverts when you don't pay enough", async () => {
                  await expect(lotto.enterLotto()).to.be.revertedWith("Lotto__NotEnoughETHEntered")
              })
              it("records players when they enter the lotto", async () => {
                  await lotto.enterLotto({ value: lottoEntranceFee })
                  const playerFromContract = await lotto.getPlayer(0)
                  assert.equal(deployer, playerFromContract)
              })
              it("emits event when player enters the lotto", async () => {
                  await expect(lotto.enterLotto({ value: lottoEntranceFee })).to.emit(
                      lotto,
                      "LottoEnter"
                  )
              })
              it("doesn't allow entrance when lotto is calculating", async () => {
                  await lotto.enterLotto({ value: lottoEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.send("evm_mine", [])
                  // We pretend to be a Chainlink Keeper
                  await lotto.performUpkeep([])
                  await expect(lotto.enterLotto({ value: lottoEntranceFee })).to.be.revertedWith(
                      "Lotto__NotOpen"
                  )
              })
          })

          describe("checkUpkeep", () => {
              it("returns false if lotto has no ETH", async () => {
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.send("evm_mine", [])
                  const { upkeepNeeded } = await lotto.callStatic.checkUpkeep([])
                  assert.isFalse(upkeepNeeded)
              })
              it("returns false if lotto isn't open", async () => {
                  await lotto.enterLotto({ value: lottoEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.send("evm_mine", [])
                  await lotto.performUpkeep([])
                  const { upkeepNeeded } = await lotto.callStatic.checkUpkeep([])
                  const lottoState = await lotto.getLottoState()
                  assert.isFalse(upkeepNeeded)
                  assert.equal(lottoState.toString(), "1")
              })
              it("returns false if enough time hasn't passed", async () => {
                  await lotto.enterLotto({ value: lottoEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() - 5]) // use a higher number here if this test fails
                  await network.provider.request({ method: "evm_mine", params: [] })
                  const { upkeepNeeded } = await lotto.callStatic.checkUpkeep("0x") // upkeepNeeded = (timePassed && isOpen && hasBalance && hasPlayers)
                  assert(!upkeepNeeded)
              })
              it("returns true if enough time has passed, has players, eth, and is open", async () => {
                  await lotto.enterLotto({ value: lottoEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
                  const { upkeepNeeded } = await lotto.callStatic.checkUpkeep("0x") // upkeepNeeded = (timePassed && isOpen && hasBalance && hasPlayers)
                  assert(upkeepNeeded)
              })
          })
          describe("performUpkeep", () => {
              it("it can only run if checkupkeep is true", async () => {
                  await lotto.enterLotto({ value: lottoEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
                  const tx = await lotto.performUpkeep([])
                  assert(tx)
              })
              it("reverts when checkupkeep is false", async () => {
                  await expect(lotto.performUpkeep([])).to.be.revertedWith("Lotto__UpkeepNotNeeded")
              })
              it("updates the raffle state, emits an event, and calls the VRF coordinator", async () => {
                  await lotto.enterLotto({ value: lottoEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
                  const txResponse = await lotto.performUpkeep([])
                  const txReceipt = await txResponse.wait(1)
                  const requestId: any = txReceipt.events[1].args.requestId
                  const lottoState = await lotto.getLottoState()
                  assert(requestId.toNumber() > 0)
                  assert(lottoState.toString() == "1")
              })
          })
          describe("fulfillRandomWords", () => {
              beforeEach(async () => {
                  await lotto.enterLotto({ value: lottoEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
              })
              it("can only be called after performUpkeep", async () => {
                  await expect(
                      vrfCoordinatorV2Mock.fulfillRandomWords(0, lotto.address)
                  ).to.be.revertedWith("nonexistent request")
                  await expect(
                      vrfCoordinatorV2Mock.fulfillRandomWords(1, lotto.address)
                  ).to.be.revertedWith("nonexistent request")
              })
              // The big one
              it("picks a winner, resets the lottery, and sends money", async () => {
                  const additionalEntrants = 6
                  const startingAccountIndex = 1
                  const accounts = await ethers.getSigners()
                  for (
                      let i = startingAccountIndex;
                      i < startingAccountIndex + additionalEntrants;
                      i++
                  ) {
                      const accountConnectedLotto = lotto.connect(accounts[i])
                      await accountConnectedLotto.enterLotto({ value: lottoEntranceFee })
                  }
                  const startingTimestamp = await lotto.getLastTimeStamp()
                  await new Promise<void>(async (resolve, reject) => {
                      lotto.once("WinnerPicked", async () => {
                          try {
                              const recentWinner = await lotto.getRecentWinner()
                              const endingTimestamp = await lotto.getLastTimeStamp()
                              const numPlayers = await lotto.getNumberOfPlayers()
                              const lottoState = await lotto.getLottoState()
                              const winnerEndingBalance = await accounts[2].getBalance()
                              console.log(recentWinner)

                              console.log(accounts.map((x) => x.address))
                              assert.equal(numPlayers.toString(), "0")
                              assert.equal(lottoState.toString(), "0")
                              assert(startingTimestamp < endingTimestamp)

                              console.log({
                                  winnerEndingBalance: winnerEndingBalance.toString(),
                                  finalBal: winnerStartingBalance
                                      .add(
                                          lottoEntranceFee
                                              .mul(additionalEntrants)
                                              .add(lottoEntranceFee)
                                              .toString()
                                      )
                                      .toString(),
                              })
                              assert.equal(
                                  winnerEndingBalance.toString(),
                                  winnerStartingBalance
                                      .add(
                                          lottoEntranceFee
                                              .mul(additionalEntrants)
                                              .add(lottoEntranceFee)
                                              .toString()
                                      )
                                      .toString()
                              )
                          } catch (e) {
                              reject(e)
                          }
                          resolve()
                      })
                      const winnerStartingBalance = await accounts[2].getBalance()
                      const tx = await lotto.performUpkeep([])
                      const txReceipt = await tx.wait(1)
                      await vrfCoordinatorV2Mock.fulfillRandomWords(
                          txReceipt.events[1].args.requestId,
                          lotto.address
                      )
                  })
              })
          })
      })
