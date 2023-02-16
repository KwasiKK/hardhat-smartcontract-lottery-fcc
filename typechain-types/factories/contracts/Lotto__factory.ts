/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BytesLike,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Lotto, LottoInterface } from "../../contracts/Lotto";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "vrfCoordinatorV2",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "entranceFee",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "gasLane",
        type: "bytes32",
      },
      {
        internalType: "uint64",
        name: "subscriptionId",
        type: "uint64",
      },
      {
        internalType: "uint32",
        name: "callbackGasLimit",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "interval",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Lotto__NotEnoughETHEntered",
    type: "error",
  },
  {
    inputs: [],
    name: "Lotto__NotOpen",
    type: "error",
  },
  {
    inputs: [],
    name: "Lotto__TransferFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numPlayers",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lottoState",
        type: "uint256",
      },
    ],
    name: "Lotto__UpkeepNotNeeded",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "have",
        type: "address",
      },
      {
        internalType: "address",
        name: "want",
        type: "address",
      },
    ],
    name: "OnlyCoordinatorCanFulfill",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "LottoEnter",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "RequestedLottoWinner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "WinnerPicked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "checkUpkeep",
    outputs: [
      {
        internalType: "bool",
        name: "upkeepNeeded",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "enterLotto",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntranceFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInterval",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastTimeStamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLottoState",
    outputs: [
      {
        internalType: "enum Lotto.LottoState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumWords",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfPlayers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getPlayer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRecentWinner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRequestConfirmations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getSubscriptionId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "randomWords",
        type: "uint256[]",
      },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6101606040523480156200001257600080fd5b506040516200188238038062001882833981810160405281019062000038919062000294565b858073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050508460a081815250508573ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff16815250508360e081815250508267ffffffffffffffff166101008167ffffffffffffffff16815250508163ffffffff166101208163ffffffff16815250506000600260006101000a81548160ff021916908360018111156200010d576200010c62000330565b5b0217905550426001819055508061014081815250505050505050506200035f565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001608262000133565b9050919050565b620001728162000153565b81146200017e57600080fd5b50565b600081519050620001928162000167565b92915050565b6000819050919050565b620001ad8162000198565b8114620001b957600080fd5b50565b600081519050620001cd81620001a2565b92915050565b6000819050919050565b620001e881620001d3565b8114620001f457600080fd5b50565b6000815190506200020881620001dd565b92915050565b600067ffffffffffffffff82169050919050565b6200022d816200020e565b81146200023957600080fd5b50565b6000815190506200024d8162000222565b92915050565b600063ffffffff82169050919050565b6200026e8162000253565b81146200027a57600080fd5b50565b6000815190506200028e8162000263565b92915050565b60008060008060008060c08789031215620002b457620002b36200012e565b5b6000620002c489828a0162000181565b9650506020620002d789828a01620001bc565b9550506040620002ea89828a01620001f7565b9450506060620002fd89828a016200023c565b93505060806200031089828a016200027d565b92505060a06200032389828a01620001bc565b9150509295509295509295565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60805160a05160c05160e0516101005161012051610140516114ac620003d6600039600081816106b501526108920152600061057301526000818161055001526108c40152600061052f015260006104f3015260008181610340015261072101526000818161036601526103ba01526114ac6000f3fe6080604052600436106100dd5760003560e01c80636e04ff0d1161007f578063c1c244e811610059578063c1c244e81461027e578063de3d9fb7146102a9578063e55ae4e8146102d4578063fd6673f514610311576100dd565b80636e04ff0d1461020b57806390b841ec1461024957806391ad27b414610253576100dd565b80634585e33b116100bb5780634585e33b14610161578063473f1ddc1461018a57806353a2c19a146101b55780635f1b0fd8146101e0576100dd565b806309bc33a7146100e25780631fe543e31461010d5780632aea97fe14610136575b600080fd5b3480156100ee57600080fd5b506100f761033c565b6040516101049190610c36565b60405180910390f35b34801561011957600080fd5b50610134600480360381019061012f9190610dea565b610364565b005b34801561014257600080fd5b5061014b610424565b6040516101589190610ebd565b60405180910390f35b34801561016d57600080fd5b5061018860048036038101906101839190610f33565b61043b565b005b34801561019657600080fd5b5061019f61062c565b6040516101ac9190610fc1565b60405180910390f35b3480156101c157600080fd5b506101ca610656565b6040516101d79190610c36565b60405180910390f35b3480156101ec57600080fd5b506101f5610665565b6040516102029190610c36565b60405180910390f35b34801561021757600080fd5b50610232600480360381019061022d9190611091565b610672565b604051610240929190611174565b60405180910390f35b61025161071f565b005b34801561025f57600080fd5b5061026861088e565b6040516102759190610c36565b60405180910390f35b34801561028a57600080fd5b506102936108b6565b6040516102a09190610c36565b60405180910390f35b3480156102b557600080fd5b506102be6108c0565b6040516102cb9190610c36565b60405180910390f35b3480156102e057600080fd5b506102fb60048036038101906102f691906111a4565b6108f2565b6040516103089190610fc1565b60405180910390f35b34801561031d57600080fd5b50610326610939565b6040516103339190610c36565b60405180910390f35b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461041657337f00000000000000000000000000000000000000000000000000000000000000006040517f1cf993f400000000000000000000000000000000000000000000000000000000815260040161040d9291906111d1565b60405180910390fd5b6104208282610945565b5050565b6000600260009054906101000a900460ff16905090565b600061045560405180602001604052806000815250610672565b509050806104c45747600080549050600260009054906101000a900460ff16600181111561048657610485610e46565b5b6040517f42e842cb0000000000000000000000000000000000000000000000000000000081526004016104bb939291906111fa565b60405180910390fd5b6001600260006101000a81548160ff021916908360018111156104ea576104e9610e46565b5b021790555060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16635d3b1d307f00000000000000000000000000000000000000000000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000060037f000000000000000000000000000000000000000000000000000000000000000060016040518663ffffffff1660e01b81526004016105b49594939291906112a9565b6020604051808303816000875af11580156105d3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f79190611311565b9050807ffd88a31c32406b28590b7ce7963258d44afe17df853230d7866b5ce79ba08cd160405160405180910390a250505050565b6000600260019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600163ffffffff16905090565b6000600361ffff16905090565b600060606000600260009054906101000a900460ff16600181111561069a57610699610e46565b5b600060018111156106ae576106ad610e46565b5b14905060007f0000000000000000000000000000000000000000000000000000000000000000600154426106e2919061136d565b119050600080600080549050119050600080471190508380156107025750825b801561070b5750815b80156107145750805b955050505050915091565b7f0000000000000000000000000000000000000000000000000000000000000000341015610779576040517fe6cb0a6e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600181111561078d5761078c610e46565b5b600260009054906101000a900460ff1660018111156107af576107ae610e46565b5b146107e6576040517fb30eebe400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff167f1dcd09d5d34186d758ca3a0b597a773e80b5b1febddac88410eced5d743cc7f660405160405180910390a2565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b6000600154905090565b60007f000000000000000000000000000000000000000000000000000000000000000067ffffffffffffffff16905090565b6000808281548110610907576109066113a1565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008080549050905090565b60008080549050826000815181106109605761095f6113a1565b5b602002602001015161097291906113ff565b90506000808281548110610989576109886113a1565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905080600260016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600260006101000a81548160ff02191690836001811115610a1d57610a1c610e46565b5b0217905550600067ffffffffffffffff811115610a3d57610a3c610ca7565b5b604051908082528060200260200182016040528015610a6b5781602001602082028036833780820191505090505b5060009080519060200190610a81929190610b76565b504260018190555060008173ffffffffffffffffffffffffffffffffffffffff1647604051610aaf90611461565b60006040518083038185875af1925050503d8060008114610aec576040519150601f19603f3d011682016040523d82523d6000602084013e610af1565b606091505b5050905080610b2c576040517f0eb4e47f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff167f5b690ec4a06fe979403046eaeea5b3ce38524683c3001f662c8b5a829632f7df60405160405180910390a25050505050565b828054828255906000526020600020908101928215610bef579160200282015b82811115610bee5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610b96565b5b509050610bfc9190610c00565b5090565b5b80821115610c19576000816000905550600101610c01565b5090565b6000819050919050565b610c3081610c1d565b82525050565b6000602082019050610c4b6000830184610c27565b92915050565b6000604051905090565b600080fd5b600080fd5b610c6e81610c1d565b8114610c7957600080fd5b50565b600081359050610c8b81610c65565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610cdf82610c96565b810181811067ffffffffffffffff82111715610cfe57610cfd610ca7565b5b80604052505050565b6000610d11610c51565b9050610d1d8282610cd6565b919050565b600067ffffffffffffffff821115610d3d57610d3c610ca7565b5b602082029050602081019050919050565b600080fd5b6000610d66610d6184610d22565b610d07565b90508083825260208201905060208402830185811115610d8957610d88610d4e565b5b835b81811015610db25780610d9e8882610c7c565b845260208401935050602081019050610d8b565b5050509392505050565b600082601f830112610dd157610dd0610c91565b5b8135610de1848260208601610d53565b91505092915050565b60008060408385031215610e0157610e00610c5b565b5b6000610e0f85828601610c7c565b925050602083013567ffffffffffffffff811115610e3057610e2f610c60565b5b610e3c85828601610dbc565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028110610e8657610e85610e46565b5b50565b6000819050610e9782610e75565b919050565b6000610ea782610e89565b9050919050565b610eb781610e9c565b82525050565b6000602082019050610ed26000830184610eae565b92915050565b600080fd5b60008083601f840112610ef357610ef2610c91565b5b8235905067ffffffffffffffff811115610f1057610f0f610ed8565b5b602083019150836001820283011115610f2c57610f2b610d4e565b5b9250929050565b60008060208385031215610f4a57610f49610c5b565b5b600083013567ffffffffffffffff811115610f6857610f67610c60565b5b610f7485828601610edd565b92509250509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610fab82610f80565b9050919050565b610fbb81610fa0565b82525050565b6000602082019050610fd66000830184610fb2565b92915050565b600080fd5b600067ffffffffffffffff821115610ffc57610ffb610ca7565b5b61100582610c96565b9050602081019050919050565b82818337600083830152505050565b600061103461102f84610fe1565b610d07565b9050828152602081018484840111156110505761104f610fdc565b5b61105b848285611012565b509392505050565b600082601f83011261107857611077610c91565b5b8135611088848260208601611021565b91505092915050565b6000602082840312156110a7576110a6610c5b565b5b600082013567ffffffffffffffff8111156110c5576110c4610c60565b5b6110d184828501611063565b91505092915050565b60008115159050919050565b6110ef816110da565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561112f578082015181840152602081019050611114565b60008484015250505050565b6000611146826110f5565b6111508185611100565b9350611160818560208601611111565b61116981610c96565b840191505092915050565b600060408201905061118960008301856110e6565b818103602083015261119b818461113b565b90509392505050565b6000602082840312156111ba576111b9610c5b565b5b60006111c884828501610c7c565b91505092915050565b60006040820190506111e66000830185610fb2565b6111f36020830184610fb2565b9392505050565b600060608201905061120f6000830186610c27565b61121c6020830185610c27565b6112296040830184610c27565b949350505050565b6000819050919050565b61124481611231565b82525050565b600067ffffffffffffffff82169050919050565b6112678161124a565b82525050565b600061ffff82169050919050565b6112848161126d565b82525050565b600063ffffffff82169050919050565b6112a38161128a565b82525050565b600060a0820190506112be600083018861123b565b6112cb602083018761125e565b6112d8604083018661127b565b6112e5606083018561129a565b6112f2608083018461129a565b9695505050505050565b60008151905061130b81610c65565b92915050565b60006020828403121561132757611326610c5b565b5b6000611335848285016112fc565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061137882610c1d565b915061138383610c1d565b925082820390508181111561139b5761139a61133e565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061140a82610c1d565b915061141583610c1d565b925082611425576114246113d0565b5b828206905092915050565b600081905092915050565b50565b600061144b600083611430565b91506114568261143b565b600082019050919050565b600061146c8261143e565b915081905091905056fea264697066735822122045a6c9dbb1de21bfa2a36c02106ae1107aa8bef6feaa00b64086001ec2dabe4364736f6c63430008110033";

type LottoConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LottoConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Lotto__factory extends ContractFactory {
  constructor(...args: LottoConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    vrfCoordinatorV2: PromiseOrValue<string>,
    entranceFee: PromiseOrValue<BigNumberish>,
    gasLane: PromiseOrValue<BytesLike>,
    subscriptionId: PromiseOrValue<BigNumberish>,
    callbackGasLimit: PromiseOrValue<BigNumberish>,
    interval: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Lotto> {
    return super.deploy(
      vrfCoordinatorV2,
      entranceFee,
      gasLane,
      subscriptionId,
      callbackGasLimit,
      interval,
      overrides || {}
    ) as Promise<Lotto>;
  }
  override getDeployTransaction(
    vrfCoordinatorV2: PromiseOrValue<string>,
    entranceFee: PromiseOrValue<BigNumberish>,
    gasLane: PromiseOrValue<BytesLike>,
    subscriptionId: PromiseOrValue<BigNumberish>,
    callbackGasLimit: PromiseOrValue<BigNumberish>,
    interval: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      vrfCoordinatorV2,
      entranceFee,
      gasLane,
      subscriptionId,
      callbackGasLimit,
      interval,
      overrides || {}
    );
  }
  override attach(address: string): Lotto {
    return super.attach(address) as Lotto;
  }
  override connect(signer: Signer): Lotto__factory {
    return super.connect(signer) as Lotto__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LottoInterface {
    return new utils.Interface(_abi) as LottoInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Lotto {
    return new Contract(address, _abi, signerOrProvider) as Lotto;
  }
}
