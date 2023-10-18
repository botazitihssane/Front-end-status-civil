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

const ViewActeMariage = () => {
  const [acteMariage, setActeMariage] = useState([]);
  const loadActe = () => {
    fetch(`http://localhost:8080/api/actes/mariage/transactions/id/${6}`)
      .then((response) => response.json())
      .then((data) => {
        setActeMariage(data);
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
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">
                      Acte de mariage nº {acteMariage.id}
                    </h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Informations d'acte de mariage
                  </h6>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">Epouse: </label>
                        <span className="form-control-label">
                          {acteMariage.epouse}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">CIN: </label>
                        <span className="form-control-label">
                          {acteMariage.cinEpouse}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">Née le: </label>
                        <span className="form-control-label">
                          {acteMariage.dateNaissanceEpouse}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">à : </label>
                        <span className="form-control-label">
                          {acteMariage.lieuNaissanceEpouse}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">Fille de :</label>
                        <span className="form-control-label">
                          {acteMariage.pereEpouse}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">Et de :</label>
                        <span className="form-control-label">
                          {acteMariage.mereEpouse}
                        </span>
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">Epoux : </label>
                        <span className="form-control-label">
                          {acteMariage.epoux}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">CIN: </label>
                        <span className="form-control-label">
                          {acteMariage.cinEpoux}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">Né le: </label>
                        <span className="form-control-label">
                          {acteMariage.dateNaissanceEpoux}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">à : </label>
                        <span className="form-control-label">
                          {acteMariage.lieuNaissanceEpoux}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">Fils de :</label>
                        <span className="form-control-label">
                          {acteMariage.pereEpoux}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">Et de :</label>
                        <span className="form-control-label">
                          {acteMariage.mereEpouse}
                        </span>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">
                          Mariés le :{" "}
                        </label>
                        <span className="form-control-label">
                          {acteMariage.dateMariage}
                        </span>
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">à :</label>
                        <span className="form-control-label">
                          {acteMariage.lieuMariage}
                        </span>
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="text-right">
                    <Button type="submit" color="primary">
                      Imprimer l'acte
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
export default ViewActeMariage;
