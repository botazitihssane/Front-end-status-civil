import { Container } from "reactstrap";

const UserHeader = () => {
  return (
    <>
      <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid></Container>
      </div>
    </>
  );
};

export default UserHeader;
