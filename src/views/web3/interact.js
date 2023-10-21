const { default: Web3 } = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
const abi = [
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "record",
    outputs: [
      {
        name: "id",
        type: "uint256",
      },
      {
        name: "officierValidant",
        type: "string",
      },
      {
        name: "nom",
        type: "string",
      },
      {
        name: "prenom",
        type: "string",
      },
      {
        name: "pere",
        type: "string",
      },
      {
        name: "mere",
        type: "string",
      },
      {
        name: "sexe",
        type: "string",
      },
      {
        name: "lieuNaissance",
        type: "string",
      },
      {
        name: "dateNaissance",
        type: "string",
      },
      {
        name: "nationalite",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "recordCount",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        name: "officierValidant",
        type: "string",
      },
      {
        indexed: false,
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ActeAjoute",
    type: "event",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_officierValidant",
        type: "string",
      },
      {
        name: "_nom",
        type: "string",
      },
      {
        name: "_prenom",
        type: "string",
      },
      {
        name: "_sexe",
        type: "string",
      },
      {
        name: "_lieuNaissance",
        type: "string",
      },
      {
        name: "_dateNaissance",
        type: "string",
      },
      {
        name: "_nationalite",
        type: "string",
      },
      {
        name: "_pere",
        type: "string",
      },
      {
        name: "_mere",
        type: "string",
      },
    ],
    name: "ajouterActe",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getActe",
    outputs: [
      {
        components: [
          {
            name: "id",
            type: "uint256",
          },
          {
            name: "officierValidant",
            type: "string",
          },
          {
            name: "nom",
            type: "string",
          },
          {
            name: "prenom",
            type: "string",
          },
          {
            name: "pere",
            type: "string",
          },
          {
            name: "mere",
            type: "string",
          },
          {
            name: "sexe",
            type: "string",
          },
          {
            name: "lieuNaissance",
            type: "string",
          },
          {
            name: "dateNaissance",
            type: "string",
          },
          {
            name: "nationalite",
            type: "string",
          },
        ],
        name: "",
        type: "tuple",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
const contractAddress = "0x9546a8f4738b33DBD9EFf9fBDe32c6D721C76552";
const MyContract = new web3.eth.Contract(abi, contractAddress);

async function interact() {
  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];
  try {
    const tx = await MyContract.methods
      .ajouterActe(
        "OfficierName",
        "John",
        "Doe",
        "Male",
        "Paris",
        "01/01/2000",
        "French",
        "FatherName",
        "MotherName"
      )
      .send({
        from: defaultAccount,
        gas: 300000,
        gasPrice: 10000000000,
      });

    console.log("Transaction Hash: " + tx.transactionHash);
    const acteId = 1;
    const acte = await MyContract.methods.getActe(acteId).call();
    console.log("Retrieved Acte:", acte);
  } catch (error) {
    console.error(error);
  }
}

interact();
