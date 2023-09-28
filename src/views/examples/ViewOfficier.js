import { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { FormGroup, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import UserHeader from "components/Headers/UserHeader";
import { Card, CardBody, CardHeader, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
const ViewOfficier = () => {
    const navigate = useNavigate();
    const [officiers,setOfficiers] = useState([]);
    const [recherche, setRecherche] = useState({
        terme:"",
    });
    const columns = [
        { field : "id" , headerName: "ID"},
        {
            field : "cin",
            headerName : "CIN",
            flex: 1,
        },
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
            field : "grade",
            headerName : "Grade",
            flex: 1,
        },
        {
            field : "email",
            headerName : "Email",
            flex: 1,
        },
        {
            field : "telephone",
            headerName : "Telephone",
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
        searchOfficiers(e.target.value);
      };
    
    const handleEditClick = (officier) => {
        navigate("/admin/editOfficier", {state: {officier}});
    }

    const handleDeleteClick = (id) => {
        fetch(`http://localhost:8080/api/Officier/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.status === 204) {
                loadOfficier();
            } else {
                console.error('Failed to delete officer');
            }
        });
    }
    const loadOfficier = () => {
        fetch("http://localhost:8080/api/officiers")
        .then((response) => response.json())
        .then((data)=> setOfficiers(data));
    };

    const searchOfficiers = (nom) => {
            fetch(`http://localhost:8080/api/officier/nom/${nom}`)
            .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => setOfficiers(data))
              .catch((error) => console.error("Error loading officiers:", error));
              console.log(officiers); 
    };

    useEffect(() => {
        loadOfficier();
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
                            <h3 className="mb-0">Liste des officiers</h3>
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
                                    rows={officiers}
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
export default ViewOfficier;

