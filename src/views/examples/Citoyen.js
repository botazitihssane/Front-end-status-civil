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
  
  const Citoyen = () => {
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
                  <Form>
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
                              type="text"
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
                              type="text"
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
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="Email "
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-telephone"
                            >
                              Telephone
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-telephone"
                              placeholder="Telephone"
                              type="phone"
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
  
  export default Citoyen;
  