import { useState , useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import UserHeader from "components/Headers/UserHeader";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
const ViewArrondissement = () => {
    const navigate = useNavigate();
    const [arrondissements,setArrondissements] = useState([]);
    const columns = [
        { field : "id" , headerName: "ID"},
        {
            field : "nomArrondissement",
            headerName : "Nom d'arrondissement",
            flex: 1,
        },
        {
            field : "ville",
            headerName : "Ville",
            flex: 1,
        },
        {
            field : "pays",
            headerName : "Pays",
            flex: 1,
        },
        {
            field : "codePostal",
            headerName : "Code Postal",
            flex: 1,
        },
        {
            field : "population",
            headerName : "Population",
            flex: 1,
        },
        {
            field : "superficie",
            headerName : "Superficie",
            flex: 1,
        },
        {
            field : "adresseArrondissement",
            headerName : "Adresse",
            flex: 1,
        },
        {
            field : "quartiers",
            headerName : "Quarties",
            flex: 1,
        },
        /*{
            field : "annexe",
            headerName : "Annexe",
            flex: 1,
        },*/
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

    // Fetch the annexes too 
    /*const loadArrondissement = () => {
        fetch("http://localhost:8080/api/arrondissements")
        .then((response) => response.json())
        .then((data)=> {
            const arrondissementData = data.map((arrondissement) => {
                const id = arrondissement.annexe.id;
                fetch(`http://localhost:8080/api/annexes/${id}`)
                .then((response)=> response.json())
                .then((annexeData) => { 
                    arrondissement.annexe = annexeData.nom;
                    console.log(arrondissement.annexe.nom);
            })
            .catch((error)=> {
                console.log(error);
            });
            return arrondissements;
        });
        setArrondissements(arrondissementData);
        console.log(arrondissementData);
    })
    .catch((error)=>{
    console.log(error);
    });
    }*/

    
    const handleEditClick = (arrondissement) => {
        console.log("before passing " , arrondissement);
        navigate("/admin/editArrondissement", {state: {arrondissement}});
    }

    const handleDeleteClick = (id) => {
        fetch(`http://localhost:8080/api/arrondissement/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.status === 204) {
                loadArrondissement();
            } else {
                console.error('Failed to delete arrondissement');
            }
        });
    }
    const loadArrondissement = () => {
        fetch("http://localhost:8080/api/arrondissements")
        .then((response) => response.json())
        .then((data)=> setArrondissements(data));
    }
    
    useEffect(()=>{
        loadArrondissement();
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
                            <h3 className="mb-0">Liste des arrondissements</h3>
                            </Col>
                        </Row>
                        </CardHeader>
                        <CardBody>
                                <DataGrid
                                    rows={arrondissements}
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
export default ViewArrondissement;

