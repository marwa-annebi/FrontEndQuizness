import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPasswordScreen from "../components/auth/forgotPassword/ForgotPasswordScreen";
import ResetPassword from "../components/auth/resetPassword/ResetPassword";
import VerifyAccount from "../components/auth/VerifyAccount";
import Home from "../components/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route element={<VerifyAccount />} path="/sendVerification/:id" exact/>
        <Route element={<ForgotPasswordScreen />} path="lostPassword/:type" exact />
        <Route element={<ResetPassword/>} path="/setNewPassword/:id/:resetToken/:type" exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
