import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserImage from "../../assets/img/brand/User.jpg";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      const response = await axios.post(
        "http://localhost:8080/api/auth/signout"
      );
      if (response.status === 200) {
        document.cookie =
          "civilstatus=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/api;";
        navigate("/auth/login");
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Logout failed.", error);
    }
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        {
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {props.brandText}
            </Link>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img alt="User Profile" src={UserImage} />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {currentUser.username}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Bienvenue !</h6>
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>
                    <i className="ni ni-user-run" />
                    <span>Se déconnecter</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        }
      </Navbar>
    </>
  );
};

export default AdminNavbar;
