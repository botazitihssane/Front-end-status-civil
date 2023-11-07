import { IconButton } from "@mui/material";
import UserHeader from "components/Headers/UserHeader";
import { useEffect } from "react";
import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Table,
} from "reactstrap";

const HistoriqueActeNaissance = () => {
  const [historiques, setHistoriques] = useState([]);

  const loadHistorique = () => {
    fetch("http://localhost:8080/api/acteNaissance")
      .then((response) => response.json())
      .then((data) => {
        setHistoriques(data);
        console.log(data);
      });
  };

  useEffect(() => {
    loadHistorique();
  });
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
                    <h3 className="mb-0">Historiques des actes de naissance</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Date d'enregistrement</th>
                      <th scope="col">Lieu d'enregistrement</th>
                      <th scope="col">Registre</th>
                      <th scope="col">Personne liée</th>
                      <th scope="col">Officier responsable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historiques.map((historique) => (
                      <tr key={historique.id}>
                        <th scope="row">{historique.id}</th>
                        <td>{historique.dateEnregistrement}</td>
                        <td>{historique.registre.annexe.nomAnnexe}</td>
                        <td>{historique.registre.nomRegistre}</td>
                        <td>
                          {historique.personne.nom + " "}{" "}
                          {historique.personne.prenom}
                        </td>
                        <td>
                          {historique.officier.nom + " "}{" "}
                          {historique.officier.prenom}
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

export default HistoriqueActeNaissance;
