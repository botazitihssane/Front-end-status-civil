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
  const [selectedDeclarant, setSelectedDeclarant] = useState("");
  const [acteNaissance, setActeNaissance] = useState({
    typeEnregistrement: "acteNaissance",
    dateEnregistrement: "",
    lieuEnregistrement: "",
    registre: "",
    officierValidant: "",
    nom: "",
    prenom: "",
    typeNaissance: "",
    declarant: selectedDeclarant,
    relationAvecNouveauNe: "",
    pere: "",
    mere: "",
    sexe: "",
    nationalite: "",
    dateNaissance: "",
    lieuNaissance: "",
  });

  const [declarant, setDeclarant] = useState({
    cin: "",
    nom: "",
    prenom: "",
  });
  const [personne, setPersonne] = useState({
    id: "",
    nom: "",
    prenom: "",
  });
  const [selectedLieu, setSelectedLieu] = useState({
    id: "",
    name: "",
  });
  const [lieux, setLieux] = useState([]);
  const [registres, setRegistres] = useState([]);
  const [selectedRegistre, setSelectedRegistre] = useState("");
  const [officiers, setOfficiers] = useState([]);
  const [selectedOfficier, setSelectedOfficier] = useState("");
  //const [response, setResponse] = useState({ status: false });

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
    const contractAddress = "0x9546a8f4738b33DBD9EFf9fBDe32c6D721C76552";
    const MyContract = new web3.eth.Contract(abi, contractAddress);

    const providersAccounts = await web3.eth.getAccounts();
    const defaultAccount = providersAccounts[0];
    try {
      const tx = await MyContract.methods
        .ajouterActe(
          acteData.officierValidant,
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
  const onOfficierInputChange = (e) => {
    console.log(e.target.value);
    setSelectedOfficier({ ...selectedOfficier, id: e.target.value });
    setActeNaissance({ ...acteNaissance, officierValidant: e.target.value });
  };

  const onPersonneInputChange = (e) => {
    console.log(e.target.value);
    setPersonne({ ...personne, id: e.target.value });
  };

  const onDeclarantInputChange = (e) => {
    console.log(e.target.value);
    setDeclarant({ ...declarant, cin: e.target.value });
  };

  const onRegistreInputChange = (e) => {
    console.log(e.target.value);
    setSelectedRegistre({ ...selectedRegistre, nom: e.target.value });
    setActeNaissance({
      ...acteNaissance,
      registre: e.target.value,
    });
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
    interactWithBlockChain(acteNaissance);
    /* let data = JSON.stringify(acteNaissance);
    console.log(data);
    let head = { "Content-Type": "application/json" };
    fetch("http://localhost:8080/api/actes/naissance/transactions", {
      method: "POST",
      headers: head,
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(response);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });*/
  };

  const loadLieux = () => {
    fetch("http://localhost:8080/api/annexes")
      .then((response) => response.json())
      .then((data) => setLieux(data));
  };

  const onLieuInputChange = (e) => {
    const selectedLieuId = e.target.value;
    const selectedLieuName = e.target.options[e.target.selectedIndex].text;
    setSelectedLieu({ id: selectedLieuId, name: selectedLieuName });
    setActeNaissance({
      ...acteNaissance,
      lieuEnregistrement: selectedLieuName,
    });
    loadRegistres(selectedLieuId);
    console.log(selectedLieuName);
  };

  const loadRegistres = (annexe) => {
    fetch(`http://localhost:8080/api/registre/annexe/${annexe}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setRegistres(data))
      .catch((error) => {
        console.error("Fetch error:", error);
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
        }));
        fetchPere(data.pere.id);
        fetchMere(data.mere.id);
      });
  };

  const loadOfficiers = () => {
    fetch("http://localhost:8080/api/officiers")
      .then((response) => response.json())
      .then((data) => setOfficiers(data));
  };

  const fetchDeclarant = (cin) => {
    fetch(`http://localhost:8080/api/personne/cin/${cin}`)
      .then((response) => response.json())
      .then((data) => {
        const fullName = data.nom + " " + data.prenom;
        setSelectedDeclarant(fullName);
        setActeNaissance((prevActeNaissance) => ({
          ...prevActeNaissance,
          declarant: fullName,
        }));
      });
  };

  const submitSearch = (e) => {
    e.preventDefault();
    loadPersonne(personne.id);
    fetchDeclarant(declarant.cin);
    return false;
  };

  useEffect(() => {
    loadLieux();
    loadOfficiers();
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
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-arrondissement"
                          >
                            Date d'enregistrement
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nom-dateEnregistrement"
                            placeholder="Date d'enregistrement"
                            type="date"
                            name="dateEnregistrement"
                            onChange={(e) => onInputChange(e)}
                            value={acteNaissance.dateEnregistrement}
                          ></Input>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-lieuEnregistrement"
                          >
                            Lieu d'enregistrement
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nom-lieuEnregistrement"
                            placeholder="Lieu d'enregistrement"
                            type="select"
                            name="lieuEnregistrement"
                            onChange={(e) => onLieuInputChange(e)}
                            value={selectedLieu.id}
                          >
                            <option value="" disabled hidden>
                              Lieu d'enregistrement
                            </option>
                            {lieux.map((lieu) => (
                              <option key={lieu.id} value={lieu.id}>
                                {lieu.nomAnnexe}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-registre"
                          >
                            Registre Appartenant
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nom-registre"
                            placeholder="Registre Appartenant "
                            type="select"
                            name="registre"
                            onChange={(e) => onRegistreInputChange(e)}
                            value={selectedRegistre.nomRegistre}
                          >
                            <option value="">Registre Appartenant</option>
                            {registres.map((registre) => (
                              <option
                                key={registre.id}
                                value={registre.nomRegistre}
                              >
                                {registre.nomRegistre}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-officierValidant"
                          >
                            Officier Validant
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-officierValidant"
                            placeholder="Officier Validant"
                            name="officierValidant"
                            type="select"
                            onChange={(e) => onOfficierInputChange(e)}
                            value={selectedOfficier.id}
                          >
                            <option value="">Officier Validant</option>
                            {officiers.map((officier) => (
                              <option
                                key={officier.id}
                                value={
                                  officier.grade +
                                  " " +
                                  "" +
                                  officier.nom +
                                  " " +
                                  officier.prenom
                                }
                              >
                                {officier.grade} {officier.nom}{" "}
                                {officier.prenom}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
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
                      <Col lg="6">
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
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-declarant"
                          >
                            Declarant
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nom-declarant"
                            placeholder="Declarant"
                            type="text"
                            name="cin"
                            onChange={(e) => onDeclarantInputChange(e)}
                            value={declarant.cin}
                          />
                        </FormGroup>
                        {declarant.prenom || declarant.nom ? (
                          <div>
                            <label>Declarant: </label>
                            <span>
                              {selectedDeclarant.nom} {selectedDeclarant.prenom}
                            </span>
                          </div>
                        ) : null}
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-relationAvecNouveauNe"
                          >
                            Relation avec le nouveau né(e)
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-relationAvecNouveauNe"
                            placeholder="Relation avec le nouveau né(e)"
                            name="relationAvecNouveauNe"
                            type="text"
                            onChange={(e) => onInputChange(e)}
                            value={acteNaissance.relationAvecNouveauNe}
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
