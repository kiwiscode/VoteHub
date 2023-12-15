import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

// when working on local version
// const API_URL = "http://localhost:3000";

// when working on deployment version
const API_URL = "https://mern-votehub-ih.onrender.com";

function VoteFinishPage() {
  const [funniestPerson, setFunniestPerson] = useState([]);
  const [helpfulPerson, setHelpfulPerson] = useState([]);
  const [bestProjects, setBestProjects] = useState([]);

  console.log("Funniest person =>", funniestPerson);
  console.log("Helpful person =>", helpfulPerson);
  console.log("Best projects =>", bestProjects);
  useEffect(() => {
    axios
      .get(`${API_URL}/funniest-person-results`)
      .then((response) => {
        console.log("FUNNIEST PERSON RESULTS =>", response);

        setFunniestPerson(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_URL}/helpful-person-results`)
      .then((response) => {
        console.log("HELPFUL PERSON RESULTS =>", response);
        setHelpfulPerson(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_URL}/most-beautiful-projects-results`)
      .then((response) => {
        console.log("BEST 2 PROJECT RESULTS =>", response);
        setBestProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="funniest-person">
            {/* start to check  */}
            <div>
              <span className="variable-declaration">const </span>
              <span className="variable-name">award</span>{" "}
              <span className="variable-declaration-operator">=</span>{" "}
              <span className="variable-value-string">
                {`"Funniest person in the class 🤣";`}
              </span>
            </div>

            {/* finish to check  */}

            {funniestPerson ? (
              <>
                {/* start to check  */}
                <div>
                  <span className="variable-declaration">const </span>
                  <span className="variable-name">name</span>{" "}
                  <span className="variable-declaration-operator">=</span>{" "}
                  <span className="variable-value-string">{`"${funniestPerson.name}";`}</span>
                </div>

                {/* finish to check */}

                {/* start to check  */}

                <div>
                  <span className="variable-declaration">const </span>
                  <span className="variable-name">voteCount</span>{" "}
                  <span className="variable-declaration-operator">=</span>{" "}
                  <span className="variable-value-string">
                    {funniestPerson.theVotesReceivedForTheFunniestPerson
                      ? `${funniestPerson.theVotesReceivedForTheFunniestPerson.length};`
                      : ""}
                  </span>
                </div>

                {/* finish to check  */}

                <img
                  style={{ maxWidth: "250px", margin: "5px" }}
                  src={`${funniestPerson.profileImage}`}
                  alt=""
                />

                <div></div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </Col>
        <Col>
          <div className="helpful-person">
            <div>
              <span className="variable-declaration">const </span>
              <span className="variable-name">award</span>{" "}
              <span className="variable-declaration-operator">=</span>{" "}
              <span className="variable-value-string">
                {`"Most supportive, helpful person in the class 💪🏻";`}
              </span>
            </div>
            {helpfulPerson ? (
              <>
                {/* start to check  */}

                <div>
                  <span className="variable-declaration">const </span>
                  <span className="variable-name">name</span>{" "}
                  <span className="variable-declaration-operator">=</span>{" "}
                  <span className="variable-value-string">{`"${helpfulPerson.name}";`}</span>
                </div>
                {/* finish to check  */}

                <div>
                  <span className="variable-declaration">const </span>
                  <span className="variable-name">voteCount</span>{" "}
                  <span className="variable-declaration-operator">=</span>{" "}
                  <span className="variable-value-string">
                    {helpfulPerson.theVotesReceivedForTheHelpfulPerson
                      ? `${helpfulPerson.theVotesReceivedForTheHelpfulPerson.length};`
                      : ""}
                  </span>
                </div>
                <img
                  style={{ maxWidth: "250px", margin: "5px" }}
                  src={`${helpfulPerson.profileImage}`}
                  alt=""
                />
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </Col>
        <Col>
          <div className="best-projects">
            {bestProjects[0] && bestProjects[1] ? (
              <>
                <div>
                  <span className="variable-declaration">const </span>
                  <span className="variable-name">firstWinnerProject</span>{" "}
                  <span className="variable-declaration-operator">=</span>{" "}
                  <span className="variable-value-string">{`"1st Project";`}</span>
                </div>

                <div>
                  <span className="variable-declaration">const </span>
                  <span className="variable-name">projectName</span>{" "}
                  <span className="variable-declaration-operator">=</span>{" "}
                  <span className="variable-value-string">{`"${bestProjects[0].title}";`}</span>
                </div>

                <div>
                  <span className="variable-declaration">const </span>
                  <span className="variable-name">voteCount</span>{" "}
                  <span className="variable-declaration-operator">=</span>{" "}
                  <span className="variable-value-string">
                    {bestProjects[0].receivedVotes
                      ? `${bestProjects[0].receivedVotes.length};`
                      : ""}
                  </span>
                </div>

                {/* start to check first project pictures */}
                <img
                  src={bestProjects[0].projectImages[0]}
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

                {/* finish to check first project pictures */}
                {bestProjects[0].owners ? (
                  <>
                    <div>
                      <span></span>
                    </div>
                    <div>
                      <span className="variable-declaration">const </span>
                      <span className="variable-name">teamMembers</span>{" "}
                      <span className="variable-declaration-operator">=</span>{" "}
                      <span className="variable-value-string">{`["${bestProjects[0].owners
                        .map((owner) => owner.name)
                        .join('", "')}" ];`}</span>
                    </div>

                    <div>
                      {bestProjects[0].owners.map((owner) => (
                        <div key={owner.id}>
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
                    </div>
                  </>
                ) : (
                  <p>No owners found.</p>
                )}
                <hr />
                <div>
                  <span className="variable-declaration">const </span>
                  <span className="variable-name">
                    secondWinnerProject
                  </span>{" "}
                  <span className="variable-declaration-operator">=</span>{" "}
                  <span className="variable-value-string">{`"2nd Project";`}</span>
                </div>

                <div>
                  <span className="variable-declaration">const </span>
                  <span className="variable-name">projectName</span>{" "}
                  <span className="variable-declaration-operator">=</span>{" "}
                  <span className="variable-value-string">{`"${bestProjects[1].title}";`}</span>
                </div>
                <div>
                  <span className="variable-declaration">const </span>
                  <span className="variable-name">voteCount</span>{" "}
                  <span className="variable-declaration-operator">=</span>{" "}
                  <span className="variable-value-string">
                    {bestProjects[1].receivedVotes
                      ? `${bestProjects[1].receivedVotes.length};`
                      : ""}
                  </span>
                </div>
                <img
                  src={bestProjects[1].projectImages[0]}
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
                {bestProjects[1].owners ? (
                  <>
                    <div>
                      <span className="variable-declaration">const </span>
                      <span className="variable-name">teamMembers</span>{" "}
                      <span className="variable-declaration-operator">=</span>{" "}
                      <span className="variable-value-string">{`["${bestProjects[1].owners
                        .map((owner) => owner.name)
                        .join('", "')}" ];`}</span>
                    </div>
                    <div>
                      {bestProjects[1].owners.map((owner) => (
                        <div key={owner.id}>
                          <div>
                            <div>
                              <span className="variable-declaration">
                                const{" "}
                              </span>
                              <span className="variable-name">name</span>{" "}
                              <span className="variable-declaration-operator">
                                =
                              </span>{" "}
                              <span className="variable-value-string">{`"${owner.name}";`}</span>
                            </div>
                            <img
                              style={{ maxWidth: "75px", margin: "5px" }}
                              src={owner.profileImage}
                              alt={owner.name}
                            />
                            <span>{owner.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p>No owners found.</p>
                )}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default VoteFinishPage;
