import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import UserHeader from "components/Headers/UserHeader";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
const ViewArrondissement = () => {
  const navigate = useNavigate();
  const [arrondissements, setArrondissements] = useState([]);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nomArrondissement",
      headerName: "Nom d'arrondissement",
      flex: 1,
    },
    {
      field: "ville",
      headerName: "Ville",
      flex: 1,
    },
    {
      field: "pays",
      headerName: "Pays",
      flex: 1,
    },
    {
      field: "codePostal",
      headerName: "Code Postal",
      flex: 1,
    },
    {
      field: "population",
      headerName: "Population",
      flex: 1,
    },
    {
      field: "superficie",
      headerName: "Superficie",
      flex: 1,
    },
    {
      field: "adresseArrondissement",
      headerName: "Adresse",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEditClick(params.row)}>
            <Edit color="primary" />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row.id)}>
            <GridDeleteIcon color="error" />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleEditClick = (arrondissement) => {
    console.log("before passing ", arrondissement);
    navigate("/admin/editArrondissement", { state: { arrondissement } });
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:8080/api/arrondissement/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 204) {
        loadArrondissement();
      } else {
        console.error("Failed to delete arrondissement");
      }
    });
  };
  const loadArrondissement = () => {
    fetch("http://localhost:8080/api/arrondissements")
      .then((response) => response.json())
      .then((data) => setArrondissements(data));
  };

  useEffect(() => {
    loadArrondissement();
  }, []);

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
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nom arrondissement</th>
                      <th scope="col">Prefecture Appartenante</th>
                      <th scope="col">Ville / Commune</th>
                      <th scope="col">Population</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrondissements.map((arrondissement) => (
                      <tr key={arrondissement.id}>
                        <th scope="row">{arrondissement.id}</th>
                        <td>{arrondissement.nomArrondissement}</td>
                        <td>{arrondissement.prefecture.nomPrefecture}</td>
                        <td>{arrondissement.ville}</td>

                        <td>{arrondissement.population}</td>

                        <td>
                          <div className="d-flex">
                            <IconButton
                              onClick={() => handleEditClick(arrondissement)}
                            >
                              <Edit color="primary" />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                handleDeleteClick(arrondissement.id)
                              }
                            >
                              <GridDeleteIcon color="error" />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ViewArrondissement;
