import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { useState } from "react";
import { Link } from "react-router-dom";

const Citoyen = () => {
  const [citoyen, setCitoyen] = useState({
    nom: "",
    prenom: "",
    sexe: "",
    numeroIdentification: "",
    dateNaissance: "",
    lieuNaissance: "",
    nationalite: "",
    adresse: "",
    ville: "",
    pays: "",
    profession: "",
    etatCivil: "",
    pere: {
      id: "",
    },
    mere: {
      id: "",
    },
  });

  const [parents, setParents] = useState({
    cinPere: "",
    cinMere: "",
    nomPere: "",
    prenomPere: "",
    nomMere: "",
    prenomMere: "",
  });

  const onParentInputChange = (e) => {
    console.log(e.target.value);
    setParents({ ...parents, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setCitoyen({ ...citoyen, [e.target.name]: e.target.value });
  };

  const [response, setResponse] = useState({ status: false });

  const fetchPere = (cinPere) => {
    fetch(`http://localhost:8080/api/personne/cin/${cinPere}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setParents({
            ...parents,
            nomPere: data.nom,
            prenomPere: data.prenom,
          });
          setCitoyen({ ...citoyen, pere: { id: data.id } });
        } else {
          console.error("Invalid or empty response from the server");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  const fetchMere = (cinMere) => {
    fetch(`http://localhost:8080/api/personne/cin/${cinMere}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data) {
          console.log(data);
          setParents({
            ...parents,
            nomMere: data.nom,
            prenomMere: data.prenom,
          });
          setCitoyen({ ...citoyen, mere: { id: data.id } });
        } else {
          console.error("Invalid or empty response from the server");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const submitSearch = (e) => {
    e.preventDefault();
    fetchPere(parents.cinPere);
    fetchMere(parents.cinMere);
    return false;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedCitoyen = { ...citoyen };
    if (updatedCitoyen.ville && updatedCitoyen.pays) {
      updatedCitoyen.adresse = `${updatedCitoyen.ville}, ${updatedCitoyen.pays}`;
    } else if (updatedCitoyen.ville) {
      updatedCitoyen.adresse = updatedCitoyen.ville;
    } else if (updatedCitoyen.pays) {
      updatedCitoyen.adresse = updatedCitoyen.pays;
    }
    delete updatedCitoyen.ville;
    delete updatedCitoyen.pays;

    let data = JSON.stringify(citoyen);
    console.log(data);
    let head = { "Content-Type": "application/json" };
    fetch("http://localhost:8080/api/personne", {
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
      });
  };

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
                    <h3 className="mb-0">Citoyen</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Link
                      to={"/agent/viewCitoyens"}
                      className="btn btn-primary"
                    >
                      Liste des citoyens
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => onSubmit(e)}>
                  <h6 className="heading-small text-muted mb-4">
                    Information sur la personne
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-nom-personne"
                          >
                            Nom
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nom-personne"
                            placeholder="Nom "
                            name="nom"
                            type="text"
                            onChange={(e) => onInputChange(e)}
                            value={citoyen.nom}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-prenom-personne"
                          >
                            Prenom
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-prenom-personne"
                            placeholder="Prenom "
                            name="prenom"
                            type="text"
                            onChange={(e) => onInputChange(e)}
                            value={citoyen.prenom}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-sexe"
                          >
                            Sexe
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-sexe"
                            placeholder="Sexe "
                            type="text"
                            name="sexe"
                            onChange={(e) => onInputChange(e)}
                            value={citoyen.sexe}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-cin"
                          >
                            Numero d'identitication
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-cin"
                            placeholder="Numero d'identification "
                            type="text"
                            name="numeroIdentification"
                            onChange={(e) => onInputChange(e)}
                            value={citoyen.numeroIdentification}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-date-naissance"
                          >
                            Date de naissance
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-date-naissance"
                            placeholder="Date de naissance"
                            type="date"
                            name="dateNaissance"
                            onChange={(e) => onInputChange(e)}
                            value={citoyen.dateNaissance}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-lieu-naissance"
                          >
                            Lieu de naissance
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-lieu-naissance"
                            placeholder="Lieu de naissance"
                            type="text"
                            name="lieuNaissance"
                            onChange={(e) => onInputChange(e)}
                            value={citoyen.lieuNaissance}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-nationalite"
                          >
                            Nationalite
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nationalite"
                            placeholder="Nationalite"
                            type="text"
                            name="nationalite"
                            onChange={(e) => onInputChange(e)}
                            value={citoyen.nationalite}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-adresse"
                          >
                            Adresse
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-adresse"
                            placeholder="Adresse"
                            type="text"
                            name="adresse"
                            onChange={(e) => onInputChange(e)}
                            value={citoyen.adresse}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-ville"
                          >
                            Ville
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-ville"
                            placeholder="Ville"
                            type="text"
                            name="ville"
                            onChange={(e) => onInputChange(e)}
                            value={citoyen.ville}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-pays"
                          >
                            Pays
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-pays"
                            placeholder="Pays"
                            type="text"
                            name="pays"
                            onChange={(e) => onInputChange(e)}
                            value={citoyen.pays}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-profession"
                          >
                            Profession
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-profession"
                            placeholder="Profession"
                            type="text"
                            name="profession"
                            onChange={(e) => onInputChange(e)}
                            value={citoyen.profession}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-etat-civil"
                          >
                            Etat civil
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-etat-civil"
                            placeholder="Etat civil"
                            type="text"
                            name="etatCivil"
                            onChange={(e) => onInputChange(e)}
                            value={citoyen.etatCivil}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Informations sur les parents
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="5">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-cin-pere"
                          >
                            CIN du Père
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-cin-pere"
                            placeholder="CIN du Père"
                            type="text"
                            name="cinPere"
                            onChange={(e) => onParentInputChange(e)}
                            value={parents.cinPere}
                          />
                        </FormGroup>
                        {parents.prenomPere || parents.nomPere ? (
                          <div className="parent-info">
                            <label className="parent-label">Père:</label>
                            <span className="parent-name">
                              {parents.nomPere} {parents.prenomPere}
                            </span>
                          </div>
                        ) : null}
                      </Col>
                      <Col lg="5">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-cin-mere"
                          >
                            CIN de la Mère
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-cin-mere"
                            placeholder="CIN de la Mère"
                            type="text"
                            name="cinMere"
                            onChange={(e) => onParentInputChange(e)}
                            value={parents.cinMere}
                          />
                        </FormGroup>
                        {parents.nomMere || parents.prenomMere ? (
                          <div className="parent-info">
                            <label className="parent-label">Mère:</label>
                            <span className="parent-name">
                              {parents.nomMere} {parents.prenomMere}
                            </span>
                          </div>
                        ) : null}
                      </Col>
                      <Col
                        lg="2"
                        className="d-flex align-items-center justify-content-center"
                      >
                        <Button
                          type="button"
                          color="primary"
                          onClick={submitSearch}
                        >
                          Rechercher
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <div className="text-right" xs="4">
                    <Button type="submit" color="primary" onClick={onSubmit}>
                      Enregistrer les données
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

export default Citoyen;
