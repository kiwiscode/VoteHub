import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/context/UserContext";
import { Container, Row, Col, Button, InputGroup, Form } from "react-bootstrap";
Container;
// when working on local version
// const API_URL = "http://localhost:3000";

// when working on deployment version
const API_URL = "https://mern-votehub-ih.onrender.com";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { updateUser, userInfo } = useContext(UserContext);

  const handleLogin = () => {
    axios
      .post(`${API_URL}/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        const { authToken, user } = response.data;

        localStorage.setItem("userInfo", JSON.stringify(user));
        localStorage.setItem("token", authToken);
        updateUser(user);
        setError("");
        navigate("/");
      })
      .catch((err) => {
        if (err.response !== undefined) {
          const { status } = err.response;
          const { errorMessage } = err.response.data;
          if (status === 403) {
            setError(errorMessage);
          }
          if (status === 402) {
            setError(errorMessage);
          }
          if (status === 400) {
            setError(errorMessage);
          }
          if (status === 401) {
            setError(errorMessage);
          }
          if (status === 500) {
            setError("Please try again later.");
          }
        } else {
          return;
        }
      });
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "100%",
          top: "15%",
          left: "15%",
        }}
      >
        <Container>
          <Row style={{ width: "100%" }}>
            <Col md={6}>
              <InputGroup className="mb-2">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  type="text"
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>{" "}
              <InputGroup className="mb-2">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
              {error}
              <Button
                style={{
                  backgroundColor: "#32c3ff",
                  borderStyle: "none",
                }}
                variant="dark"
                onClick={handleLogin}
              >
                Log in
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default LoginPage;
