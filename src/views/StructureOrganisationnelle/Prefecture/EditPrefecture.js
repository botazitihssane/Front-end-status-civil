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

const EditPrefecture = () => {
  const location = useLocation();
  const object = location.state.prefecture;
  console.log(object);
  const [prefecture, setPrefecture] = useState({
    region: {
      id: object.region.id,
    },
    nomPrefecture: object.nomPrefecture,
    population: object.population,
    id: object.id,
  });

  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  const onInputChange = (e) => {
    if (e.target.name === "region") {
      setPrefecture({
        ...prefecture,
        region: {
          id: e.target.value,
        },
      });
    } else {
      setPrefecture({
        ...prefecture,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onRegionInputChange = (e) => {
    const selectedRegionId = e.target.value;
    setSelectedRegion(selectedRegionId);
    setPrefecture({
      ...prefecture,
      region: {
        id: selectedRegionId,
      },
    });
  };
  const [response, setResponse] = useState({ status: false });

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = JSON.stringify(prefecture);
    let head = { "Content-Type": "application/json" };
    console.log(data);
    fetch("http://localhost:8080/api/prefecture/", {
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

  const loadRegions = () => {
    fetch("http://localhost:8080/api/regions")
      .then((response) => response.json())
      .then((data) => setRegions(data));
  };

  useEffect(() => {
    loadRegions();
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
                    <h3 className="mb-0">Prefecture</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Link
                      to={"/admin/viewPrefectures"}
                      className="btn btn-primary"
                    >
                      Liste des prefectures
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => onSubmit(e)}>
                  <h6 className="heading-small text-muted mb-4">
                    Information de la préfecture
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-region"
                          >
                            Région Correspondante
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-region"
                            placeholder="Région"
                            type="select"
                            name="region"
                            onChange={(e) => onRegionInputChange(e)}
                            value={selectedRegion}
                          >
                            <option value="" disabled hidden>
                              Région
                            </option>
                            {regions.map((region) => (
                              <option key={region.id} value={region.id}>
                                {region.nomRegion}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-nomPrefecture"
                          >
                            Nom de la préfecture
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nomPrefecture"
                            placeholder="Nom de la préfecture"
                            type="text"
                            name="nomPrefecture"
                            onChange={(e) => onInputChange(e)}
                            value={prefecture.nomPrefecture}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
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
                            placeholder="Population de la préfecture"
                            name="population"
                            type="number"
                            onChange={(e) => onInputChange(e)}
                            value={prefecture.population}
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

export default EditPrefecture;
