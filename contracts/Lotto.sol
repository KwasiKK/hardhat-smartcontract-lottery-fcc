// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

error Lotto__NotEnoughETHEntered();
error Lotto__TransferFailed();
error Lotto__NotOpen();
error Lotto__UpkeepNotNeeded(uint256 balance, uint256 numPlayers, uint256 lottoState);

/**
 * @title A sample lotto contract
 * @author Kwasi Kgwete
 * @notice This contract is for creating an untamperable decentralized smart contract
 * @dev This contract implements Chanlink VRF v2 and Chainlink Keepers
 */
contract Lotto is VRFConsumerBaseV2, KeeperCompatibleInterface {
    /* Type Declaration */
    enum LottoState {
        OPEN,
        CALCULATING
    }

    /* State Variables */
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    bytes32 private immutable i_gasLane;
    uint64 private immutable i_subscriptionId;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private immutable i_callbackGasLimit;
    uint32 private constant NUM_WORDS = 1;
    uint256 private s_lastTimeStamp;
    uint256 private immutable i_interval;
    LottoState private s_lottoState;

    // Lottery Variables
    address private s_recentWinner;

    /* Events */
    event LottoEnter(address indexed player);
    event RequestedLottoWinner(uint256 indexed requestId);
    event WinnerPicked(address indexed winner);

    constructor(
        address vrfCoordinatorV2,
        uint256 entranceFee,
        bytes32 gasLane,
        uint64 subscriptionId,
        uint32 callbackGasLimit,
        uint256 interval
    ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_entranceFee = entranceFee;
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_gasLane = gasLane;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
        s_lottoState = LottoState.OPEN;
        s_lastTimeStamp = block.timestamp;
        i_interval = interval;
    }

    function enterLotto() public payable {
        if (msg.value < i_entranceFee) {
            revert Lotto__NotEnoughETHEntered();
        }
        if (s_lottoState != LottoState.OPEN) {
            revert Lotto__NotOpen();
        }
        s_players.push(payable(msg.sender));
        emit LottoEnter(msg.sender);
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        (bool upkeepNeeded, ) = checkUpkeep(bytes(""));
        if (!upkeepNeeded) {
            revert Lotto__UpkeepNotNeeded(
                address(this).balance,
                s_players.length,
                uint256(s_lottoState)
            );
        }
        s_lottoState = LottoState.CALCULATING;
        uint256 requestId = i_vrfCoordinator.requestRandomWords(
            i_gasLane, //keyHash,
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );
        emit RequestedLottoWinner(requestId);
        // s_requests[requestId] = RequestStatus({
        //     randomWords: new uint256[](0),
        //     exists: true,
        //     fulfilled: false
        // });
        // requestIds.push(requestId);
        // lastRequestId = requestId;
        // emit RequestSent(requestId, numWords);
        // return requestId;
    }

    function fulfillRandomWords(
        uint256 /* requestId */,
        uint256[] memory randomWords
    ) internal override {
        uint256 indexOfWinner = randomWords[0] % s_players.length;
        address payable recentWinner = s_players[indexOfWinner];
        s_recentWinner = recentWinner;
        s_lottoState = LottoState.OPEN;
        s_players = new address payable[](0);
        s_lastTimeStamp = block.timestamp;
        (bool success, ) = recentWinner.call{value: address(this).balance}("");
        if (!success) {
            revert Lotto__TransferFailed();
        }
        emit WinnerPicked(recentWinner);
    }

    /**
     * @dev This function is called by the Chainlink Keeper nodes
     * They look for the `upkeepNeeded` to return true
     */
    function checkUpkeep(
        bytes memory /* checkData */
    ) public view override returns (bool upkeepNeeded, bytes memory /* performData */) {
        bool isOpen = (LottoState.OPEN == s_lottoState);
        bool timePassed = ((block.timestamp - s_lastTimeStamp) > i_interval);
        bool hasPlayers = (s_players.length > 0);
        bool hasBalance = (address(this).balance > 0);
        upkeepNeeded = isOpen && timePassed && hasPlayers && hasBalance;
        // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
    }

    /* View / Pure functions */

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }

    function getRecentWinner() public view returns (address) {
        return s_recentWinner;
    }

    function getLottoState() public view returns (LottoState) {
        return s_lottoState;
    }

    // When pure, it won't read the data from storage
    // When you make a function for constants, use the pure keyword
    function getNumWords() public pure returns (uint256) {
        return NUM_WORDS;
    }

    function getNumberOfPlayers() public view returns (uint256) {
        return s_players.length;
    }

    function getLastTimeStamp() public view returns (uint256) {
        return s_lastTimeStamp;
    }

    function getRequestConfirmations() public pure returns (uint256) {
        return REQUEST_CONFIRMATIONS;
    }

    function getInterval() public view returns (uint256) {
        return i_interval;
    }

    function getSubscriptionId() public view returns (uint256) {
        return i_subscriptionId;
    }
}
