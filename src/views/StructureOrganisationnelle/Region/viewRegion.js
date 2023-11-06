import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Table,
} from "reactstrap";
const ViewRegion = () => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  /*const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nomRegion",
      headerName: "Nom région",
      flex: 1,
    },
    {
      field: "superficie",
      headerName: "superficie",
      flex: 1,
    },
    {
      field: "population",
      headerName: "Population",
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
  ];*/

  const handleEditClick = (region) => {
    navigate("/admin/editRegion", { state: { region } });
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:8080/api/region/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 204) {
        loadRegions();
      } else {
        console.error("Failed to delete region");
      }
    });
  };
  const loadRegions = () => {
    fetch("http://localhost:8080/api/regions")
      .then((response) => response.json())
      .then((data) => setRegions(data));
  };

  useEffect(() => {
    loadRegions();
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
                    <h3 className="mb-0">Liste des régions</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nom région</th>
                      <th scope="col">Population</th>
                      <th scope="col">Superficie</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regions.map((region) => (
                      <tr key={region.id}>
                        <th scope="row">{region.id}</th>
                        <td>{region.nomRegion}</td>
                        <td>{region.population}</td>
                        <td>{region.superficie}</td>

                        <td>
                          <div className="d-flex">
                            <IconButton onClick={() => handleEditClick(region)}>
                              <Edit color="primary" />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteClick(region.id)}
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
export default ViewRegion;
