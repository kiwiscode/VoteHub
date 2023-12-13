import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Container,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../components/context/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";
import "../index.css";
// when working on local version
// const API_URL = "http://localhost:3000";

// when working on deployment version
const API_URL = "https://mern-votehub.onrender.com/";

function CreateProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [firstImage, setFirstImage] = useState("");
  const [secondImage, setSecondImage] = useState("");
  const [video, setVideo] = useState("");
  const [projectCreators, setProjectCreators] = useState([]);
  const [owners, setOwners] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const addProjectOwner = (user) => {
    // Daha önce eklenmediyse kullanıcıyı ekleyin
    if (!owners.find((owner) => owner._id === user._id)) {
      setOwners((prevOwners) => [...prevOwners, user]);
    }
  };
  const { getToken } = useContext(UserContext);
  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFirstImage(reader.result);
    };
  };

  const handleSecondImage = (e) => {
    const file = e.target.files[0];
    setFileToSecondBase(file);
  };

  const setFileToSecondBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setSecondImage(reader.result);
    };
  };

  useEffect(() => {
    console.log(owners);
    axios
      .get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setProjectCreators(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(owners);
  const handleProjectCreate = () => {
    setSuccess("");
    setIsLoading(true);
    axios
      .post(`${API_URL}/project/create`, {
        title,
        description,
        owners,
        firstImage,
        secondImage,
        video,
      })
      .then((response) => {
        console.log(owners);
        setOwners([]);
        console.log(owners);
        setIsLoading(false);
        setSuccess(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        setSuccess("");
      })
      .finally(() => {
        setIsLoading(false); // Proje oluşturulduktan sonra loading durdurulur.
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
                <div>
                  <InputGroup className="mb-2">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </InputGroup>
                  <Form.Group controlId="description">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter project description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <InputGroup
                    className="mb-2"
                    style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="33"
                      height="33"
                      fill="rgb(83, 100, 113)"
                      className="bi bi-upload"
                      viewBox="0 0 16 16"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        document.getElementById("formuploadModal").click()
                      }
                    >
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                      <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
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
                      <span>＋ Upload First Image</span>
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

                  <InputGroup
                    className="mb-2"
                    style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="33"
                      height="33"
                      fill="rgb(83, 100, 113)"
                      className="bi bi-upload"
                      viewBox="0 0 16 16"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        document.getElementById("formuploadModal2").click()
                      }
                    >
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                      <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                    </svg>
                    <label
                      htmlFor="formuploadModal2"
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
                      <span>＋ Upload Second Image</span>
                    </label>
                    <Form.Control
                      onChange={handleSecondImage}
                      type="file"
                      id="formuploadModal2"
                      name="modalImage"
                      className="form-control"
                      style={{ display: "none" }}
                    />
                  </InputGroup>
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{
                        backgroundColor: "#32c3ff",
                        borderStyle: "none",
                        marginBottom: "5px",
                      }}
                      variant="success"
                      id="dropdown-basic"
                    >
                      Owner/Owners
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {projectCreators.map((user) => {
                        return (
                          <Dropdown.Item
                            key={user._id}
                            href="#/action-1"
                            onClick={() => addProjectOwner(user)}
                          >
                            {user.name}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                  <div>
                    <Button
                      onClick={handleProjectCreate}
                      style={{
                        backgroundColor: "#32c3ff",
                        borderStyle: "none",
                      }}
                      className="create-btn"
                    >
                      Create project
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
                {error ? <div className="error-message">{error}</div> : null}
                <div>{isLoading ? <LoadingSpinner></LoadingSpinner> : ""}</div>
                {success ? (
                  <div className="success-message">{success}</div>
                ) : null}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default CreateProjectPage;
