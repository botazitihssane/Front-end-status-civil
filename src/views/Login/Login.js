import {
  Card,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Champ obligatoire!
      </div>
    );
  }
};
const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        {
          username,
          password,
        }
      );
      const user = response.data;
      console.log(user.id);
      const token = response.data.token;
      Cookies.set("civilStatus", token, { path: "/api", expires: 1 });
      localStorage.setItem("user", JSON.stringify(response.data));

      if (user.roles[0] === "ROLE_ADMIN") {
        navigate("/admin/index");
      } else if (user.roles[0] === "ROLE_OFFICIER") {
        navigate("/agent/index");
      }
    } catch (error) {
      console.error("Login failed. Check your credentials.");
      console.error(error);
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Se connecter</small>
            </div>
            <Form onSubmit={handleLogin} ref={form}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Nom d'utilisateur"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required]}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Mot de passe "
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <button
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Connexion</span>
                </button>
              </FormGroup>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
