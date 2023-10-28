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
  Input,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import PDF from "./PrintActeDeces";

const { default: Web3 } = require("web3");
const ViewActeDeces = () => {
  const [annexeData, setAnnexeData] = useState(null);
  const getUserInfo = () => {
    const userData = localStorage.getItem("user");
    console.log(userData);
    if (userData) {
      const user = JSON.parse(userData);
      const userRole = user.roles[0];
      if (userRole === "ROLE_OFFICIER") {
        fetch(`http://localhost:8080/api/officier/annexe/${user.id}`)
          .then((response) => response.json())
          .then((data) => {
            setAnnexeData(data);
          });
      }
    } else {
      console.log("User data not found in localStorage");
    }
    console.log(acteDeces);
  };

  const [acteDeces, setActeDeces] = useState({
    id: "",
    nom: "",
    prenom: "",
    dateDeces: "",
    lieuDeces: "",
    mere: "",
    pere: "",
    profession: "",
    adresse: "",
    dateNaissance: "",
    lieuNaissance: "",
    annexe: {},
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

    try {
      const acteId = parseInt(searchInput);
      const acteData = await MyContract.methods.getActe(acteId).call();
      if (acteData.id === 0) {
        setNotFound(true);
      } else {
        if (annexeData) {
          setActeDeces({
            id: acteId,
            nom: acteData.nom,
            prenom: acteData.prenom,
            dateDeces: acteData.dateDeces,
            lieuDeces: acteData.lieuDeces,
            mere: acteData.mere,
            pere: acteData.pere,
            profession: acteData.profession,
            adresse: acteData.adresse,
            dateNaissance: acteData.dateNaissance,
            lieuNaissance: acteData.lieuNaissance,
            annexe: annexeData,
          });
        }
      }
      setSearched(true);
    } catch (error) {
      console.error(error);
    }
  };
  /* const loadActe = () => {
    interactWithBlockchain();
     fetch(`http://localhost:8080/api/actes/deces/transactions/id/${2}`)
      .then((response) => response.json())
      .then((data) => {
        setActeDeces(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };*/
  const handleSearch = () => {
    interactWithBlockchain();
  };
  const [showPDF, setShowPDF] = useState(false);

  const handlePrintActe = () => {
    setShowPDF(true);
  };
  useEffect(() => {
    getUserInfo();
    if (searched) {
      interactWithBlockchain();
    }
  }, [searched]);
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
                        Informations d'acte de deces
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Acte nº :
                              </label>
                              <span className="form-control-label">
                                {acteDeces.id}
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
                                {acteDeces.prenom}
                              </span>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Nom :{" "}
                              </label>
                              <span className="form-control-label">
                                {acteDeces.nom}
                              </span>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Décédé(e) le :
                              </label>
                              <span className="form-control-label">
                                {acteDeces.dateDeces}
                              </span>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">à : </label>
                              <span className="form-control-label">
                                {acteDeces.lieuDeces}
                              </span>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Habitant :{" "}
                              </label>
                              <span className="form-control-label">
                                {acteDeces.adresse}
                              </span>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Profession :
                              </label>
                              <span className="form-control-label">
                                {acteDeces.profession}
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
                                {acteDeces.dateNaissance}
                              </span>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">à : </label>
                              <span className="form-control-label">
                                {acteDeces.lieuNaissance}
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
                                {acteDeces.pere}
                              </span>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Et de :{" "}
                              </label>
                              <span className="form-control-label">
                                {acteDeces.mere}
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
                            <Button
                              type="button"
                              color="primary"
                              onClick={handlePrintActe}
                            >
                              Imprimer l'acte
                            </Button>
                            {showPDF && <PDF acteDeces={acteDeces} />}
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
export default ViewActeDeces;
