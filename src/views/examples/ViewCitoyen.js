import { useState , useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import UserHeader from "components/Headers/UserHeader";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
const ViewCitoyen = () => {
    const navigate = useNavigate();
    const [citoyens,setCitoyens] = useState([]);
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

    
    const handleEditClick = (citoyen) => {
        console.log("before passing " , citoyen);
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