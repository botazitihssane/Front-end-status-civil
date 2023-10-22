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
const ActeMariage = () => {
  const [acteMariage, setActeMariage] = useState({
    typeEnregistrement: "acteMariage",
    dateEnregistrement: "",
    lieuEnregistrement: "",
    registre: "",
    officierValidant: "",
    lieuMariage: "",
    dateMariage: "",
    epoux: "",
    epouse: "",
    mereEpouse: "",
    pereEpouse: "",
    mereEpoux: "",
    pereEpoux: "",
    cinEpouse: "",
    cinEpoux: "",
    dateNaissanceEpouse: "",
    dateNaissanceEpoux: "",
    lieuNaissanceEpouse: "",
    lieuNaissanceEpoux: "",
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
  const [response, setResponse] = useState({ status: false });

  const [personne, setPersonne] = useState({
    epouse: {
      cin: "",
    },
    epoux: {
      cin: "",
    },
    mereEpouse: {
      cin: "",
    },
    pereEpouse: {
      cin: "",
    },
    mereEpoux: {
      cin: "",
    },
    pereEpoux: {
      cin: "",
    },
  });

  const onInputChange = (e) => {
    console.log(e.target.value);
    setActeMariage({ ...acteMariage, [e.target.name]: e.target.value });
  };

  const onOfficierInputChange = (e) => {
    console.log(e.target.value);
    setSelectedOfficier({ ...selectedOfficier, id: e.target.value });
    setActeMariage({
      ...acteMariage,
      officierValidant: e.target.value,
    });
  };

  const onRegistreInputChange = (e) => {
    console.log(e.target.value);
    setSelectedRegistre({ ...selectedRegistre, nom: e.target.value });
    setActeMariage({
      ...acteMariage,
      registre: e.target.value,
    });
  };

  const onLieuInputChange = (e) => {
    const selectedLieuId = e.target.value;
    const selectedLieuName = e.target.options[e.target.selectedIndex].text;
    setSelectedLieu({ id: selectedLieuId, name: selectedLieuName });
    setActeMariage({
      ...acteMariage,
      lieuEnregistrement: selectedLieuName,
    });
    loadRegistres(selectedLieuId);
    console.log(selectedLieuName);
  };

  const onPersonneInputChange = (e) => {
    console.log(e.target.value);
    if (e.target.name === "epouse") {
      setPersonne({ ...personne, epouse: { cin: e.target.value } });
    } else if (e.target.name === "epoux") {
      setPersonne({ ...personne, epoux: { cin: e.target.value } });
    } else if (e.target.name === "mereEpoux") {
      setPersonne({ ...personne, mereEpoux: { cin: e.target.value } });
    } else if (e.target.name === "pereEpoux") {
      setPersonne({ ...personne, pereEpoux: { cin: e.target.value } });
    } else if (e.target.name === "mereEpouse") {
      setPersonne({ ...personne, mereEpouse: { cin: e.target.value } });
    } else if (e.target.name === "pereEpouse") {
      setPersonne({ ...personne, pereEpouse: { cin: e.target.value } });
    }
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

  const loadLieux = () => {
    fetch("http://localhost:8080/api/annexes")
      .then((response) => response.json())
      .then((data) => {
        setLieux(data);
        console.log(data);
      });
  };

  const loadOfficiers = () => {
    fetch("http://localhost:8080/api/officiers")
      .then((response) => response.json())
      .then((data) => setOfficiers(data));
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    const cins = [
      personne.epouse.cin,
      personne.epoux.cin,
      personne.mereEpouse.cin,
      personne.pereEpouse.cin,
      personne.mereEpoux.cin,
      personne.pereEpoux.cin,
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
    setActeMariage((prevActeMariage) => ({
      ...prevActeMariage,
      epouse: fetchedData[0].nom + " " + fetchedData[0].prenom,
      cinEpouse: fetchedData[0].numeroIdentification,
      dateNaissanceEpouse: fetchedData[0].dateNaissance,
      lieuNaissanceEpouse: fetchedData[0].lieuNaissance,
      epoux: fetchedData[1].nom + " " + fetchedData[1].prenom,
      cinEpoux: fetchedData[1].numeroIdentification,
      dateNaissanceEpoux: fetchedData[1].dateNaissance,
      lieuNaissanceEpoux: fetchedData[1].lieuNaissance,
      mereEpouse: fetchedData[2].nom + " " + fetchedData[2].prenom,
      pereEpouse: fetchedData[3].nom + " " + fetchedData[3].prenom,
      mereEpoux: fetchedData[4].nom + " " + fetchedData[4].prenom,
      pereEpoux: fetchedData[5].nom + " " + fetchedData[5].prenom,
    }));

    console.log(fetchedData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    interactWithBlockChain(acteMariage);
    /* 
    let data = JSON.stringify(acteMariage);
    console.log(data);
    let head = { "Content-Type": "application/json" };
    fetch("http://localhost:8080/api/actes/mariage/transactions", {
      method: "POST",
      headers: head,
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setResponse(data);
      })
      .catch((error) => {
        console.error(error);
      });*/
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
            name: "lieuMariage",
            type: "string",
          },
          {
            name: "dateMariage",
            type: "string",
          },
          {
            name: "epouse",
            type: "string",
          },
          {
            name: "epoux",
            type: "string",
          },
          {
            name: "mereEpoux",
            type: "string",
          },
          {
            name: "pereEpoux",
            type: "string",
          },
          {
            name: "mereEpouse",
            type: "string",
          },
          {
            name: "pereEpouse",
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
            name: "_lieuMariage",
            type: "string",
          },
          {
            name: "_dateMariage",
            type: "string",
          },
          {
            name: "_epouse",
            type: "string",
          },
          {
            name: "_epoux",
            type: "string",
          },
          {
            name: "_mereEpoux",
            type: "string",
          },
          {
            name: "_pereEpoux",
            type: "string",
          },
          {
            name: "_mereEpouse",
            type: "string",
          },
          {
            name: "_pereEpouse",
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
                name: "lieuMariage",
                type: "string",
              },
              {
                name: "dateMariage",
                type: "string",
              },
              {
                name: "epouse",
                type: "string",
              },
              {
                name: "epoux",
                type: "string",
              },
              {
                name: "mereEpoux",
                type: "string",
              },
              {
                name: "pereEpoux",
                type: "string",
              },
              {
                name: "mereEpouse",
                type: "string",
              },
              {
                name: "pereEpouse",
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
    const contractAddress = "0xd7e6EE8efCfc491bBEB02F675a40317EAe584645";
    const MyContract = new web3.eth.Contract(abi, contractAddress);

    const providersAccounts = await web3.eth.getAccounts();
    const defaultAccount = providersAccounts[0];
    try {
      const tx = await MyContract.methods
        .ajouterActe(
          acteData.officierValidant,
          acteData.lieuMariage,
          acteData.dateMariage,
          acteData.epouse,
          acteData.epoux,
          acteData.mereEpouse,
          acteData.pereEpouse,
          acteData.mereEpoux,
          acteData.pereEpoux
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
  useEffect(() => {
    loadOfficiers();
    loadLieux();
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
                    <h3 className="mb-0">Ajouter un acte de mariage</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => onSubmit(e)}>
                  <h6 className="heading-small text-muted mb-4">
                    Informations de l'acte de mariage
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-dateEnregistrement"
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
                            value={acteMariage.dateEnregistrement}
                          />
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
                            htmlFor="input-dateMariage"
                          >
                            Date de mariage
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nom-dateMariage"
                            placeholder="Date de mariage "
                            type="date"
                            name="dateMariage"
                            onChange={(e) => onInputChange(e)}
                            value={acteMariage.dateMariage}
                          ></Input>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-lieuMariage"
                          >
                            Lieu de mariage
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-lieuMariage"
                            placeholder="Lieu de mariage"
                            name="lieuMariage"
                            type="text"
                            onChange={(e) => onInputChange(e)}
                            value={acteMariage.lieuMariage}
                          ></Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Informations sur les mariés
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-epouse"
                          >
                            Epouse
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-epouse"
                            placeholder="CIN de l'épouse"
                            type="text"
                            name="epouse"
                            onChange={(e) => onPersonneInputChange(e)}
                            value={personne.epouse.cin}
                          />
                        </FormGroup>
                        {acteMariage.pereEpouse ? (
                          <div>
                            <label>Epouse: </label>
                            <span>{acteMariage.epouse}</span>
                          </div>
                        ) : null}
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-epoux"
                          >
                            Epoux
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-epoux"
                            placeholder="CIN de l'époux"
                            type="text"
                            name="epoux"
                            onChange={(e) => onPersonneInputChange(e)}
                            value={personne.epoux.cin}
                          />
                        </FormGroup>
                        {acteMariage.epoux ? (
                          <div>
                            <label>Epoux: </label>
                            <span>{acteMariage.epoux}</span>
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Informations sur les parents de l'épouse
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-epouse"
                          >
                            Mere de l'épouse
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-mere/epouse"
                            placeholder="CIN de la mère de l'épouse"
                            type="text"
                            name="mereEpouse"
                            onChange={(e) => onPersonneInputChange(e)}
                            value={personne.mereEpouse.cin}
                          />
                        </FormGroup>
                        {acteMariage.mereEpouse ? (
                          <div>
                            <label>Mere de l'épouse: </label>
                            <span>{acteMariage.mereEpouse}</span>
                          </div>
                        ) : null}
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-pere-epouse"
                          >
                            Pere de l'épouse
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-pere-epouse"
                            placeholder="CIN du pere de l'épouse"
                            type="text"
                            name="pereEpouse"
                            onChange={(e) => onPersonneInputChange(e)}
                            value={personne.pereEpouse.cin}
                          />
                        </FormGroup>
                        {acteMariage.pereEpouse ? (
                          <div>
                            <label>Pere de l'épouse: </label>
                            <span>{acteMariage.pereEpouse}</span>
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Informations sur les parents de l'époux
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-mere-epoux"
                          >
                            Mere de l'époux
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-mere-epoux"
                            placeholder="CIN de la mère de l'époux"
                            type="text"
                            name="mereEpoux"
                            onChange={(e) => onPersonneInputChange(e)}
                            value={personne.mereEpoux.cin}
                          />
                        </FormGroup>
                        {acteMariage.mereEpoux ? (
                          <div>
                            <label>Mere de l'épouse: </label>
                            <span>{acteMariage.mereEpoux}</span>
                          </div>
                        ) : null}
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-pere-epoux"
                          >
                            Pere de l'époux
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-pere-epoux"
                            placeholder="CIN du pere de l'époux"
                            type="text"
                            name="pereEpoux"
                            onChange={(e) => onPersonneInputChange(e)}
                            value={personne.pereEpoux.cin}
                          />
                        </FormGroup>
                        {acteMariage.pereEpoux ? (
                          <div>
                            <label>Pere de l'époux: </label>
                            <span>{acteMariage.pereEpoux}</span>
                          </div>
                        ) : null}
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
export default ActeMariage;
