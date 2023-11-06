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
const ActeNaissance = () => {
  const [annexe, setAnnexe] = useState();
  const [officier, setOfficier] = useState();

  const getUserInfo = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      console.log(user);
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
              setActeNaissance({
                ...acteNaissance,
                officier: { id: officier.id, username: officier.username },
              });
            }
          });
      }
    } else {
      console.log("User data not found in localStorage");
    }
  };

  const [acteNaissance, setActeNaissance] = useState({
    typeEnregistrement: "acteNaissance",
    dateEnregistrement: new Date().toISOString().slice(0, 10),
    registre: {
      id: "",
    },
    nom: "",
    prenom: "",
    personne: {
      id: "",
    },
    officier: {
      id: "",
    },
    typeNaissance: "",
    pere: "",
    mere: "",
    sexe: "",
    nationalite: "",
    dateNaissance: "",
    lieuNaissance: "",
  });

  const [personne, setPersonne] = useState({
    id: "",
    nom: "",
    prenom: "",
  });

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
    const contractAddress = "0xBEBE31CA3b4c9c655759Afe6Aa7f1B64A026f4CF";
    const MyContract = new web3.eth.Contract(abi, contractAddress);

    const providersAccounts = await web3.eth.getAccounts();
    const defaultAccount = providersAccounts[0];
    try {
      const tx = await MyContract.methods
        .ajouterActe(
          acteData.officier.username,
          acteData.nom,
          acteData.prenom,
          acteData.sexe,
          acteData.lieuNaissance,
          acteData.dateNaissance,
          acteData.nationalite,
          acteData.pere,
          acteData.mere
        )
        .send({
          from: defaultAccount,
          gas: 400000,
          gasPrice: 10000000000,
        });

      console.log("Transaction Hash: " + tx.transactionHash);
    } catch (error) {
      console.error(error);
    }
  };

  const onPersonneInputChange = (e) => {
    console.log(e.target.value);
    setPersonne({ ...personne, id: e.target.value });
  };

  const onInputChange = (e) => {
    setActeNaissance({ ...acteNaissance, [e.target.name]: e.target.value });
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
        setActeNaissance((prevActeDeces) => ({
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
        setActeNaissance((prevActeDeces) => ({
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
    const dataToSend = { ...acteNaissance };
    interactWithBlockChain(acteNaissance);
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

  const loadPersonne = (id) => {
    fetch(`http://localhost:8080/api/personne/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setActeNaissance((prevActeNaissance) => ({
          ...prevActeNaissance,
          nom: data.nom,
          prenom: data.prenom,
          sexe: data.sexe,
          nationalite: data.nationalite,
          dateNaissance: data.dateNaissance,
          lieuNaissance: data.lieuNaissance,
          personne: { id: data.id },
        }));
        console.log(data);
        fetchPere(data.pere.id);
        fetchMere(data.mere.id);
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
    setActeNaissance({
      ...acteNaissance,
      registre: {
        id: selectedRegistreId,
      },
    });
    console.log("selected registre " + selectedRegistreId);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    loadPersonne(personne.id);
    return false;
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Ajouter un acte de naissance</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => onSubmit(e)}>
                  <h6 className="heading-small text-muted mb-4">
                    Informations d'acte de naissance
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
                            htmlFor="input-nouveauNe"
                          >
                            Nouveau nee
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nom-nouveauNe"
                            placeholder="Nouveau né(e)"
                            type="number"
                            name="idPersonne"
                            onChange={(e) => onPersonneInputChange(e)}
                            value={personne.id}
                          />
                        </FormGroup>
                        {acteNaissance.prenom || acteNaissance.nom ? (
                          <div>
                            <label>Nouveau Né(e): </label>
                            <span>
                              {acteNaissance.nom} {acteNaissance.prenom}
                            </span>
                          </div>
                        ) : null}
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-typeNaissance"
                          >
                            Type de naissance
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-typeNaissance"
                            placeholder="Type de naissance"
                            name="typeNaissance"
                            type="text"
                            onChange={(e) => onInputChange(e)}
                            value={acteNaissance.typeNaissance}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <Row>
                    <Col lg="4">
                      <div className="text-left" xs="4">
                        <Button
                          type="button"
                          color="primary"
                          onClick={submitSearch}
                        >
                          Verifier les Informations
                        </Button>
                      </div>
                    </Col>
                    <Col>
                      <div className="text-right" xs="4">
                        <Button type="submit" color="primary">
                          Enregistrer les données{" "}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ActeNaissance;
