import { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import UserHeader from "components/Headers/UserHeader";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
const ViewAnnexe = () => {
    const navigate = useNavigate();
    const [annexes,setAnnexes] = useState([]);
    const columns = [
        { field : "id" , headerName: "ID"},
        {
            field : "arrondissement",
            headerName : "Arrondissement",
            flex: 1,
        },
        {
            field : "nomAnnexe",
            headerName : "nomAnnexe",
            flex: 1,
        },
        {
            field : "adresseAnnexe",
            headerName : "Adresse",
            flex: 1,
        },
        {
            field : "ville",
            headerName : "Ville",
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

    const handleEditClick = (annexe) => {
        navigate("/admin/editAnnexe", {state: {annexe}});
    }

    const handleDeleteClick = (id) => {
        fetch(`http://localhost:8080/api/annexe/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.status === 204) {
                loadAnnexes();
            } else {
                console.error('Failed to delete annexe');
            }
        });
    }
    const loadAnnexes = () => {
        fetch("http://localhost:8080/api/annexes")
        .then((response) => response.json())
        .then((data)=> {
            const annexeData = data.map((annexe) => {
                const id = annexe.arrondissement.id;
                console.log(id);
                fetch(`http://localhost:8080/api/arrondissement/${id}`)
                .then((response) => response.json())
                .then((arrondissementCorrespondant) => {
                    annexe.arrondissement = arrondissementCorrespondant.nomArrondissement;
                    annexe.ville=arrondissementCorrespondant.ville;
                    console.log(annexe.arrondissement);
                })
                .catch((error)=> {
                    console.log(error);
                });
                return annexe;
            });
            setAnnexes(annexeData);
            })
        .catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        loadAnnexes();
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
                            <h3 className="mb-0">Liste des annexes</h3>
                            </Col>
                        </Row>
                        </CardHeader>
                        <CardBody>
                                <DataGrid
                                    rows={annexes}
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
export default ViewAnnexe;

