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
import { Link, useLocation } from "react-router-dom";

const EditRegion = () => {
  const location = useLocation();
  const object = location.state.annexe;
  console.log(object);
  const [region, setRegion] = useState({
    nomRegion: object.nomRegion,
    superficie: object.superficie,
    population: object.superficie,
    id: object.id,
  });

  const onInputChange = (e) => {
    setRegion({
      ...region,
      [e.target.name]: e.target.value,
    });
  };

  const [response, setResponse] = useState({ status: false });

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = JSON.stringify(region);
    let head = { "Content-Type": "application/json" };
    console.log(data);
    fetch("http://localhost:8080/api/region/", {
      method: "PUT",
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
                    <h3 className="mb-0">Region</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Link to={"/admin/viewRegions"} className="btn btn-primary">
                      Liste des regions
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => onSubmit(e)}>
                  <h6 className="heading-small text-muted mb-4">
                    Information de la region
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-nomRegion"
                          >
                            Nom de la région
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nomRegion"
                            placeholder="Nom de la région"
                            type="text"
                            name="nomRegion"
                            onChange={(e) => onInputChange(e)}
                            value={region.nomRegion}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-superficie"
                          >
                            Superficie de la région
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-superficie"
                            placeholder="Superficie de la région"
                            name="superficie"
                            type="number"
                            onChange={(e) => onInputChange(e)}
                            value={region.superficie}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-population"
                          >
                            Population de la région
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-population"
                            placeholder="Population de la région"
                            type="number"
                            name="population"
                            onChange={(e) => onInputChange(e)}
                            value={region.population}
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

export default EditRegion;
