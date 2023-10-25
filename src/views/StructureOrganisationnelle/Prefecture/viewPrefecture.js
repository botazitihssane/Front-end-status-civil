import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import UserHeader from "components/Headers/UserHeader";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
const ViewPrefecture = () => {
  const navigate = useNavigate();
  const [prefectures, setPrefectures] = useState([]);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
    },
    {
      field: "nomPrefecture",
      headerName: "Nom de la prefecture",
      flex: 1,
    },
    {
      field: "population",
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

  const handleEditClick = (prefecture) => {
    navigate("/admin/editPrefecture", { state: { prefecture } });
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:8080/api/prefecture/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 204) {
        loadPrefectures();
      } else {
        console.error("Failed to delete annexe");
      }
    });
  };
  const loadPrefectures = () => {
    fetch("http://localhost:8080/api/prefectures")
      .then((response) => response.json())
      .then((data) => {
        const prefectureData = data.map((prefecture) => {
          const id = prefecture.region.id;
          console.log(id);
          fetch(`http://localhost:8080/api/region/${id}`)
            .then((response) => response.json())
            .then((regionCorrespondante) => {
              prefecture.region = regionCorrespondante.nomRegion;
            })
            .catch((error) => {
              console.log(error);
            });
          return prefecture;
        });
        setPrefectures(prefectureData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadPrefectures();
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
                    <h3 className="mb-0">Liste des prefectures</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <DataGrid
                  rows={prefectures}
                  columns={columns}
                  autoHeight={true}
                  getRowId={(row) => row.id}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ViewPrefecture;
