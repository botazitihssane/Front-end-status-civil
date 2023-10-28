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
import { Link } from "react-router-dom";

const Arrondissement = () => {
  const [arrondissement, setArrondissement] = useState({
    prefecture: {
      id: "",
    },
    nomArrondissement: "",
    ville: "",
    population: "",
  });
  const [prefectures, setPrefectures] = useState([]);
  const [selectedPrefecture, setSelectedPrefecture] = useState("");
  const onInputChange = (e) => {
    if (e.target.name === "prefecture") {
      setArrondissement({
        ...arrondissement,
        prefecture: { id: e.target.value },
      });
    } else {
      setArrondissement({ ...arrondissement, [e.target.name]: e.target.value });
    }
  };
  const [response, setResponse] = useState({ status: false });

  const onPrefectureInputChange = (e) => {
    const selectedPrefectureId = e.target.value;
    setSelectedPrefecture(selectedPrefectureId);
    setArrondissement({
      ...arrondissement,
      prefecture: {
        id: selectedPrefectureId,
      },
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = JSON.stringify(arrondissement);
    console.log(data);
    let head = { "Content-Type": "application/json" };
    fetch("http://localhost:8080/api/arrondissement", {
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

  const loadPrefectures = () => {
    fetch("http://localhost:8080/api/prefectures")
      .then((response) => response.json())
      .then((data) => setPrefectures(data));
  };

  useEffect(() => {
    loadPrefectures();
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
                    <h3 className="mb-0">Arrondissement</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Link
                      to={"/admin/viewArrondissement"}
                      className="btn btn-primary"
                    >
                      Liste des arrondissements
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => onSubmit(e)}>
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
                            Prefecture Correspondate
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nom-arrondissement"
                            placeholder="Prefecture"
                            type="select"
                            name="prefecture"
                            onChange={(e) => onPrefectureInputChange(e)}
                            value={selectedPrefecture}
                          >
                            <option value="" disabled hidden>
                              Prefecure
                            </option>
                            {prefectures.map((prefecture) => (
                              <option key={prefecture.id} value={prefecture.id}>
                                {prefecture.nomPrefecture}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
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
                            onChange={(e) => onInputChange(e)}
                            value={arrondissement.nomArrondissement}
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
                            onChange={(e) => onInputChange(e)}
                            value={arrondissement.ville}
                          />
                        </FormGroup>
                      </Col>
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
                            onChange={(e) => onInputChange(e)}
                            value={arrondissement.population}
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
