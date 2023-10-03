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

const ActeMariage = () => {
    const [acteMariage,setActeMariage] = useState({
        typeEnregistrement:"acteMariage",
        dateEnregistrement:"",
        lieuEnregistrement:"",
        registreAppartenant:{
            id:"",
        },
        officierValidant:{
            id:"",
        },
        lieuMariage:"",
        dateMariage:"",
        epoux:{
            id:"",
        },
        epouse:{
            id:"",
        },
        mereEpouse:{
            id:"",
        },
        pereEpouse:{
            id:"",
        },
        mereEpoux:{
            id:"",
        },
        pereEpoux:{
            id:"",
        },
    }) ;

    const [response,setResponse]=useState("");
    const [registres,setRegistres] = useState([]);
    const [selectedRegistre,setSelectedRegistre] = useState("");
    const [officiers,setOfficiers] = useState([]);
    const [selectedOfficier,setSelectedOfficier] = useState("");
    const [lieux,setLieux] = useState([]);
    const [selectedLieu,setSelectedLieu] = useState("");

    const [personne,setPersonne] = useState({
        epouse:{
            cin:"",
            nom:"",
            prenom:"",
        },
        epoux:{
            cin:"",
            nom:"",
            prenom:"",
        },
        mereEpouse:{
            cin:"",
            nom:"",
            prenom:"",
        },
        pereEpouse:{
            cin:"",
            nom:"",
            prenom:"",
        },
        mereEpoux:{
            cin:"",
            nom:"",
            prenom:"",
        },
        pereEpoux:{
            cin:"",
            nom:"",
            prenom:"",
        },
        
    });

    const onInputChange = (e) => {
    console.log(e.target.value);
        setActeMariage({...acteMariage,[e.target.name]: e.target.value});
    };

    const onOfficierInputChange = (e) => {
        console.log(e.target.value);
        setSelectedOfficier({...selectedOfficier, id: e.target.value});
        setActeMariage({...acteMariage,officierValidant: {id : e.target.value}});
    }

    const onRegistreInputChange = (e) => {
        console.log(e.target.value);
        setSelectedRegistre({...selectedRegistre, nom: e.target.value});
        setActeMariage({...ActeMariage,registreAppartenant : { id: e.target.value } });
    };

    const onLieuInputChange = (e) => {
        const selectedLieu = e.target.value;
        console.log(e.target.value);
        setSelectedLieu(selectedLieu);
        setActeMariage({
          ...acteMariage,
          lieuEnregistrement: selectedLieu,
        });
        loadRegistres(selectedLieu);
    };

    const onPersonneInputChange = (e) => {
        console.log(e.target.value);
        if (e.target.name === "epouse"){
            setPersonne({...personne, epouse : {cin: e.target.value}})
        } else if (e.target.name === "epoux"){
            setPersonne({...personne, epoux : {cin: e.target.value}})
        } else if (e.target.name === "mereEpoux"){
            setPersonne({...personne, mereEpoux : {cin: e.target.value}})
        } else if (e.target.name === "pereEpoux"){
            setPersonne({...personne, pereEpoux : {cin: e.target.value}})
        } else if (e.target.name === "mereEpouse"){
            setPersonne({...personne, mereEpouse : {cin: e.target.value}})
        } else if (e.target.name === "pereEpouse"){
            setPersonne({...personne, pereEpouse : {cin: e.target.value}})
        }
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

    const loadLieux = () => {
        fetch('http://localhost:8080/api/annexes')
        .then((response) => response.json())
        .then((data)=> {
            setLieux(data);
            console.log(data);
        });
    };

    const loadOfficiers = () => {
        fetch('http://localhost:8080/api/officiers')
        .then((response) => response.json())
        .then((data)=> setOfficiers(data));
    }

    const submitSearch = async (e) => {
        e.preventDefault();
        const cins = [
          personne.epouse.cin,
          personne.epoux.cin,
          personne.mereEpouse.cin,
          personne.pereEpouse.cin,
          personne.mereEpoux.cin,
          personne.pereEpoux.cin,
        ];
        const fetchedData = [];
      
        await Promise.all(
          cins.map(async (cin) => {
            const response = await fetch(`http://localhost:8080/api/personne/cin/${cin}`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            fetchedData.push(data);
          })
        );

        setPersonne((prevPersonne) => ({
          ...prevPersonne,
          epouse: {
            nom: fetchedData[0].nom,
            prenom: fetchedData[0].prenom,
          },
          epoux: {
            nom: fetchedData[1].nom,
            prenom: fetchedData[1].prenom,
          },
          mereEpouse: {
            nom: fetchedData[2].nom,
            prenom: fetchedData[2].prenom,
          },
          pereEpouse: {
            nom: fetchedData[3].nom,
            prenom: fetchedData[3].prenom,
          },
          mereEpoux: {
            nom: fetchedData[4].nom,
            prenom: fetchedData[4].prenom,
          },
          pereEpoux: {
            nom: fetchedData[5].nom,
            prenom: fetchedData[5].prenom,
          },
        }));
      
        setActeMariage((prevActeMariage) => ({
          ...prevActeMariage,
          epouse: { id: fetchedData[0].id },
          epoux: { id: fetchedData[1].id },
          mereEpouse: { id: fetchedData[2].id },
          pereEpouse: { id: fetchedData[3].id },
          mereEpoux: { id: fetchedData[4].id },
          pereEpoux: { id: fetchedData[5].id },
        }));
      
        console.log(fetchedData);
    };
      

    const onSubmit = async(e) => {
        console.log(acteMariage);
        e.preventDefault();
        let data = JSON.stringify(acteMariage);
        console.log(data);
        let head = { "Content-Type": "application/json" };
        fetch('http://localhost:8080/api/acteMariage',{
          method:"POST",
          headers:head,
          body:data,
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        })
        .then((data)=>{
          setResponse(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    useEffect(() => {
        loadOfficiers();
        loadLieux();
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
                        <h3 className="mb-0">Acte mariage</h3>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                  <Form onSubmit={(e)=> onSubmit(e)}>
                      <h6 className="heading-small text-muted mb-4">
                        Informations de l'acte de mariage
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                          <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-dateEnregistrement"
                            >
                                Date d'enregistrement
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-nom-dateEnregistrement"
                                placeholder="Date d'enregistrement"
                                type="date"
                                name="dateEnregistrement"
                                onChange={(e) => onInputChange(e)}
                                value={acteMariage.dateEnregistrement}
                            />
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
                                          <option value="">
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
                                  value={selectedRegistre}>
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
                                  htmlFor="input-dateMariage"
                                  >
                                  Date de mariage 
                                  </label>
                                  <Input
                                  className="form-control-alternative"
                                  id="input-nom-dateMariage"
                                  placeholder="Date de mariage "
                                  type="date"
                                  name="dateMariage"
                                  onChange={(e)=>onInputChange(e)}
                                  value={acteMariage.dateMariage}>
                                </Input>
                              </FormGroup>
                              </Col>
                              <Col lg="6">
                              <FormGroup>
                                  <label
                                  className="form-control-label"
                                  htmlFor="input-lieuMariage"
                                  >
                                  Lieu de mariage 
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-lieuMariage"
                                    placeholder="Lieu de mariage"
                                    name="lieuMariage"
                                    type="text"
                                    onChange={(e)=>onInputChange(e)}
                                    value={acteMariage.lieuMariage}>
                                </Input>
                              </FormGroup>
                              </Col>
                        </Row>
                    </div><hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                        Informations sur les mariés
                    </h6>
                    <div className="pl-lg-4">
                        <Row>
                              <Col lg="6">
                              <FormGroup>
                                  <label
                                  className="form-control-label"
                                  htmlFor="input-epouse"
                                  >
                                  Epouse 
                                  </label>
                                  <Input
                                  className="form-control-alternative"
                                  id="input-epouse"
                                  placeholder="CIN de l'épouse"
                                  type="text"
                                  name="epouse"
                                  onChange={(e)=>onPersonneInputChange(e)}
                                  value={personne.epouse.cin}
                                  />
                              </FormGroup>
                              {personne.epouse.prenom || personne.epouse.nom ? (
                              <div>
                                <label>Epouse: </label>
                                <span>
                                  {personne.epouse.nom} {personne.epouse.prenom}
                                </span>
                              </div>
                            ) : null}
                              </Col>
                              <Col lg="6">
                              <FormGroup>
                                  <label
                                  className="form-control-label"
                                  htmlFor="input-epoux"
                                  >
                                  Epoux
                                  </label>
                                  <Input
                                  className="form-control-alternative"
                                  id="input-epoux"
                                  placeholder="CIN de l'époux"
                                  type="text"
                                  name="epoux"
                                  onChange={(e)=>onPersonneInputChange(e)}
                                  value={personne.epoux.cin}
                                  />
                              </FormGroup>
                              {personne.epoux.prenom || personne.epoux.nom ? (
                              <div>
                                <label>Epoux: </label>
                                <span>
                                  {personne.epoux.nom} {personne.epoux.prenom}
                                </span>
                              </div>
                            ) : null}
                              </Col>
                        </Row>
                    </div><hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                        Informations sur les parents de l'épouse
                    </h6>
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                             <FormGroup>
                                  <label
                                  className="form-control-label"
                                  htmlFor="input-epouse"
                                  >
                                  Mere de l'épouse 
                                  </label>
                                  <Input
                                  className="form-control-alternative"
                                  id="input-mere/epouse"
                                  placeholder="CIN de la mère de l'épouse"
                                  type="text"
                                  name="mereEpouse"
                                  onChange={(e)=>onPersonneInputChange(e)}
                                  value={personne.mereEpouse.cin}
                                  />
                              </FormGroup>
                              {personne.mereEpouse.prenom || personne.mereEpouse.nom ? (
                              <div>
                                <label>Mere de l'épouse: </label>
                                <span>
                                  {personne.mereEpouse.nom} {personne.mereEpouse.prenom}
                                </span>
                              </div>
                            ) : null}
                              </Col>
                              <Col lg="6">
                              <FormGroup>
                                  <label
                                  className="form-control-label"
                                  htmlFor="input-pere-epouse"
                                  >
                                  Pere de l'épouse
                                  </label>
                                  <Input
                                  className="form-control-alternative"
                                  id="input-pere-epouse"
                                  placeholder="CIN du pere de l'épouse"
                                  type="text"
                                  name="pereEpouse"
                                  onChange={(e)=>onPersonneInputChange(e)}
                                  value={personne.pereEpouse.cin}
                                  />
                              </FormGroup>
                              {personne.pereEpouse.prenom || personne.pereEpouse.nom ? (
                              <div>
                                <label>Pere de l'épouse: </label>
                                <span>
                                  {personne.pereEpouse.nom} {personne.pereEpouse.prenom}
                                </span>
                              </div>
                            ) : null}
                              </Col>
                        </Row>
                        </div><hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                        Informations sur les parents de l'époux
                    </h6>
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                             <FormGroup>
                                  <label
                                  className="form-control-label"
                                  htmlFor="input-mere-epoux"
                                  >
                                  Mere de l'époux
                                  </label>
                                  <Input
                                  className="form-control-alternative"
                                  id="input-mere-epoux"
                                  placeholder="CIN de la mère de l'époux"
                                  type="text"
                                  name="mereEpoux"
                                  onChange={(e)=>onPersonneInputChange(e)}
                                  value={personne.mereEpoux.cin}
                                  />
                              </FormGroup>
                              {personne.mereEpoux.prenom || personne.mereEpoux.nom ? (
                              <div>
                                <label>Mere de l'épouse: </label>
                                <span>
                                  {personne.mereEpoux.nom} {personne.mereEpoux.prenom}
                                </span>
                              </div>
                            ) : null}
                              </Col>
                              <Col lg="6">
                              <FormGroup>
                                  <label
                                  className="form-control-label"
                                  htmlFor="input-pere-epoux"
                                  >
                                  Pere de l'époux
                                  </label>
                                  <Input
                                  className="form-control-alternative"
                                  id="input-pere-epoux"
                                  placeholder="CIN du pere de l'époux"
                                  type="text"
                                  name="pereEpoux"
                                  onChange={(e)=>onPersonneInputChange(e)}
                                  value={personne.pereEpoux.cin}
                                  />
                              </FormGroup>
                              {personne.pereEpoux.prenom || personne.pereEpoux.nom ? (
                              <div>
                                <label>Pere de l'époux: </label>
                                <span>
                                  {personne.pereEpoux.nom} {personne.pereEpoux.prenom}
                                </span>
                              </div>
                            ) : null}
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
export default ActeMariage;