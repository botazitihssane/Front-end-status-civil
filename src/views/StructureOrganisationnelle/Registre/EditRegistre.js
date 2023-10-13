import UserHeader from "components/Headers/UserHeader";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Container,
} from "reactstrap";

const EditRegistre = () => {
    const location = useLocation();
    const object = location.state.registre;

  const [annexes,setAnnexes] = useState([]);
  const [selectedAnnexe,setSelectedAnnexe] = useState("");
  const [registre,setRegistre] = useState({
    id: object.id,
    annexe: {
      id: object.annexe.id,
    },
    typeRegistre:object.typeRegistre,
    nomRegistre:object.nomRegistre
  })
  const [response,setResponse]=useState({status : false,});
 
  const onInputChange = (e) => {
    if (e.target.name === "annexe") {
      setRegistre({
        ...registre,
        annexe: {
          id: e.target.value,
        },
      });
    } else {
      setRegistre({...registre,[e.target.name]:e.target.value});
    }
  };

  const onAnnexeInputChange = (e) => {
    const selectedAnnexeId = e.target.value;
    setSelectedAnnexe(selectedAnnexeId);
    setRegistre({
      ...registre,
      annexe: {
        id: selectedAnnexeId,
      },
    });
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    let data = JSON.stringify(registre);
    console.log(data);
    let head = { "Content-Type": "application/json" };
    fetch('http://localhost:8080/api/registre',{
      method:"PUT",
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

  const loadAnnexes = () => {
    fetch('http://localhost:8080/api/annexes')
    .then((response) => response.json())
    .then((data)=> setAnnexes(data));
  }

  useEffect(() => {
    loadAnnexes();
},[]);
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
                    <h3 className="mb-0">Modifier le registre</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e)=> onSubmit(e)}> 
                  <h6 className="heading-small text-muted mb-4">
                    Information du registre
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-annexe"
                            >
                              Annexe Correspondante
                            </label>
                            <Input
                                    className="form-control-alternative"
                                    id="input-annexe"
                                    placeholder="Annexe"
                                    type="select"
                                    name="annexe"
                                    onChange={(e)=>onAnnexeInputChange(e)}
                                    value={selectedAnnexe}>
                                        <option value=" ">
                                            Annexe
                                        </option>
                                        {annexes.map((annexe) => (
                                            <option key={annexe.id} value={annexe.id}>
                                                {annexe.nomAnnexe}
                                            </option>
                                            ))}
                                </Input>
                          </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-nom-registre"
                          >
                            Nom du registre
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nom-registre"
                            placeholder="Nom du registre"
                            type="text"
                            name="nomRegistre"
                            onChange={(e)=>onInputChange(e)}
                            value={registre.nomRegistre}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-adresse"
                          >
                            Type du registre
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-type"
                            placeholder="Annexe"
                            type="select"
                            name="typeRegistre"
                            onChange={(e)=>onInputChange(e)}
                            value={registre.typeRegistre}>
                            <option value=""> Type d'annexe </option>
                            <option value="Certificat de décès"> Certificat de décès </option>
                            <option value="Acte de naissance"> Acte de naissance </option>
                            <option value="Acte de mariage"> Acte de mariage </option>
                          </Input>
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

export default EditRegistre;
