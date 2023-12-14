import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/context/UserContext";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
// when working on local version

const API_URL = "http://localhost:3000";

// when working on deployment version
// ?
function BestProjectPage() {
  const [projects, setProjects] = useState([]);
  const { getToken, userInfo } = useContext(UserContext);

  // start to check best project votes
  const [selectedProjects, setSelectedProjects] = useState([]); // Seçilen kullanıcıyı saklamak için
  // finish to check best project votes
  const [votedDone, setVotedDone] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/project/allProjects`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        console.log(response);

        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo);
  }, [userInfo.isVotedForBestProject, userInfo.votedForBestProject]);

  const handleBestProjectVoteChange = (project) => {
    // Eğer seçilen projelerin sayısı 2'ye ulaşırsa başka seçim yapılmasını engelle
    if (selectedProjects.length === 2) {
      return;
    }

    // Seçilen projeler arasında zaten varsa, çıkart; yoksa ekle
    setSelectedProjects((prevSelectedProjects) => {
      const isAlreadySelected = prevSelectedProjects.some(
        (selectedProject) => selectedProject._id === project._id
      );

      if (isAlreadySelected) {
        // Projeyi çıkart
        return prevSelectedProjects.filter(
          (selectedProject) => selectedProject._id !== project._id
        );
      } else {
        // Projeyi ekle
        return [...prevSelectedProjects, project];
      }
    });
  };

  const handleChooseProject = () => {
    axios
      .post(`${API_URL}/vote-for-best-project`, {
        selectedProjects,
        userId: userInfo._id,
      })
      .then((response) => {
        if (response) {
          setError("");
          setSuccess(response.data.message);
          setVotedDone(true);
        }
        setSelectedProjects([]);

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        userInfo.isVotedForBestProject = true;
        userInfo.votedForBestProject.push(
          selectedProjects[0]._id,
          selectedProjects[1]._id
        );

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      })
      .catch((error) => {
        console.error(error);
        if (error) {
          setError(error.response.data.errorMessage);
          setSuccess("");
        }
      });
  };

  const checkOwnerIds = (array) => {
    return array.map((owner) => {
      return owner._id;
    });
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          width: "15%",
          fontWeight: "400",
          color: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <span>Pick the project that you find the most beautiful🌟 </span>
        <div className="mb-2">
          <Button
            onClick={() => handleChooseProject()}
            variant="primary"
            size="lg"
            style={{
              backgroundColor: "#32c3ff",
              borderStyle: "none",
            }}
          >
            Submit your vote
          </Button>{" "}
          {error ? <div className="error-message">{error}</div> : null}
          {success ? <div className="success-message">{success}</div> : null}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 100,
          right: -20,
          padding: "10px",
          width: "20%",
          fontSize: "25px",
          fontWeight: "400",
          color: "rgba(0, 0, 0, 0.8)",
        }}
      ></div>

      <Container>
        <Row>
          {projects.map((project, index) => (
            <Col
              key={project._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4"
            >
              <div className="funniest-item">
                <div className="project-card">
                  <img
                    src={project.projectImages[0]}
                    alt={project.title}
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "auto",
                      objectFit: "cover",
                      margin: "10px",
                      borderRadius: "5%",
                    }}
                  />
                  <img
                    src={project.projectImages[1]}
                    alt={project.title}
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      margin: "10px",
                      borderRadius: "5%",
                    }}
                  />
                  <div className="mt-2">
                    <h5>{project.title}</h5>
                    {project.owners.map((owner) => (
                      <div key={project.id}>
                        <div>
                          <img
                            style={{ maxWidth: "75px", margin: "5px" }}
                            src={owner.profileImage}
                            alt={owner.name}
                          />
                          <span>{owner.name}</span>
                        </div>
                      </div>
                    ))}

                    <Form>
                      <Form.Check
                        type="switch"
                        id={`project-switch-${project._id}`}
                        label={`Vote for ${project.title}`}
                        onChange={() => handleBestProjectVoteChange(project)}
                        checked={selectedProjects.some(
                          (selectedProject) =>
                            selectedProject._id === project._id
                        )}
                        disabled={
                          votedDone ||
                          checkOwnerIds(project.owners).includes(
                            userInfo._id
                          ) ||
                          userInfo.isVotedForBestProject
                          // const checkOwnerIds = (array) => {
                          //   return array.map((owner) => {
                          //     return owner._id;
                          //   });
                          // };
                          // console.log(projects);
                          // console.log(checkOwnerIds(projects[0].owners));
                          // console.log(checkOwnerIds(projects[1].owners));
                          // console.log(checkOwnerIds(projects[2].owners));
                          // console.log(checkOwnerIds(projects[3].owners));
                        }
                      />
                    </Form>
                    <div></div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
export default BestProjectPage;
