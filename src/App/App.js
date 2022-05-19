import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPasswordScreen from "../components/auth/forgotPassword/ForgotPasswordScreen";
import ResetPassword from "../components/auth/resetPassword/ResetPassword";
import HomeQuizMaster from "../components/home/HomeQuizMaster";
import Home from "../components/home/HomePrincipale";
import Candidate from "../components/quizmaster/Candidate";
import Category from "../components/quizmaster/Category";
import Dashboard from "../components/quizmaster/Dashboard";
import QuestionsBank from "../components/quizmaster/QuestionsBank";
import QuizHistory from "../components/quizmaster/QuizHistory";
import UpdateProfile from "../components/quizmaster/UpdateProfile";
import CompanySettings from "../components/stepper/CompanySettings";
import LinaerStepper from "../components/stepper/LinearStepper";

function App() {
  const [subdomain, setSubDomain] = React.useState(null);
  React.useEffect(() => {
    const host = window.location.host; // gets the full domain of the app
    // console.log(host);
    // console.log(window.history);
    const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2);
    if (arr.length > 0) setSubDomain(arr[0]);
    // console.log(subdomain);
  }, []);

  return (
    <>
      <BrowserRouter>
        {subdomain ? (
          <Routes>
            <Route element={<HomeQuizMaster />} path="/home" exact />
          </Routes>
        ) : (
          <Routes>
            <Route element={<Dashboard />} path="/dashboard/quizMaster/*" exact>
              <Route path="updateProfile" element={<UpdateProfile />} />
              <Route path="quizHistory" element={<QuizHistory />} />
              <Route path="questionsBank" element={<QuestionsBank />} />
              <Route path="category" element={<Category />} />
              <Route path="candidate" element={<Candidate />} />
            </Route>
            <Route path="/" element={<Home />} exact />
            <Route element={<LinaerStepper />} path="/quizmaster/:id" exact />

            <Route
              element={<ForgotPasswordScreen />}
              path="/lostPassword/:type"
              exact
            />
            <Route
              element={<ResetPassword />}
              path="/setNewPassword/:id/:resetToken/:type"
              exact
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
