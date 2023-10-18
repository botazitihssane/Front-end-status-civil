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
const ActeDeces = () => {
  const [acteDeces, setActeDeces] = useState({
    typeEnregistrement: "acteDeces",
    dateEnregistrement: "",
    lieuEnregistrement: "",
    registre: "",
    officierValidant: "",
    nom: "",
    prenom: "",
    causeDeces: "",
    dateDeces: "",
    heureDeces: "",
    lieuDeces: "",
    declarant: "",
    relationAvecDefunt: "",
    conjoint: "",
    mere: "",
    pere: "",
    profession: "",
    adresse: "",
    dateNaissance: "",
    lieuNaissance: "",
  });

  const [response, setResponse] = useState({
    status: false,
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
  const [personnes, setPersonnes] = useState({
    defunt: {
      cin: "",
    },
    declarant: {
      cin: "",
    },
    conjoint: {
      cin: "",
    },
  });

  const onInputChange = (e) => {
    setActeDeces({ ...acteDeces, [e.target.name]: e.target.value });
  };

  const onRegistreInputChange = (e) => {
    setSelectedRegistre(e.target.value);
    setActeDeces({ ...acteDeces, registre: e.target.value });
  };

  const onOfficierInputChange = (e) => {
    setSelectedOfficier(e.target.value);
    setActeDeces({ ...acteDeces, officierValidant: e.target.value });
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

  const onLieuInputChange = (e) => {
    const selectedLieuId = e.target.value;
    const selectedLieuName = e.target.options[e.target.selectedIndex].text;
    setSelectedLieu({ id: selectedLieuId, name: selectedLieuName });
    setActeDeces({
      ...acteDeces,
      lieuEnregistrement: selectedLieuName,
    });
    loadRegistres(selectedLieuId);
    console.log(selectedLieuName);
  };

  const loadLieux = () => {
    fetch("http://localhost:8080/api/annexes")
      .then((response) => response.json())
      .then((data) => setLieux(data));
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

  const loadOfficiers = () => {
    fetch("http://localhost:8080/api/officiers")
      .then((response) => response.json())
      .then((data) => setOfficiers(data));
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    const cins = [
      personnes.defunt.cin,
      personnes.declarant.cin,
      personnes.conjoint.cin,
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
      declarant: fetchedData[1].nom + " " + fetchedData[1].prenom,
      conjoint: fetchedData[2].nom + " " + fetchedData[2].prenom,
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
    let data = JSON.stringify(acteDeces);
    console.log(data);
    let head = { "Content-Type": "application/json" };
    fetch("http://localhost:8080/api/actes/deces/transactions", {
      method: "POST",
      headers: head,
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadLieux();
    loadOfficiers();
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
                            value={acteDeces.dateEnregistrement}
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
                      <Col lg="6">
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
                    Informations sur le declarant
                  </h6>
                  <div className="pl-lg-4">
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
                            id="input-declarant"
                            placeholder="Declarant"
                            name="declarant"
                            type="text"
                            onChange={(e) => onPersonneInputChange(e)}
                            value={personnes.declarant.cin}
                          ></Input>
                        </FormGroup>
                        <span>{acteDeces.declarant}</span>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-relationAvecDefunt"
                          >
                            Relation avec le defunt
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-relationAvecDefunt"
                            placeholder="Relation avec le defunt"
                            name="relationAvecDefunt"
                            type="text"
                            onChange={(e) => onInputChange(e)}
                            value={acteDeces.relationAvecDefunt}
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
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-conjoint"
                          >
                            Conjoint
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-conjoint"
                            placeholder="Coinjoint"
                            name="conjoint"
                            type="text"
                            onChange={(e) => onPersonneInputChange(e)}
                            value={personnes.conjoint.cin}
                          ></Input>
                        </FormGroup>
                        <span>{acteDeces.conjoint}</span>
                      </Col>
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
