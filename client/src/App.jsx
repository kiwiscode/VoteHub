import { UserProvider } from "./components/context/UserContext";
import NavBar from "./components/NavBar";
import CreateProjectPage from "./pages/CreateProjectPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import { Routes, Route } from "react-router-dom";
import FunniestPersonPage from "./pages/vote-pages/FunniestPersonPage";
import MostHelpfulPersonPage from "./pages/vote-pages/MostHelpfulPersonPage";
import BestProjectPage from "./pages/vote-pages/BestProjectPage";

function App() {
  return (
    <>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          {/* start to check those 2 route should protect by admin */}
          <Route path="/votehub/signup" element={<SignUpPage />}></Route>
          <Route
            path="/votehub/create-project"
            element={<CreateProjectPage />}
          ></Route>
          {/* finish to check those 2 route should protect by admin */}

          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/vote-for-funniest-person"
            element={<FunniestPersonPage />}
          ></Route>
          <Route
            path="/vote-for-helpful-person"
            element={<MostHelpfulPersonPage />}
          ></Route>
          <Route
            path="/vote-for-best-project"
            element={<BestProjectPage />}
          ></Route>
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
