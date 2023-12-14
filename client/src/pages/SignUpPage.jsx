import axios from "axios";
import { useState } from "react";
import { Button, Form, InputGroup, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import "../index.css";
// when working on local version
// const API_URL = "http://localhost:3000";

// when working on deployment version
const API_URL = "https://mern-votehub-ih.onrender.com";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [profileImage, setprofileImage] = useState("");

  const [isSoleDeveloperActive, setSoleDeveloperActive] = useState(false);
  const [isTeamDeveloperActive, setTeamDeveloperActive] = useState(false);

  const handleSoleDeveloperChange = () => {
    if (!isSoleDeveloperActive) {
      setSoleDeveloperActive(true);
      setTeamDeveloperActive(false);
    } else {
      setSoleDeveloperActive(false);
    }
  };

  const handleTeamDeveloperChange = () => {
    if (!isTeamDeveloperActive) {
      setTeamDeveloperActive(true);
      setSoleDeveloperActive(false);
    } else {
      setTeamDeveloperActive(false);
    }
  };

  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setprofileImage(reader.result);
    };
  };

  const handleSignUp = () => {
    axios
      .post(`${API_URL}/auth/signup`, {
        profileImage,
        name,
        email,
        password,
        isSoleDeveloperActive,
        isTeamDeveloperActive,
      })
      .then((response) => {
        if (response.status === 200) {
          setSuccess(response.data.message);
          navigate("/");
        }
        setError("");
      })
      .catch((err) => {
        const { status } = err.response;
        const { errorMessage } = err.response.data;

        if (status === 402) {
          setError(errorMessage);
          setSuccess("");
        }
        if (status === 403) {
          setError(errorMessage);
          setSuccess("");
        }
        if (status === 405) {
          setError(errorMessage);
          setSuccess("");
        }
        if (status === 501) {
          setError(errorMessage);
          setSuccess("");
        }
      });
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "100%",
          top: "10%",
          left: "15%",
        }}
      >
        <Container>
          <Row style={{ width: "100%" }}>
            <Col md={6}>
              <div>
                <div className="header-container">
                  <p>
                    <span className="header-first header">Happening now</span>
                  </p>
                  <p>
                    <span className="header-second header">Join VoteHub.</span>
                  </p>
                </div>
                <div>
                  <InputGroup className="mb-2">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-2">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-2">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>

                  {/* start to check checkboxes  */}
                  <Form>
                    <Form.Check
                      type="switch"
                      id="sole-developer-switch"
                      label="Sole Developer"
                      onChange={handleSoleDeveloperChange}
                      checked={isSoleDeveloperActive}
                      disabled={isTeamDeveloperActive}
                    />
                    <Form.Check
                      type="switch"
                      id="team-developer-switch"
                      label="Team Developer"
                      onChange={handleTeamDeveloperChange}
                      checked={isTeamDeveloperActive}
                      disabled={isSoleDeveloperActive}
                    />
                  </Form>
                  {/* finish to check checkboxes  */}

                  <InputGroup
                    className="mb-2"
                    style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="33"
                      height="33"
                      fill="rgb(83, 100, 113)"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        document.getElementById("formuploadModal").click()
                      }
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                    <label
                      htmlFor="formuploadModal"
                      className="file-label"
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-upload"
                        viewBox="0 0 16 16"
                      ></svg>
                      <span>＋ Upload Profile Image</span>
                    </label>
                    <Form.Control
                      onChange={handleImage}
                      type="file"
                      id="formuploadModal"
                      name="modalImage"
                      className="form-control"
                      style={{ display: "none" }}
                    />
                  </InputGroup>

                  <div>
                    <Button
                      style={{
                        backgroundColor: "#32c3ff",
                        borderStyle: "none",
                      }}
                      onClick={() => handleSignUp()}
                      className="create-btn"
                    >
                      Create account
                    </Button>
                    <p className="by-signing">
                      By signing up, you agree to the{" "}
                      <a href="">
                        {" "}
                        <span style={{ color: " rgb(29, 155, 240)" }}>
                          Terms of Service{" "}
                        </span>
                      </a>
                      and{" "}
                      <a href="">
                        <span style={{ color: " rgb(29, 155, 240)" }}>
                          Privacy Policy
                        </span>
                      </a>
                      .
                    </p>
                  </div>
                </div>
                {error}
                {success}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SignUpPage;
