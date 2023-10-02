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

const ActeNaissance = () => {
    const [acteNaissance,setActeNaissance] = useState({
        typeEnregistrement:"acteNaissance",
        dateEnregistrement:"",
        lieuEnregistrement:"",
        registreAppartenant:{
            id:"",
        },
        officierValidant:{
            id:"",
        },
        nouveauNee:{
            id:"",
        },
        typeNaissance:"",
        declarant:{
            id:"",
        },
        relationAvecNouveauNee:"",
    });

    const [declarant,setDeclarant] = useState({
        cin:"",
        nom:"",
        prenom:""
    });
    const [personne,setPersonne] = useState({
        id:"",
    });
    const [selectedLieu,setSelectedLieu] = useState("");
    const [lieux,setLieux] = useState([]);
    const [registres,setRegistres] = useState([]);
    const [selectedRegistre,setSelectedRegistre] = useState("");
    const [officiers,setOfficiers] = useState([]);
    const [selectedOfficier,setSelectedOfficier] = useState("");
    const [response,setResponse]=useState({status : false,});

    const onOfficierInputChange = (e) => {
        console.log(e.target.value);
        setSelectedOfficier({...selectedOfficier, id: e.target.value});
        setActeNaissance({...acteNaissance,officierValidant: {id : e.target.value}});
    }

    const onPersonneInputChange = (e) => {
        console.log(e.target.value);
        setPersonne({...personne, id: e.target.value});
        setActeNaissance({...acteNaissance,nouveauNee: {id : e.target.value}});
    };

    const onDeclarantInputChange = (e) => {
        console.log(e.target.value);
        setDeclarant({...declarant, cin: e.target.value});
        setActeNaissance({...acteNaissance,declarant:  {id : e.target.value}});
    };

    const onRegistreInputChange = (e) => {
        console.log(e.target.value);
        setSelectedRegistre({...selectedRegistre, nom: e.target.value});
        setActeNaissance({...acteNaissance,registreAppartenant :  {id : e.target.value}});
    };

    const onInputChange = (e) => {
        setActeNaissance({...acteNaissance,[e.target.name]: e.target.value,});
    };

      const onSubmit = async(e) => {
        e.preventDefault();
        let data = JSON.stringify(acteNaissance);
        console.log(data);
        let head = { "Content-Type": "application/json" };
        fetch('http://localhost:8080/api/acteNaissance',{
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
    };

    const loadLieux = () => {
        fetch('http://localhost:8080/api/annexes')
        .then((response) => response.json())
        .then((data)=> setLieux(data));
    };

    const onLieuInputChange = (e) => {
        const selectedLieu = e.target.value;
        console.log(e.target.value);
        setSelectedLieu(selectedLieu);
        setActeNaissance({
          ...acteNaissance,
          lieuEnregistrement: selectedLieu,
        });
        loadRegistres(selectedLieu);
    };

    const loadRegistres = (annexe) => {
        fetch(`http://localhost:8080/api/registre/annexe/${annexe}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => setRegistres(data))
        .catch((error) => {
            console.error("Fetch error:", error);
        });
    };
    

    const loadPersonne = (id) => {
        fetch(`http://localhost:8080/api/personne/${id}`)
        .then((response) => response.json())
        .then((data)=> setPersonne(data));
    }

    const loadOfficiers = () => {
        fetch('http://localhost:8080/api/officiers')
        .then((response) => response.json())
        .then((data)=> setOfficiers(data));
    }

    const fetchDeclarant = (cin) => {
        fetch(`http://localhost:8080/api/personne/cin/${cin}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data) {
            setDeclarant({ ...declarant, nom: data.nom, prenom: data.prenom });
            setActeNaissance({ ...acteNaissance, declarant: {id : data.id } });
          } else {
            console.error("Invalid or empty response from the server");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    };

    const submitSearch = (e) => {
        e.preventDefault();
        loadPersonne(personne.id);
        fetchDeclarant(declarant.cin);
        return false;
      };
    

    useEffect(() => {
        loadLieux();
        loadOfficiers();
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
                    </Row>
                  </CardHeader>
                  <CardBody>
                  <Form onSubmit={(e)=> onSubmit(e)}>
                      <h6 className="heading-small text-muted mb-4">
                        Informations d'acte de naissance
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                              <FormGroup>
                                  <label
                                      className="form-control-label"
                                      htmlFor="input-arrondissement"
                                      >
                                      Date d'enregistrement  
                                  </label>
                                  <Input
                                      className="form-control-alternative"
                                      id="input-nom-dateEnregistrement"
                                      placeholder="Date d'enregistrement"
                                      type="date"
                                      name="dateEnregistrement"
                                      onChange={(e)=>onInputChange(e)}
                                      value={acteNaissance.dateEnregistrement}
                                      >
                                  </Input>
                              </FormGroup>
                          </Col>
                          <Col lg="6">
                              <FormGroup>
                                  <label
                                      className="form-control-label"
                                      htmlFor="input-lieuEnregistrement"
                                      >
                                      Lieu d'enregistrement 
                                  </label>
                                  <Input
                                      className="form-control-alternative"
                                      id="input-nom-lieuEnregistrement"
                                      placeholder="Lieu d'enregistrement"
                                      type="select"
                                      name="lieuEnregistrement"
                                      onChange={(e)=>onLieuInputChange(e)}
                                      value={selectedLieu}>
                                          <option value="" disabled hidden>
                                              Lieu d'enregistrement
                                          </option>
                                          {lieux.map((lieu) => (
                                              <option key={lieu.id} value={lieu.id}>
                                                  {lieu.nomAnnexe}
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
                                  htmlFor="input-registreAppartenant"
                                  >
                                  Registre Appartenant 
                                  </label>
                                  <Input
                                  className="form-control-alternative"
                                  id="input-nom-registreAppartenant"
                                  placeholder="Registre Appartenant "
                                  type="select"
                                  name="registreAppartenant"
                                  onChange={(e)=>onRegistreInputChange(e)}
                                  value={selectedRegistre.nomRegistre}>
                                        <option value="">
                                          Registre Appartenant
                                        </option>
                                        {registres.map((registre) => (
                                            <option key={registre.id} value={registre.id}>
                                                {registre.nomRegistre}
                                            </option>
                                        ))}
                                </Input>
                              </FormGroup>
                              </Col>
                              <Col lg="6">
                              <FormGroup>
                                  <label
                                  className="form-control-label"
                                  htmlFor="input-officierValidant"
                                  >
                                  Officier Validant 
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-officierValidant"
                                    placeholder="Officier Validant"
                                    name="officierValidant"
                                    type="select"
                                    onChange={(e)=>onOfficierInputChange(e)}
                                    value={selectedOfficier.id}>
                                            <option value="">
                                            Officier Validant 
                                            </option>
                                            {officiers.map((officier) => (
                                                <option key={officier.id} value={officier.id}>
                                                    {officier.grade} {officier.nom} {officier.prenom}
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
                                  htmlFor="input-nouveauNee"
                                  >
                                  Nouveau nee 
                                  </label>
                                  <Input
                                  className="form-control-alternative"
                                  id="input-nom-nouveauNee"
                                  placeholder="Nouveau né(e)"
                                  type="text"
                                  name="idPersonne"
                                  onChange={(e)=>onPersonneInputChange(e)}
                                  value={personne.id}
                                  />
                              </FormGroup>
                              {personne.prenom || personne.nom ? (
                              <div>
                                <label>Nouveau Né(e): </label>
                                <span>
                                  {personne.nom} {personne.prenom}
                                </span>
                              </div>
                            ) : null}
                              </Col>
                              <Col lg="6">
                              <FormGroup>
                                  <label
                                  className="form-control-label"
                                  htmlFor="input-typeNaissance"
                                  >
                                  Type de naissance 
                                  </label>
                                  <Input
                                  className="form-control-alternative"
                                  id="input-typeNaissance"
                                  placeholder="Type de naissance"
                                  name="typeNaissance"
                                  type="text"
                                  onChange={(e)=>onInputChange(e)}
                                  value={acteNaissance.typeNaissance}
                                  />
                              </FormGroup>
                              </Col>
                        </Row>
                        <Row>
                              <Col lg="6">
                              <FormGroup>
                                  <label
                                  className="form-control-label"
                                  htmlFor="input-declarant"
                                  >
                                  Declarant 
                                  </label>
                                  <Input
                                  className="form-control-alternative"
                                  id="input-nom-declarant"
                                  placeholder="Declarant"
                                  type="text"
                                  name="cin"
                                  onChange={(e)=>onDeclarantInputChange(e)}
                                  value={declarant.cin}
                                  />
                              </FormGroup>
                              {declarant.prenom || declarant.nom ? (
                              <div>
                                <label>Declarant: </label>
                                <span>
                                  {declarant.nom} {declarant.prenom}
                                </span>
                              </div>
                            ) : null}
                              </Col>
                              <Col lg="6">
                              <FormGroup>
                                  <label
                                  className="form-control-label"
                                  htmlFor="input-relationAvecNouveauNee"
                                  >
                                  Relation avec le nouveau né(e) 
                                  </label>
                                  <Input
                                  className="form-control-alternative"
                                  id="input-relationAvecNouveauNee"
                                  placeholder="Relation avec le nouveau né(e)"
                                  name="relationAvecNouveauNee"
                                  type="text"
                                  onChange={(e)=>onInputChange(e)}
                                  value={acteNaissance.relationAvecNouveauNee}
                                  />
                              </FormGroup>
                              </Col>
                        </Row>
                      </div>
                      <Row>
                        <Col lg ="4">
                            <div  className="text-left" xs="4">
                                <Button type="button" color="primary" onClick={submitSearch}>Verifier les Informations</Button>     
                            </div>
                        </Col>
                        <Col>
                            <div className="text-right" xs="4">
                                <Button type="submit" color="primary">Enregistrer les données </Button>
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
}
export default ActeNaissance;