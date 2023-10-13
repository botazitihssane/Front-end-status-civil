import { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { FormGroup, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import UserHeader from "components/Headers/UserHeader";
import { Card, CardBody, CardHeader, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
const Viewregistre = () => {
    const navigate = useNavigate();
    const [registres,setregistres] = useState([]);
    const [recherche, setRecherche] = useState({
        terme:"",
    });
    const columns = [
        { field : "id" , headerName: "ID"},
        {
            field : "nomRegistre",
            headerName : "Nom registre",
            flex: 1,
        },
        {
            field : "typeRegistre",
            headerName : "Type du registre",
            flex: 1,
        },
        {
            field : "annexe",
            headerName : "Annexe appartenant",
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
        searchregistres(e.target.value);
      };
    
    const handleEditClick = (registre) => {
        navigate("/admin/editRegistre", {state: {registre}});
    }

    const handleDeleteClick = (id) => {
        fetch(`http://localhost:8080/api/registre/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.status === 204) {
                loadregistres();
            } else {
                console.error('Failed to delete officer');
            }
        });
    }
    const loadregistres = () => {
        fetch("http://localhost:8080/api/registres")
        .then((response) => response.json())
        .then((data)=> {
            const registreData = data.map((registre) => {
                const id = registre.annexe.id;
                console.log(id);
                fetch(`http://localhost:8080/api/annexe/${id}`)
                .then((response) => response.json())
                .then((annexeCorrespondante) => {
                    registre.annexe = annexeCorrespondante.nomAnnexe;
                    console.log(registre.annexe);
                })
                .catch((error)=> {
                    console.log(error);
                });
                return registre;
            });
            setregistres(registreData);
        })
        .catch((error)=>{
            console.log(error);
        });
    }

   

    const searchregistres = (terme) => {
            fetch(`http://localhost:8080/api/registre/terme/${terme}`)
            .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => setregistres(data))
              .catch((error) => console.error("Error loading registres:", error));
              console.log(registres); 
    };

    useEffect(() => {
        loadregistres();
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
                            <h3 className="mb-0">Liste des registres</h3>
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
                                    rows={registres}
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
export default Viewregistre;

