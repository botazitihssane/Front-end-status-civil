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
  
  const Arrondissement = () => {
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
                  <Form>
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
  