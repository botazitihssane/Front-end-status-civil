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
import { useState } from "react";
import { Link } from "react-router-dom";
  
  const Arrondissement = () => {
    const [arrondissement,setArrondissement] = useState({
      nomArrondissement:"",
      ville:"",
      pays:"",
      codePostal:"",
      population:"",
      superficie:"",
      adresseArrondissement:"",
    });

    const onInputChange = (e) => {
      setArrondissement({...arrondissement,[e.target.name]:e.target.value});
    }
    const [response,setResponse]=useState({status : false,});
  
    const onSubmit = async(e) => {
      e.preventDefault();
      let data = JSON.stringify(arrondissement);
      console.log(data);
      let head = { "Content-Type": "application/json" };
      fetch('http://localhost:8080/api/arrondissement',{
        method:"POST",
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
                      <h3 className="mb-0">Arrondissement</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Link to={"/admin/viewArrondissement"} className="btn btn-primary">Liste des arrondissements</Link>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                <Form onSubmit={(e)=> onSubmit(e)}>
                    <h6 className="heading-small text-muted mb-4">
                      Information d'arrondissement
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-nomArrondissement"
                            >
                              Nom d'arrondissement
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-nom-arrondissement"
                              placeholder="Nom d'arrondissement"
                              type="text"
                              name="nomArrondissement"
                              onChange={(e)=>onInputChange(e)}
                              value={arrondissement.nomArrondissement}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-adresse"
                            >
                              Adresse
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-Adresse"
                              placeholder="Adresse de l'arrondissement"
                              name="adresseArrondissement"
                              type="text"
                              onChange={(e)=>onInputChange(e)}
                              value={arrondissement.adresseArrondissement}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
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
                              onChange={(e)=>onInputChange(e)}
                              value={arrondissement.ville}
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
                              onChange={(e)=>onInputChange(e)}
                              value={arrondissement.pays}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Code Postal
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-code-postal"
                              placeholder="Code postal"
                              type="number"
                              name="codePostal"
                              onChange={(e)=>onInputChange(e)}
                              value={arrondissement.codePostal}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-population"
                            >
                              Population
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-population"
                              placeholder="Population"
                              type="text"
                              name="population"
                              onChange={(e)=>onInputChange(e)}
                              value={arrondissement.population}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-superficie"
                            >
                              Superficie
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-superficie"
                              placeholder="Superficie"
                              type="text"
                              name="superficie"
                              onChange={(e)=>onInputChange(e)}
                              value={arrondissement.superficie}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <div className="text-right" xs="4">
                        <Button type="submit" color="primary">
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
  
  export default Arrondissement;
  