import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
const { default: Web3 } = require("web3");
const ViewActeNaissance = () => {
  const [acteNaissance, setActeNaissance] = useState({
    id: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuNaissance: "",
    sexe: "",
    nationalite: "",
    pere: "",
    mere: "",
  });

  const [searchInput, setSearchInput] = useState("");
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const interactWithBlockchain = async () => {
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
    const contractAddress = "0x9546a8f4738b33DBD9EFf9fBDe32c6D721C76552";
    const MyContract = new web3.eth.Contract(abi, contractAddress);

    try {
      const acteId = parseInt(searchInput);
      const acteData = await MyContract.methods.getActe(acteId).call();
      if (acteData.id === 0) {
        setNotFound(true);
      } else {
        setActeNaissance({
          id: acteId,
          nom: acteData.nom,
          prenom: acteData.prenom,
          dateNaissance: acteData.dateNaissance,
          lieuNaissance: acteData.lieuNaissance,
          sexe: acteData.sexe,
          nationalite: acteData.nationalite,
          pere: acteData.pere,
          mere: acteData.mere,
        });
      }
      setSearched(true);
    } catch (error) {
      console.error(error);
    }
  };
  /*const loadActe = () => {
      fetch(`http://localhost:8080/api/actes/naissance/transactions/id/${6}`)
      .then((response) => response.json())
      .then((data) => {
        setActeNaissance(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };*/

  const handleSearch = () => {
    interactWithBlockchain();
  };

  useEffect(() => {
    if (searched) {
      interactWithBlockchain();
    }
  }, [searched]);

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8"></Col>
                  <Col className="text-right">
                    <form>
                      <div className="navbar-search navbar-search-light form-inline d-md-flex ml-lg-auto">
                        <Input
                          type="text"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          placeholder="Entrer le numéro d'acte"
                          className="mr-2"
                        />
                        <Button onClick={handleSearch} color="primary">
                          Rechercher
                        </Button>
                      </div>
                    </form>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {searched && !notFound ? (
                  <div>
                    <Form>
                      <h6 className="heading-small text-muted mb-4">
                        Informations d'acte de naissance
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Acte nº :
                              </label>
                              <span className="form-control-label">
                                {acteNaissance.id}
                              </span>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Prenom :{" "}
                              </label>
                              <span className="form-control-label">
                                {acteNaissance.prenom}
                              </span>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Nom :{" "}
                              </label>
                              <span className="form-control-label">
                                {acteNaissance.nom}
                              </span>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Né(e) le :
                              </label>
                              <span className="form-control-label">
                                {acteNaissance.dateNaissance}
                              </span>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">à : </label>
                              <span className="form-control-label">
                                {acteNaissance.lieuNaissance}
                              </span>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Sexe :{" "}
                              </label>
                              <span className="form-control-label">
                                {acteNaissance.sexe}
                              </span>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Nationalite :
                              </label>
                              <span className="form-control-label">
                                {acteNaissance.nationalite}
                              </span>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Fils de :
                              </label>
                              <span className="form-control-label">
                                {acteNaissance.pere}
                              </span>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Et de :{" "}
                              </label>
                              <span className="form-control-label">
                                {acteNaissance.mere}
                              </span>
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <Row>
                        <Col lg="4">
                          <div className="text-left" xs="4"></div>
                        </Col>
                        <Col>
                          <div className="text-right" xs="4">
                            <Button type="submit" color="primary">
                              Imprimer l'acte
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                ) : (
                  <div className="text-center">
                    Aucun acte ne correspond au numéro fourni
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ViewActeNaissance;
