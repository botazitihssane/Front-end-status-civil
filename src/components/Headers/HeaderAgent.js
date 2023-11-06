import { Container, Row } from "reactstrap";

const HeaderAgent = () => {
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body text-center text-white">
            {/* Card stats */}
            <Row>
              <div className="col-md-12">
                <h1
                  className="display-4"
                  style={{ fontSize: "32px", fontFamily: "Arial, sans-serif" }}
                >
                  Transformez l'avenir avec la digitalisation !
                </h1>
                <p
                  className="lead"
                  style={{
                    fontSize: "18px",
                    fontFamily: "Georgia, serif",
                    margin: "8px 0", // Ajuste la marge en haut et en bas
                  }}
                >
                  Ici, vous êtes le moteur de la transformation numérique.
                </p>
                <p
                  className="lead"
                  style={{
                    fontSize: "22px",
                    fontFamily: "Verdana, sans-serif",
                    margin: "8px 0", // Ajuste la marge en haut et en bas
                  }}
                >
                  Votre engagement envers la sécurité et l'efficacité est notre
                  source d'inspiration.
                </p>
              </div>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HeaderAgent;
