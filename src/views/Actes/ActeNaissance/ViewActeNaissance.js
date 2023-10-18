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
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";

const ViewActeNaissance = () => {
  const [acteNaissance, setActeNaissance] = useState([]);

  const loadActe = () => {
    fetch(`http://localhost:8080/api/actes/naissance/transactions/id/${6}`)
      .then((response) => response.json())
      .then((data) => {
        setActeNaissance(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    loadActe();
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
                    <h3 className="mb-0">
                      Acte de naissance nº {acteNaissance.id}{" "}
                    </h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Informations d'acte de naissance
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Acte nº :
                          </label>
                          <span className="form-control-label">
                            {acteNaissance.id}
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
                            {acteNaissance.prenom}
                          </span>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Nom : </label>
                          <span className="form-control-label">
                            {acteNaissance.nom}
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
                            {acteNaissance.dateNaissance}
                          </span>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">à : </label>
                          <span className="form-control-label">
                            {acteNaissance.lieuNaissance}
                          </span>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Sexe : </label>
                          <span className="form-control-label">
                            {acteNaissance.sexe}
                          </span>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Nationalite :
                          </label>
                          <span className="form-control-label">
                            {acteNaissance.nationalite}
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
                            {acteNaissance.pere}
                          </span>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Et de : </label>
                          <span className="form-control-label">
                            {acteNaissance.mere}
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
                        <Button type="submit" color="primary">
                          Imprimer l'acte
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
export default ViewActeNaissance;
