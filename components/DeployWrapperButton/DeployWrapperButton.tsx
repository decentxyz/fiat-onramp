import { ContractFactory, Signer } from "ethers";
import { useState } from "react";
import { useSigner } from "wagmi";
import abi from "../../lib/adapter-abi.json";
import handleTxError from "../../lib/handleTxError";

const DeployWrapperButton = () => {
  const { data: signer } = useSigner();
  const [deploying, setDeploying] = useState(false);

  const className = `${deploying ? "bg-blue-500/50" : "bg-blue-500"} ${
    !deploying && "hover:bg-blue-700"
  } text-white font-bold py-2 px-4 rounded`;

  const deployContract = async () => {
    try {
      console.log("deploy with bytecode", signer);
      const bytecode =
        "0x608060405234801561001057600080fd5b5060405161055038038061055083398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b6104bd806100936000396000f3fe60806040526004361061003f5760003560e01c8063150b7a021461004457806318160ddd1461008d57806394bf804d146100b0578063bca6ce64146100c5575b600080fd5b34801561005057600080fd5b5061006f61005f36600461031e565b630a85bd0160e11b949350505050565b6040516001600160e01b031990911681526020015b60405180910390f35b34801561009957600080fd5b506100a26100fd565b604051908152602001610084565b6100c36100be3660046103fa565b61017a565b005b3480156100d157600080fd5b506000546100e5906001600160a01b031681565b6040516001600160a01b039091168152602001610084565b60008060009054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610151573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101759190610426565b905090565b60008060009054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101ce573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101f29190610426565b60005460405163140e25ad60e31b8152600481018690529192506001600160a01b03169063a0712d689034906024016000604051808303818588803b15801561023a57600080fd5b505af115801561024e573d6000803e3d6000fd5b508493505050505b6102608483610455565b8110156102e6576000546040516323b872dd60e01b81523060048201526001600160a01b03858116602483015260448201849052909116906323b872dd90606401600060405180830381600087803b1580156102bb57600080fd5b505af11580156102cf573d6000803e3d6000fd5b5050505080806102de9061046e565b915050610256565b50505050565b80356001600160a01b038116811461030357600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561033457600080fd5b61033d856102ec565b935061034b602086016102ec565b925060408501359150606085013567ffffffffffffffff8082111561036f57600080fd5b818701915087601f83011261038357600080fd5b81358181111561039557610395610308565b604051601f8201601f19908116603f011681019083821181831017156103bd576103bd610308565b816040528281528a60208487010111156103d657600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561040d57600080fd5b8235915061041d602084016102ec565b90509250929050565b60006020828403121561043857600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b808201808211156104685761046861043f565b92915050565b6000600182016104805761048061043f565b506001019056fea264697066735822122023652babe15999e5ca249e76331850da4b6bc9bcf775e3485e2f0b96d058c58364736f6c63430008110033";
      const factory = new ContractFactory(abi, bytecode, signer as Signer);
      // factory.connect(signer);
      // If your contract requires constructor args, you can specify them here
      const contract = await factory.deploy(
        "0xf8D0Ad9F7C4e3E7d7D5629966D05671Ebd33931A"
      );

      console.log(contract.address);
      console.log(contract.deployTransaction);
    } catch (e) {
      handleTxError(e);
    }
  };

  const handleClick = async () => {
    setDeploying(true);
    await deployContract();
    setDeploying(false);
  };

  return (
    <button onClick={handleClick} disabled={deploying} className={className}>
      deploy
    </button>
  );
};

export default DeployWrapperButton;
