import { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { FormGroup, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import UserHeader from "components/Headers/UserHeader";
import { Card, CardBody, CardHeader, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
const ViewCitoyen = () => {
    const navigate = useNavigate();
    const [citoyens,setCitoyens] = useState([]);
    const [recherche, setRecherche] = useState({
        terme:"",
    });
    const columns = [
        { field : "id" , headerName: "ID"},
        {
            field : "nom",
            headerName : "Nom",
            flex: 1,
        },
        {
            field : "prenom",
            headerName : "Prenom",
            flex: 1,
        },
        {
            field : "sexe",
            headerName : "Sexe",
            flex: 1,
        },
        {
            field : "numeroIdentification",
            headerName : "Numero d'identification",
            flex: 1,
        },
        {
            field : "dateNaissance",
            headerName : "Date de naissance",
            flex: 1,
        },
        {
            field : "lieuNaissance",
            headerName : "Lieu de naissance",
            flex: 1,
        },
        {
            field : "nationalite",
            headerName : "Nationalite",
            flex: 1,
        },
        {
            field : "adresse",
            headerName : "Adresse",
            flex: 1,
        },
        {
            field : "profession",
            headerName : "Profession",
            flex: 1,
        },
        {
            field : "etatCivil",
            headerName : "Etat civil",
            flex: 1,
        },
        {
            field : "actions" ,
            headerName:"Actions",
            width :150,
            renderCell:(params) => (
                <div>
                    <IconButton 
                        onClick={()=> handleEditClick(params.row)}>
                        <Edit color='primary'/>
                    </IconButton>
                    <IconButton
                        onClick={()=> handleDeleteClick(params.row.id)}>
                        <GridDeleteIcon color= 'error'/>
                    </IconButton>
                </div>
            ),}
    ];

    const handleInputChange = (e) => {
        setRecherche({...recherche,[e.target.name]:e.target.value});
        searchPersonne(e.target.value);
      };

    const handleEditClick = (citoyen) => {
        navigate("/admin/editCitoyen", {state: {citoyen}});
    }

    const handleDeleteClick = (id) => {
        fetch(`http://localhost:8080/api/personne/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.status === 204) {
                loadCitoyens();
            } else {
                console.error('Failed to delete citizen');
            }
        });
    }

    const searchPersonne = (terme) => {
        if (terme.trim() === "") {
            loadCitoyens();
        }else {
            fetch(`http://localhost:8080/api/personne/terme/${terme}`)
            .then((response) => {
                if (!response.ok) {
                throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setCitoyens(data))
            .catch((error) => console.error("Error loading citoyens:", error));
            console.log(citoyens); 
        }
        
    };

    const loadCitoyens = () => {
        fetch("http://localhost:8080/api/personnes")
        .then((response) => response.json())
        .then((data)=> setCitoyens(data));
    }
    
    useEffect(()=>{
        loadCitoyens();
    },[]);

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
                            <h3 className="mb-0">Liste des citoyens</h3>
                            </Col>
                        
                        <Col className="text-right">
                                <form>
                                    <div className="navbar-search navbar-search-light form-inline mr-3 d-none d-md-flex ml-lg-auto">
                                        <FormGroup className="mb-0">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fas fa-search" />
                                            </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Search"
                                                type="text"
                                                name="terme"
                                                value={recherche.terme}
                                                onChange={(e)=>handleInputChange(e)} />
                                        </InputGroup>
                                        </FormGroup>
                                    </div>
                                </form>
                            </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                                <DataGrid
                                    rows={citoyens}
                                    columns={columns} 
                                    autoHeight={true}
                                    getRowId={(row)=> row.id}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
};
export default ViewCitoyen;