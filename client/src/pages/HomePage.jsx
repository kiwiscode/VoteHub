import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import IronHackLogo from "../assets/logo-ironhack-blue.png";
import { Link } from "react-router-dom";
// when working on local version
const API_URL = "http://localhost:3000";

// when working on deployment version
// ?

function HomePage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <div className="container">
        {users.map((user) => (
          <div key={user.id} className="item">
            <div className="student-card">
              <img src={user.profileImage} alt={user.name} />
              <div>
                <div>
                  <span className="variable-declaration">const </span>
                  <span className="variable-name">name</span>{" "}
                  <span className="variable-declaration-operator">=</span>{" "}
                  <span className="variable-value-string">{`"${user.name}"`}</span>
                </div>
                <div>
                  <span className="variable-declaration">const </span>
                  <span className="variable-name">projectName </span>
                  <span className="variable-declaration-operator">=</span>{" "}
                  <span className="variable-value-string">{`"Unbox Joy"`}</span>
                </div>
                {user.isSoleDeveloper && !user.isTeamDeveloper ? (
                  <div>
                    <div>
                      <span className="variable-declaration">const</span>{" "}
                      <span className="variable-name">isSoleDeveloper</span>{" "}
                      <span className="variable-declaration-operator">=</span>{" "}
                      <span className="variable-value-boolean">true</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="variable-declaration">const</span>{" "}
                    <span className="variable-name">isTeamDeveloper</span>{" "}
                    <span className="variable-declaration-operator">=</span>{" "}
                    <span className="variable-value-boolean">true</span>
                    <br />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* start to check carousel start  */}
      <Carousel style={{ textAlign: "center" }}>
        <Carousel.Item>
          <Link to={"/vote-for-funniest-person"}>
            <img src={IronHackLogo} alt="" />
            <Carousel.Caption>
              <h3 style={{ color: "rgba(0, 0, 0, 0.8)" }}>
                Select the funniest person in your class
              </h3>
              <p style={{ color: "rgba(0, 0, 0, 0.8)" }}>
                Throughout the bootcamp, who was the friend that made you laugh
                the most and whom you found the most entertaining?
              </p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to={"/vote-for-helpful-person"}>
            <img src={IronHackLogo} alt="" />
            <Carousel.Caption>
              <h3 style={{ color: "rgba(0, 0, 0, 0.8)" }}>
                Select the most supportive,helpful person in your class
              </h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to={"/vote-for-best-project"}>
            <img src={IronHackLogo} alt="" />
            <Carousel.Caption>
              <h3 style={{ color: "rgba(0, 0, 0, 0.8)" }}>
                Select the group or person who did the best project
              </h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      </Carousel>
      {/* finish to check carousel finish */}
    </>
  );
}

export default HomePage;
