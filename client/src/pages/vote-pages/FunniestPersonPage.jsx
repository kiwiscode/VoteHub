import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { UserContext } from "../../components/context/UserContext";

// when working on local version
// const API_URL = "http://localhost:3000";

// when working on deployment version
const API_URL = "https://mern-votehub.onrender.com/";

function FunniestPersonPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { userInfo } = useContext(UserContext);
  const [updateUser, setUpdateUser] = useState(null);
  // start to check funniest person votes
  const [selectedUserId, setSelectedUserId] = useState(null); // Seçilen kullanıcıyı saklamak için
  // finish to check funniest person votes
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [votedDone, setVotedDone] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo);
  }, [userInfo.isVotedForFunniestPerson, userInfo.votedForFunniestPerson]);

  const handleFunniestPersonVoteChange = (user) => {
    setSelectedUserId((prevSelectedUser) => {
      // Eğer önceki seçilen kullanıcı zaten varsa, yeni seçilen kullanıcı ile değiştir
      return prevSelectedUser === user ? null : user;
    });
  };

  const submitVote = () => {
    axios
      .post(`${API_URL}/vote-for-funniest-person`, {
        selectedUserId,
        userId: userInfo._id,
      })
      .then((response) => {
        if (response) {
          setError("");
          setSuccess(response.data.message);
          setVotedDone(true);
        }
        setSelectedUserId(null);
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        userInfo.isVotedForFunniestPerson = true;
        userInfo.votedForFunniestPerson.push(selectedUserId._id);

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

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          padding: "10px",
          width: "15%",
          fontSize: "25px",
          fontWeight: "400",
          color: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <Link
          style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.8)" }}
          to={"/"}
        >
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.8)",
              borderLeft: "none",
              borderTop: "none",
              borderRight: "none",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
            <span
              style={{
                padding: "10px",
                width: "15%",
                fontSize: "25px",
                fontWeight: "400",
                color: "rgba(0, 0, 0, 0.8)",
              }}
            >
              Go Home Page
            </span>
          </div>
        </Link>
        Choose the classmate who brings the most laughter into your life
        <span>🎉</span>
        <div className="mb-2">
          <Button
            onClick={() => submitVote()}
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
      >
        <Link
          style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.8)" }}
          to={"/vote-for-helpful-person"}
        >
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.8)",
              borderLeft: "none",
              borderTop: "none",
              borderRight: "none",
            }}
          >
            <span
              style={{
                padding: "10px",

                fontSize: "25px",
                fontWeight: "400",
                color: "rgba(0, 0, 0, 0.8)",
              }}
            >
              Select Supportive Classmate
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
            </svg>
          </div>
        </Link>
        Pick the classmate who provides the utmost support in your journey
        <span>💪🏻</span>
      </div>

      <Container>
        <Row>
          {users.map((user, index) => (
            <Col key={user._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <div className="funniest-item">
                <div className="student-card">
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="img-fluid"
                    style={{ maxHeight: "150px", objectFit: "cover" }}
                  />
                  <div className="mt-2">
                    <h5>{user.name}</h5>

                    <Form>
                      <Form.Check
                        type="switch"
                        id="sole-developer-switch"
                        label="true"
                        className="variable-value-boolean"
                        onChange={() => handleFunniestPersonVoteChange(user)}
                        checked={selectedUserId === user}
                        disabled={
                          userInfo._id === user._id ||
                          userInfo.isVotedForFunniestPerson ||
                          votedDone ||
                          (selectedUserId !== null && selectedUserId !== user)
                        }
                      />
                    </Form>
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

export default FunniestPersonPage;
