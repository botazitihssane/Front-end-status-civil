import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";

const ViewActeMariage = () => {
  const { default: Web3 } = require("web3");
  const [acteMariage, setActeMariage] = useState({
    id: "",
    epoux: "",
    epouse: "",
    dateMariage: "",
    lieuMariage: "",
    mereEpoux: "",
    pereEpoux: "",
    mereEpouse: "",
    pereEpouse: "",
  });
  const loadActe = () => {
    interactWithBlockchain();
    /*fetch(`http://localhost:8080/api/actes/mariage/transactions/id/${6}`)
      .then((response) => response.json())
      .then((data) => {
        setActeMariage(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });*/
  };
  const interactWithBlockchain = async () => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:7545")
    );

    const abi = [
      {
        constant: true,
        inputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        name: "record",
        outputs: [
          {
            name: "id",
            type: "uint256",
          },
          {
            name: "officierValidant",
            type: "string",
          },
          {
            name: "lieuMariage",
            type: "string",
          },
          {
            name: "dateMariage",
            type: "string",
          },
          {
            name: "epouse",
            type: "string",
          },
          {
            name: "epoux",
            type: "string",
          },
          {
            name: "mereEpoux",
            type: "string",
          },
          {
            name: "pereEpoux",
            type: "string",
          },
          {
            name: "mereEpouse",
            type: "string",
          },
          {
            name: "pereEpouse",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "recordCount",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: "id",
            type: "uint256",
          },
          {
            indexed: false,
            name: "officierValidant",
            type: "string",
          },
          {
            indexed: false,
            name: "timestamp",
            type: "uint256",
          },
        ],
        name: "ActeAjoute",
        type: "event",
      },
      {
        constant: false,
        inputs: [
          {
            name: "_officierValidant",
            type: "string",
          },
          {
            name: "_lieuMariage",
            type: "string",
          },
          {
            name: "_dateMariage",
            type: "string",
          },
          {
            name: "_epouse",
            type: "string",
          },
          {
            name: "_epoux",
            type: "string",
          },
          {
            name: "_mereEpoux",
            type: "string",
          },
          {
            name: "_pereEpoux",
            type: "string",
          },
          {
            name: "_mereEpouse",
            type: "string",
          },
          {
            name: "_pereEpouse",
            type: "string",
          },
        ],
        name: "ajouterActe",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "_id",
            type: "uint256",
          },
        ],
        name: "getActe",
        outputs: [
          {
            components: [
              {
                name: "id",
                type: "uint256",
              },
              {
                name: "officierValidant",
                type: "string",
              },
              {
                name: "lieuMariage",
                type: "string",
              },
              {
                name: "dateMariage",
                type: "string",
              },
              {
                name: "epouse",
                type: "string",
              },
              {
                name: "epoux",
                type: "string",
              },
              {
                name: "mereEpoux",
                type: "string",
              },
              {
                name: "pereEpoux",
                type: "string",
              },
              {
                name: "mereEpouse",
                type: "string",
              },
              {
                name: "pereEpouse",
                type: "string",
              },
            ],
            name: "",
            type: "tuple",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ];
    const contractAddress = "0x9546a8f4738b33DBD9EFf9fBDe32c6D721C76552";
    const MyContract = new web3.eth.Contract(abi, contractAddress);

    try {
      const acteId = 2;
      const acteData = await MyContract.methods.getActe(acteId).call();
      setActeMariage({
        id: acteId,
        epoux: acteData.epoux,
        epouse: acteData.epouse,
        dateMariage: acteData.dateMariage,
        lieuMariage: acteData.lieuMariage,
        mereEpouse: acteData.mereEpouse,
        pereEpouse: acteData.pereEpouse,
        mereEpoux: acteData.mereEpoux,
        pereEpoux: acteData.pereEpoux,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadActe();
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
                    <h3 className="mb-0">
                      Acte de mariage nº {acteMariage.id}
                    </h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Informations d'acte de mariage
                  </h6>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">Epouse: </label>
                        <span className="form-control-label">
                          {acteMariage.epouse}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">CIN: </label>
                        <span className="form-control-label">
                          {acteMariage.cinEpouse}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">Née le: </label>
                        <span className="form-control-label">
                          {acteMariage.dateNaissanceEpouse}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">à : </label>
                        <span className="form-control-label">
                          {acteMariage.lieuNaissanceEpouse}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">Fille de :</label>
                        <span className="form-control-label">
                          {acteMariage.pereEpouse}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">Et de :</label>
                        <span className="form-control-label">
                          {acteMariage.mereEpouse}
                        </span>
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">Epoux : </label>
                        <span className="form-control-label">
                          {acteMariage.epoux}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">CIN: </label>
                        <span className="form-control-label">
                          {acteMariage.cinEpoux}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">Né le: </label>
                        <span className="form-control-label">
                          {acteMariage.dateNaissanceEpoux}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">à : </label>
                        <span className="form-control-label">
                          {acteMariage.lieuNaissanceEpoux}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">Fils de :</label>
                        <span className="form-control-label">
                          {acteMariage.pereEpoux}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">Et de :</label>
                        <span className="form-control-label">
                          {acteMariage.mereEpouse}
                        </span>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">
                          Mariés le :{" "}
                        </label>
                        <span className="form-control-label">
                          {acteMariage.dateMariage}
                        </span>
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">à :</label>
                        <span className="form-control-label">
                          {acteMariage.lieuMariage}
                        </span>
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="text-right">
                    <Button type="submit" color="primary">
                      Imprimer l'acte
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ViewActeMariage;
