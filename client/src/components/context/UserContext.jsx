import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

    return (
      storedUserInfo || {
        email: "",
        name: "",
        profileImage: "",
        project: [],
        active: false,
      }
    );
  });

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  const updateUser = (newUserInfo) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      ...newUserInfo,
    }));
  };

  const logout = () => {
    setUserInfo({
      email: "",
      name: "",
      profileImage: "",
      project: [],
      active: false,
    });
    userInfo.active = false;
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
  };

  const setToken = (token) => {
    localStorage.setItem("token", token);
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        updateUser,
        logout,
        setToken,
        getToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
