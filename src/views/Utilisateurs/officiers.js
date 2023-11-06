import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { IconButton, MenuItem, Select } from "@mui/material";
import { BackHand, Edit, ReplayOutlined, Save } from "@mui/icons-material";
import UserHeader from "components/Headers/UserHeader";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
  Table,
} from "reactstrap";

const ViewUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserStatus, setEditUserStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setEditUserStatus(getUserStatus(user));
    setIsEditing(true);
  };

  const saveUserStatus = (userId) => {
    const updatedStatus = {
      id: userId,
      status: editUserStatus,
    };

    if (editUserStatus === "Désactivé") {
      fetch(`http://localhost:8080/api/officier/removeRole/${userId}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.status === 204) {
          loadUsers();
        } else {
          console.error("Échec de la suppression du rôle de l'utilisateur");
        }
      });
    } else if (editUserStatus === "Activé") {
      fetch(`http://localhost:8080/api/officier/assignRole/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 204) {
          loadUsers();
        } else {
          console.error("Échec de l'attribution du rôle de l'utilisateur");
        }
      });
    }

    // Enregistrez le statut de l'utilisateur
    fetch(`http://localhost:8080/api/officier`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStatus),
    }).then((response) => {
      if (response.status === 204) {
        setEditUserStatus("");
        setEditUserId(null);
        setIsEditing(false); // Sortir du mode d'édition
        loadUsers();
      } else {
        console.error("Échec de la mise à jour du statut de l'utilisateur");
      }
    });
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:8080/api/officier/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 204) {
        loadUsers();
      } else {
        console.error("Failed to delete user");
      }
    });
  };

  const loadUsers = () => {
    fetch("http://localhost:8080/api/officiers")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const cancelEdit = () => {
    setEditUserStatus("");
    setEditUserId(null);
    setIsEditing(false);
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const getUserStatus = (user) => {
    // Check if the user has the "ROLE_OFFICIER" role
    const hasOfficierRole = user.roles.some(
      (role) => role.name === "ROLE_OFFICIER"
    );

    return hasOfficierRole ? "Activé" : "Désactivé";
  };

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
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Prenom</th>
                      <th scope="col">Annexe</th>
                      <th scope="col">Email</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <th scope="row">{user.id}</th>
                        <td>{user.nom}</td>
                        <td>{user.prenom}</td>
                        <td>{user.annexe.nomAnnexe}</td>
                        <td>{user.email}</td>
                        <td>
                          {isEditing && editUserId === user.id ? (
                            <div>
                              <Select
                                value={editUserStatus}
                                onChange={(e) =>
                                  setEditUserStatus(e.target.value)
                                }
                              >
                                <MenuItem value="Activé">Activé</MenuItem>
                                <MenuItem value="Désactivé">Désactivé</MenuItem>
                              </Select>
                            </div>
                          ) : (
                            getUserStatus(user)
                          )}
                        </td>
                        <td>
                          {isEditing && editUserId === user.id ? (
                            <div>
                              <IconButton
                                onClick={() => saveUserStatus(user.id)}
                              >
                                <Save color="primary" />
                              </IconButton>
                              <IconButton onClick={() => cancelEdit()}>
                                <ReplayOutlined color="success" />
                              </IconButton>
                            </div>
                          ) : (
                            <div className="d-flex">
                              <IconButton onClick={() => handleEditClick(user)}>
                                <Edit color="primary" />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDeleteClick(user.id)}
                              >
                                <GridDeleteIcon color="error" />
                              </IconButton>
                            </div>
                          )}
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

export default ViewUsers;
