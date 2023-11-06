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
  Row,
  Table,
} from "reactstrap";
const ViewAnnexe = () => {
  const navigate = useNavigate();
  const [annexes, setAnnexes] = useState([]);

  const handleEditClick = (annexe) => {
    navigate("/admin/editAnnexe", { state: { annexe } });
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:8080/api/annexe/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 204) {
        loadAnnexes();
      } else {
        console.error("Failed to delete annexe");
      }
    });
  };
  const loadAnnexes = () => {
    fetch("http://localhost:8080/api/annexes")
      .then((response) => response.json())
      .then((data) => {
        const annexeData = data.map((annexe) => {
          const id = annexe.arrondissement.id;
          console.log(id);
          fetch(`http://localhost:8080/api/arrondissement/${id}`)
            .then((response) => response.json())
            .then((arrondissementCorrespondant) => {
              annexe.arrondissement =
                arrondissementCorrespondant.nomArrondissement;
              annexe.ville = arrondissementCorrespondant.ville;
              console.log(annexe.arrondissement);
            })
            .catch((error) => {
              console.log(error);
            });
          // Fetch the responsible officer for the annexe

          return annexe;
        });
        setAnnexes(annexeData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadAnnexes();
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
                    <h3 className="mb-0">Liste des annexes</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nom Annexe</th>
                      <th scope="col">Arrondissement Appartenante</th>

                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {annexes.map((annexe) => (
                      <tr key={annexe.id}>
                        <th scope="row">{annexe.id}</th>
                        <td>{annexe.nomAnnexe}</td>
                        <td>{annexe.arrondissement.nomArrondissement}</td>

                        <td>
                          <div className="d-flex">
                            <IconButton onClick={() => handleEditClick(annexe)}>
                              <Edit color="primary" />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteClick(annexe.id)}
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
export default ViewAnnexe;
