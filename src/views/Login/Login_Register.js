import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "service/auth.service";
import {
  Card,
  CardBody,
  Col,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Champ obligatoire!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Email non valide.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom d'utilisateur doit contenir entre 3 et 20 caractères.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Le mot de passe doit contenir entre 6 et 40 caractères.
      </div>
    );
  }
};

const AuthForm = () => {
  const form = useRef();
  const checkBtn = useRef();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  const handleValidation = () => {
    form.current.validateAll();
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    handleValidation();

    if (checkBtn.current.context._errors.length === 0) {
      if (isRegistering) {
        AuthService.register(username, email, password).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
            navigate("/admin/index");
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      } else {
        AuthService.login(username, password).then(
          (response) => {
            setMessage(response.data);
            console.log(response.data);
            navigate("/admin/index");
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
          }
        );
      }
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>
                {isRegistering ? "Créer un compte" : "Se connecter"}
              </small>
            </div>
            <div className="col-md-12">
              <Form onSubmit={handleAuth} ref={form}>
                {!successful && (
                  <div>
                    {isRegistering && (
                      <div>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-username-83" />
                              </InputGroupText>
                            </InputGroupAddon>

                            <Input
                              type="text"
                              className="form-control"
                              name="username"
                              placeholder="Nom d'utilisateur"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              validations={[required, vusername]}
                            />
                          </InputGroup>
                        </FormGroup>
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
                              name="email"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              validations={[required, validEmail]}
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>
                    )}
                    {!isRegistering && (
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
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            validations={[required]}
                          />
                        </InputGroup>
                      </FormGroup>
                    )}
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-password-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Mot de passe"
                          className="form-control"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          validations={[required, vpassword]}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={handleValidation}
                      >
                        {isRegistering ? "Créer mon compte" : "Connexion"}
                      </button>
                    </div>
                  </div>
                )}

                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}

                <button className="btn btn-link" onClick={toggleForm}>
                  {isRegistering
                    ? "Déjà un compte ? Connectez-vous ici."
                    : "Pas encore de compte ? Créez-en un ici."}
                </button>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default AuthForm;
