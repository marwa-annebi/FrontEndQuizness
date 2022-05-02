import react from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import VerifyAccount from "../components/auth/VerifyAccount";
import Home from "../components/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/"    element={<Home />} exact />
        <Route element={<VerifyAccount />} path="/sendVerification/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
