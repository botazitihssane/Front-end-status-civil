import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";

const { default: Web3 } = require("web3");
const ActeDeces = () => {
  const [annexe, setAnnexe] = useState();
  const [officier, setOfficier] = useState();
  const getUserInfo = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setOfficier(user);
      const userRole = user.roles[0];
      if (userRole === "ROLE_OFFICIER") {
        fetch(`http://localhost:8080/api/officier/annexe/${user.id}`)
          .then((response) => response.json())
          .then((data) => {
            setAnnexe(data);
            if (data.id) {
              console.log(data);
              loadRegistres(data.id);
              // Set the concatenated value in acteNaissance
              setActeDeces({
                ...acteDeces,
                officier: { id: officier.id, username: officier.username },
              });
            }
          });
      }
    } else {
      console.log("User data not found in localStorage");
    }
    console.log(annexe);
  };
  const [acteDeces, setActeDeces] = useState({
    typeEnregistrement: "acteDeces",
    dateEnregistrement: new Date().toISOString().slice(0, 10),
    registre: {
      id: "",
    },
    nom: "",
    prenom: "",
    causeDeces: "",
    dateDeces: "",
    heureDeces: "",
    lieuDeces: "",
    personne: {
      id: "",
    },
    officier: {
      id: "",
    },
    // declarant: "",
    // relationAvecDefunt: "",
    // conjoint: "",
    mere: "",
    pere: "",
    profession: "",
    adresse: "",
    dateNaissance: "",
    lieuNaissance: "",
  });
  const [personnes, setPersonnes] = useState({
    defunt: {
      cin: "",
    },
    //  declarant: {
    //    cin: "",
    //  },
    //  conjoint: {
    //    cin: "",
    //  },
  });

  const onInputChange = (e) => {
    setActeDeces({ ...acteDeces, [e.target.name]: e.target.value });
  };

  const onPersonneInputChange = (e) => {
    if (e.target.name === "defunt") {
      setPersonnes({ ...personnes, defunt: { cin: e.target.value } });
    } else if (e.target.name === "declarant") {
      setPersonnes({ ...personnes, declarant: { cin: e.target.value } });
    } else if (e.target.name === "conjoint") {
      setPersonnes({ ...personnes, conjoint: { cin: e.target.value } });
    }
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    const cins = [
      personnes.defunt.cin,
      //   personnes.declarant.cin,
      // personnes.conjoint.cin,
    ];
    const fetchedData = [];

    await Promise.all(
      cins.map(async (cin) => {
        const response = await fetch(
          `http://localhost:8080/api/personne/cin/${cin}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        fetchedData.push(data);
      })
    );

    setActeDeces((prevActeDeces) => ({
      ...prevActeDeces,
      nom: fetchedData[0].nom,
      prenom: fetchedData[0].prenom,
      adresse: fetchedData[0].adresse,
      profession: fetchedData[0].profession,
      dateNaissance: fetchedData[0].dateNaissance,
      lieuNaissance: fetchedData[0].lieuNaissance,
      personne: { id: fetchedData[0].id },
      //   declarant: fetchedData[1].nom + " " + fetchedData[1].prenom,
      //   conjoint: fetchedData[2].nom + " " + fetchedData[2].prenom,
    }));
    console.log(fetchedData);
    const idPereDefunt = fetchedData[0].pere;
    const idMereDefunt = fetchedData[0].mere;
    fetchPere(idPereDefunt.id);
    fetchMere(idMereDefunt.id);
  };

  const fetchPere = (id) => {
    fetch(`http://localhost:8080/api/personne/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setActeDeces((prevActeDeces) => ({
          ...prevActeDeces,
          pere: data.nom + " " + data.prenom,
        }));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const fetchMere = (id) => {
    fetch(`http://localhost:8080/api/personne/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setActeDeces((prevActeDeces) => ({
          ...prevActeDeces,
          mere: data.nom + " " + data.prenom,
        }));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...acteDeces };
    interactWithBlockChain(acteDeces);
    let data = JSON.stringify(dataToSend);
    console.log(data);
    let head = { "Content-Type": "application/json" };
    fetch("http://localhost:8080/api/enregistrement", {
      method: "POST",
      headers: head,
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [registres, setRegistres] = useState([]);
  const [selectedRegistre, setSelectedRegistre] = useState("");

  const loadRegistres = (annexe) => {
    fetch(`http://localhost:8080/api/registre/annexe/${annexe}`)
      .then((response) => response.json())
      .then((data) => {
        setRegistres(data);
      });
  };
  const onRegisteInputChange = (e) => {
    const selectedRegistreId = e.target.value;
    setSelectedRegistre(selectedRegistreId);
    setActeDeces({
      ...acteDeces,
      registre: {
        id: selectedRegistreId,
      },
    });
    console.log("selected registre " + selectedRegistreId);
  };
  const interactWithBlockChain = async (acteData) => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:7545")
    );
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
            name: "dateDeces",
            type: "string",
          },
          {
            name: "lieuDeces",
            type: "string",
          },
          {
            name: "dateNaissance",
            type: "string",
          },
          {
            name: "lieuNaissance",
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
            name: "profession",
            type: "string",
          },
          {
            name: "adresse",
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
            name: "_dateDeces",
            type: "string",
          },
          {
            name: "_lieuDeces",
            type: "string",
          },
          {
            name: "_dateNaissance",
            type: "string",
          },
          {
            name: "_lieuNaissance",
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
          {
            name: "_profession",
            type: "string",
          },
          {
            name: "_adresse",
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
                name: "dateDeces",
                type: "string",
              },
              {
                name: "lieuDeces",
                type: "string",
              },
              {
                name: "dateNaissance",
                type: "string",
              },
              {
                name: "lieuNaissance",
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
                name: "profession",
                type: "string",
              },
              {
                name: "adresse",
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
    const contractAddress = "0x113EBCa41e9727860F2034ccC6256B1A359D0F81";

    const MyContract = new web3.eth.Contract(abi, contractAddress);

    const providersAccounts = await web3.eth.getAccounts();
    const defaultAccount = providersAccounts[0];

    try {
      const tx = await MyContract.methods
        .ajouterActe(
          acteData.officier.username,
          acteData.nom,
          acteData.prenom,
          acteData.dateDeces,
          acteData.lieuDeces,
          acteData.mere,
          acteData.pere,
          acteData.profession,
          acteData.adresse,
          acteData.dateNaissance,
          acteData.lieuNaissance
        )
        .send({
          from: defaultAccount,
          gas: 400000,
          gasPrice: 10000000000,
        });

      console.log("Transaction Hash : " + tx.transactionHash);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Ajouter un acte de deces</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => onSubmit(e)}>
                  <h6 className="heading-small text-muted mb-4">
                    Informations de l'acte de deces
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-arrondissement"
                          >
                            Registre Appartenant
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nom-arrondissement"
                            placeholder="Arrondissement"
                            type="select"
                            name="arrondissement"
                            onChange={(e) => onRegisteInputChange(e)}
                            value={selectedRegistre}
                          >
                            <option value="" disabled hidden>
                              Registre
                            </option>
                            {registres.map((registre) => (
                              <option key={registre.id} value={registre.id}>
                                {registre.nomRegistre}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-defunt"
                          >
                            Defunt
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-defunt"
                            placeholder="Defunt"
                            name="defunt"
                            type="text"
                            onChange={(e) => onPersonneInputChange(e)}
                            value={personnes.defunt.cin}
                          ></Input>
                        </FormGroup>
                        <span>{acteDeces.defunt}</span>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-causeDeces"
                          >
                            Cause de deces
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-causeDeces"
                            placeholder="Cause de deces"
                            name="causeDeces"
                            type="text"
                            onChange={(e) => onInputChange(e)}
                            value={acteDeces.causeDeces}
                          ></Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-dateDeces"
                          >
                            Date de deces
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-dateDeces"
                            placeholder="Date de deces "
                            type="date"
                            name="dateDeces"
                            onChange={(e) => onInputChange(e)}
                            value={acteDeces.dateDeces}
                          ></Input>
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-heureDeces"
                          >
                            Heure de deces
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-heureDeces"
                            placeholder="Heure de deces "
                            type="time"
                            name="heureDeces"
                            onChange={(e) => onInputChange(e)}
                            value={acteDeces.heureDeces}
                          ></Input>
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-lieuDeces"
                          >
                            Lieu de deces
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-lieuDeces"
                            placeholder="Lieu de deces"
                            name="lieuDeces"
                            type="text"
                            onChange={(e) => onInputChange(e)}
                            value={acteDeces.lieuDeces}
                          ></Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Informations sur le conjoint
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <div className="text-right" xs="4">
                          <Button
                            type="button"
                            color="primary"
                            onClick={submitSearch}
                          >
                            Verifier les Informations
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="text-right" xs="4">
                    <Button type="submit" color="primary">
                      Enregistrer les données{" "}
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ActeDeces;
