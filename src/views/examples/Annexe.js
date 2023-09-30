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
  
  const Annexe = () => {
    const [annexe,setAnnexe] = useState({
        arrondissement:{
            id:""
        },
        nomAnnexe:"",
        adresseAnnexe:""
    });

    const [arrondissements,setArrondissements] = useState([]);
    const [villes,setVilles] = useState([]);
    const [selectedVille,setSelectedVille] = useState("");

    const onInputChange = (e) => {
        if (e.target.name === "arrondissement") {
          setAnnexe({
            ...annexe,
            arrondissement: {
              id: e.target.value,
            },
          });
        } else {
          setAnnexe({
            ...annexe,
            [e.target.name]: e.target.value,
          });
        }
      };

    const onVilleInputChange = (e) => {
        setSelectedVille(e.target.value);
        console.log("selected ville " + e.target.value); 
        loadArrondissements(e.target.value);
      }
    const [response,setResponse]=useState({status : false,});
  
    const onSubmit = async(e) => {
      e.preventDefault();
      let data = JSON.stringify(annexe);
      console.log(data);
      let head = { "Content-Type": "application/json" };
      fetch('http://localhost:8080/api/annexe',{
        method:"POST",
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

    const loadArrondissements = (ville) => {
        fetch(`http://localhost:8080/api/arrondissement/ville/${ville}`)
        .then((response) => response.json())
        .then((data)=> setArrondissements(data));
    }

    const loadVilles = () => {
        fetch('http://localhost:8080/api/ville')
        .then((response) => response.json())
        .then((data)=> setVilles(data));
    }

    useEffect(() => {
        loadVilles();
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
                      <h3 className="mb-0">Annexe</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Link to={"/admin/viewAnnexes"} className="btn btn-primary">Liste des annexes</Link>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                <Form onSubmit={(e)=> onSubmit(e)}>
                    <h6 className="heading-small text-muted mb-4">
                      Information d'annexe
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-arrondissement"
                                    >
                                    Ville  
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-nom-ville"
                                    placeholder="Ville"
                                    type="select"
                                    name="ville"
                                    onChange={(e)=>onVilleInputChange(e)}
                                    value={selectedVille}>
                                        <option value=" ">
                                            Ville
                                        </option>
                                        {villes.map((ville) => (
                                            <option key={ville} value={ville}>
                                                {ville}
                                            </option>
                                            ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-arrondissement"
                                    >
                                    Arrondissement Correspondant 
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-nom-arrondissement"
                                    placeholder="Arrondissement"
                                    type="select"
                                    name="arrondissement"
                                    onChange={(e)=>onInputChange(e)}
                                    value={annexe.arrondissement.id}>
                                        <option value="" disabled hidden>
                                            Arrondissement
                                        </option>
                                        {arrondissements.map((arrondissement) => (
                                            <option key={arrondissement.id} value={arrondissement.id}>
                                                {arrondissement.nomArrondissement}
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
                                htmlFor="input-nomAnnexe"
                                >
                                Nom 
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-nom-annexe"
                                placeholder="Nom d'annexe"
                                type="text"
                                name="nomAnnexe"
                                onChange={(e)=>onInputChange(e)}
                                value={annexe.nomAnnexe}
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
                                placeholder="Adresse de l'annexe"
                                name="adresseAnnexe"
                                type="text"
                                onChange={(e)=>onInputChange(e)}
                                value={annexe.adresseAnnexe}
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
  
  export default Annexe;
  