import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPasswordScreen from "../components/auth/forgotPassword/ForgotPasswordScreen";
import ResetPassword from "../components/auth/resetPassword/ResetPassword";
import VerifyAccount from "../components/auth/VerifyAccount";
import Home from "../components/home/Home";
import Candidate from "../components/quizmaster/Candidate";
import Category from "../components/quizmaster/Category";
import Dashboard from "../components/quizmaster/Dashboard";
import QuestionsBank from "../components/quizmaster/QuestionsBank";
import QuizHistory from "../components/quizmaster/QuizHistory";
import UpdateProfile from "../components/quizmaster/UpdateProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />} path="/dashboard/quizMaster/*" exact >
          <Route path="updateProfile" element={<UpdateProfile/>} />
          <Route path="quizHistory" element={<QuizHistory/>} />
          <Route path="questionsBank" element={<QuestionsBank/>} />
          <Route path="category" element={<Category/>} />
          <Route path="candidate" element={<Candidate/>} />

        </Route>
        <Route path="/" element={<Home />} exact />
        <Route element={<VerifyAccount />} path="/sendVerification/:id" exact />
        <Route
          element={<ForgotPasswordScreen />}
          path="lostPassword/:type"
          exact
        />
        <Route
          element={<ResetPassword />}
          path="/setNewPassword/:id/:resetToken/:type"
          exact
        />
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
