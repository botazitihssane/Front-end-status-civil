import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import HeaderAgent from "components/Headers/HeaderAgent";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2"; // Importez vos options et exemples de chart ici
import { chartOptions } from "variables/charts";

const IndexAgent = (props) => {
  // Utilisez les options et les données de l'exemple de chart que vous avez importés
  const data = {
    labels: [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sep",
      "Oct",
      "Nov",
    ],
    datasets: [
      {
        label: "Actes ajoutés au cours du mois",
        data: [100, 120, 80, 90, 110, 130, 140, 0, 95, 75, 105],
        backgroundColor: "#172b4d", // Remplacez par les données réelles
      },
    ],
  };
  const options = chartOptions();

  // Tableaux d'actions rapides pour les citoyens, les actes de décès et les actes de naissance
  const quickActionsCitoyen = [
    {
      color: "danger",
      text: "Afficher Citoyen",
      to: "/agent/viewCitoyens",
    },
    {
      color: "danger",
      text: "Ajouter Citoyen",
      to: "/agent/citoyen",
    },
  ];

  const quickActionsActeDeces = [
    {
      color: "danger",
      text: "Afficher Acte de Décès",
      to: "/agent/ListeActeDeces",
    },
    {
      color: "danger",
      text: "Ajouter Acte de Décès",
      to: "/agent/acteDeces",
    },
  ];

  const quickActionsActeNaissance = [
    {
      color: "danger",
      text: "Afficher Acte de Naissance",
      to: "/agent/ListeActeNaissance",
    },
    {
      color: "danger",
      text: "Ajouter Acte de Naissance",
      to: "/agent/acteNaissance",
    },
  ];

  return (
    <>
      <HeaderAgent />
      <Container className="mt--7" fluid>
        <Row>
          <Col md="6">
            <Card>
              <CardBody>
                <CardTitle>Votre performance cette année !</CardTitle>
                <Bar data={data} options={options} />{" "}
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="mb-4">
              <CardBody>
                <CardTitle>Actions Rapides pour les Citoyens</CardTitle>
                {quickActionsCitoyen.map((action, index) => (
                  <Button
                    key={index}
                    color={action.color}
                    to={action.to}
                    tag={Link}
                    className="custom-button"
                  >
                    {action.text}
                  </Button>
                ))}
              </CardBody>
            </Card>
            <Card className="mb-4">
              <CardBody>
                <CardTitle>Actions Rapides pour les Actes de Décès</CardTitle>
                {quickActionsActeDeces.map((action, index) => (
                  <Button
                    key={index}
                    color={action.color}
                    to={action.to}
                    tag={Link}
                    className="custom-button"
                  >
                    {action.text}
                  </Button>
                ))}
              </CardBody>
            </Card>
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  Actions Rapides pour les Actes de Naissance
                </CardTitle>
                {quickActionsActeNaissance.map((action, index) => (
                  <Button
                    key={index}
                    color={action.color}
                    to={action.to}
                    tag={Link}
                    className="custom-button"
                  >
                    {action.text}
                  </Button>
                ))}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default IndexAgent;
