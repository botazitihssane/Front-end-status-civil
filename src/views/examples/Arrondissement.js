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
  
  const Arrondissement = () => {
    const [arrondissement,setArrondissement] = useState({
      nom_arrondissement:"",
      ville:"",
      pays:"",
      code_postal:"",
      population:"",
      superficie:"",
      adresse:"",
      quartiers:"",
      annexe:"",
    });
    const onInputChange = (e) => {
      setArrondissement({...arrondissement,[e.target.name]:e.target.value});
    }
    const [response,setResponse]=useState({status : false,});
  
    const onSubmit = async(e) => {
      e.preventDefault();
      let data = JSON.stringify(arrondissement);
      console.log(data);
      let head = {"content-type":"application/json"};
      fetch("https://localhost:8080/api/arrondissement",{
        method:"POST",
        headers:head,
        body:data,
      })
      .then((response)=>response.json())
      .then((data)=>{
        setResponse(response);
        console.log(response);
      })
      .catch((er)=>{
        console.log(er);
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
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Edit
                      </Button>
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
                              onChange={(e)=>onInputChange(e)}
                              value={arrondissement.nom_arrondissement}
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
                              type="text"
                              onChange={(e)=>onInputChange(e)}
                              value={arrondissement.adresse}
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
                              onChange={(e)=>onInputChange(e)}
                              value={arrondissement.code_postal}
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
                              onChange={(e)=>onInputChange(e)}
                              value={arrondissement.superficie}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-quarties"
                            >
                              Quartiers
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-quarties"
                              placeholder="Quartiers"
                              type="text"
                              onChange={(e)=>onInputChange(e)}
                              value={arrondissement.quartiers}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Annexe de l'arrondissement
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-nom-annexe"
                            >
                              Nom d'annexe
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-annexe"
                              placeholder="Nom d'annexe"
                              type="text"
                              onChange={(e)=>onInputChange(e)}
                              value={arrondissement.annexe}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-adresse"
                            >
                              Adresse de l'annexe
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-adresse"
                              placeholder="Adresse de l'annexe"
                              type="text"
                              onChange={(e)=>onInputChange(e)}
                              value={arrondissement.annexe}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
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
  