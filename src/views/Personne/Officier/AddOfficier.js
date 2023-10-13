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
import { Link } from "react-router-dom";
import { useState } from "react";

const Officier = () => {
  const [officier, setOfficier] = useState({
    nom: "",
    prenom: "",
    cin: "",
    grade: "",
    email: "",
    telephone: "",
  });
  const onInputChange = (e) => {
    setOfficier({ ...officier, [e.target.name]: e.target.value });
  };
  const [response, setResponse] = useState({ status: false });
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = JSON.stringify(officier);
    let head = { "Content-Type": "application/json" };
    fetch("http://localhost:8080/api/officier", {
      method: "POST",
      headers: head,
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(response);
        console.log(response);
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
                    <h3 className="mb-0">Officier</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Link
                      to={"/admin/viewOfficier"}
                      className="btn btn-primary"
                    >
                      Liste des officiers
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => onSubmit(e)}>
                  <h6 className="heading-small text-muted mb-4">
                    Information d'officier
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-nomOfficier"
                          >
                            Nom d'officier
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nom-officier"
                            placeholder="Nom d'officier"
                            name="nom"
                            type="text"
                            onChange={(e) => onInputChange(e)}
                            value={officier.nom}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-prenom"
                          >
                            Prenom d'officier
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-prenom"
                            placeholder="Prenom de l'officier"
                            name="prenom"
                            type="text"
                            onChange={(e) => onInputChange(e)}
                            value={officier.prenom}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-cin"
                          >
                            CIN
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-cin"
                            placeholder="CIN de l'officier"
                            type="text"
                            name="cin"
                            onChange={(e) => onInputChange(e)}
                            value={officier.cin}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-grade"
                          >
                            Grade
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-grade"
                            placeholder="Grade de l'officier"
                            type="text"
                            name="grade"
                            onChange={(e) => onInputChange(e)}
                            value={officier.grade}
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
                            placeholder="Email de l'officier"
                            type="email"
                            name="email"
                            onChange={(e) => onInputChange(e)}
                            value={officier.email}
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
                            placeholder="Telephone de l'officier"
                            type="phone"
                            name="telephone"
                            onChange={(e) => onInputChange(e)}
                            value={officier.telephone}
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

export default Officier;
