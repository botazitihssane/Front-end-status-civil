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
import { useLocation } from "react-router-dom";
  
  const EditCitoyen = () => {
    const location = useLocation();
    const object = location.state.citoyen;
    const [citoyen,setCitoyen] = useState({
        id:object.id,
        nom:object.nom,
        prenom:object.prenom,
        sexe:object.sexe,
        numeroIdentification:object.numeroIdentification,
        dateNaissance:object.dateNaissance,
        lieuNaissance:object.lieuNaissance,
        nationalite:object.nationalite,
        adresse:object.adresse,
        profession:object.profession,
        etatCivil:object.etatCivil
    });

    const onInputChange = (e) => {
      setCitoyen({...citoyen,[e.target.name]:e.target.value});
    }

    const [response,setResponse]=useState({status : false,});
 
    const onSubmit = async(e) => {
      e.preventDefault();
      let data = JSON.stringify(citoyen);
      console.log(data);
      let head = { "Content-Type": "application/json" };
      fetch('http://localhost:8080/api/personne',{
        method:"PUT",
        headers:head,
        body:data,
      })
      .then((response)=>response.json())
      .then((data)=>{
        setResponse(response);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    }
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
                      <h3 className="mb-0">Modifier le citoyen</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={(e)=> onSubmit(e)}>
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
                              onChange={(e)=>onInputChange(e)}
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
                              onChange={(e)=>onInputChange(e)}
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
                              onChange={(e)=>onInputChange(e)}
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
                              onChange={(e)=>onInputChange(e)}
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
                              onChange={(e)=>onInputChange(e)}
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
                              onChange={(e)=>onInputChange(e)}
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
                              onChange={(e)=>onInputChange(e)}
                              value={citoyen.nationalite}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
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
                              onChange={(e)=>onInputChange(e)}
                              value={citoyen.adresse}
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
                              onChange={(e)=>onInputChange(e)}
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
                              onChange={(e)=>onInputChange(e)}
                              value={citoyen.etatCivil}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <div className="text-right" xs="4">
                        <Button type="submit" color="primary">
                            Enregistrer les modifications 
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
  
  export default EditCitoyen;
  