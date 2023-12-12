import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import IronHackLogo from "../assets/logo-ironhack-blue.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Stack } from "react-bootstrap";

// when working on local version
const API_URL = "http://localhost:3000";

// when working on deployment version
// ?

function NavBar() {
  const navigate = useNavigate();
  const { userInfo, logout, getToken } = useContext(UserContext);

  const handleLogout = () => {
    axios
      .post(
        `${API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        logout();
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <nav>
        <Link
          to="/"
          className="nav-bar"
          style={{
            textDecoration: "none",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.8)",
              color: " #80461b",

              width: "100%",
              padding: "5px",
            }}
          >
            <Stack direction="horizontal" gap={3}>
              <div className="p-2">
                <img
                  src={IronHackLogo}
                  alt=""
                  width={75}
                  height={75}
                  className="home-icon"
                />
              </div>
              <div className="p-2 ms-auto">
                {" "}
                {userInfo.name && userInfo.active ? (
                  <div>
                    <span
                      style={{
                        color: "white",
                        textDecoration: "none",
                        margin: "15px",
                      }}
                    >
                      Welcome {userInfo.name}
                    </span>
                    <Button
                      onClick={handleLogout}
                      style={{
                        backgroundColor: "#32c3ff",
                        borderStyle: "none",
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                ) : null}
              </div>
            </Stack>
          </div>
        </Link>
      </nav>
    </>
  );
}

export default NavBar;
