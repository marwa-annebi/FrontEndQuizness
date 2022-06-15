import React, { useEffect, Suspense, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPasswordScreen from "../components/auth/forgotPassword/ForgotPasswordScreen";
import ResetPassword from "../components/auth/resetPassword/ResetPassword";
import HomeQuizMaster from "../components/home/HomeQuizMaster";
import Home from "../components/home/HomePrincipale";
import Candidate from "../components/quizmaster/Candidate";
import Category from "../components/quizmaster/Category";
// import Dashboard from "../components/quizmaster/Dashboard";
import Dashboard from "./../components/quizmaster/dashboard";
import QuestionsBank from "../components/quizmaster/QuestionsBank";
import QuizHistory from "../components/quizmaster/QuizHistory";
import UpdateProfile from "../components/quizmaster/UpdateProfile";
import LinaerStepper from "../components/stepper/LinearStepper";
import { CompanySettings } from "./../actions/quizmasterAction";
import Loading from "./../components/Loading";
import AddQuizBySelection from "./../components/quizmaster/AddQuizBySelection";
import AddQuizRandomly from "./../components/quizmaster/AddQuizRandomly";
import Account from "./../components/candidate/Account";
import DashboardCandidat from "../components/candidate/DashboardCandidat";
import QuizzesCandidate from "../components/candidate/QuizzesCandidate";
import Certificates from "../components/candidate/Certificates";
import SkillsPage from "../components/candidate/SkillsPage";
import PlayQuiz from "../components/candidate/PlayQuiz";
import EditQuizBySelection from "../components/quizmaster/EditQuizBySelection";
import EditQuizRandomly from "../components/quizmaster/EditQuizRandomly";
import { CheckoutSuccess } from "../components/candidate/CheckoutSuccess";
import NotFound from "../components/NotFoundPage";
import { ListVoucher } from "../components/quizmaster/ListVoucher";
import { Statics, Statistics } from "../components/quizmaster/Statistics";
function App() {
  const [companyColors, setcompanyColors] = React.useState("");
  const [subdomain, setSubDomain] = React.useState(null);
  const dispatch = useDispatch();
  const companySettings = useSelector((state) => state.companySettings);
  const { companyInfo } = companySettings;
  const company = companyInfo;
  const [IsLoggedIn, setIsLoggedIn] = useState();
  const [islogin, setislogin] = useState();
  useEffect(
    () => {
      const host = window.location.host; // gets the full domain of the app
      const arr = host
        .split(".")
        .slice(0, host.includes("localhost") ? -1 : -2);
      if (arr.length > 0) setSubDomain(arr[0]);
      dispatch(CompanySettings());
      if (company) {
        setcompanyColors(company);
      }
    },
    [],
    [dispatch, company]
  );
  const getUser = () => {
    // let tokenQuizMaster = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
    let token = JSON.parse(sessionStorage.getItem(sessionStorage.key(1)));
    setIsLoggedIn(token);
    console.log("#isLoggedIn", token);
    // setislogin(tokenQuizMaster);
  };

  useEffect(
    () => {
      getUser();
      // console.log("#isLoggedIn", isLoggedIn);
    },
    [],
    [IsLoggedIn]
  );
  return (
    <BrowserRouter>
      {subdomain ? (
        <Routes>
          <Route
            element={<HomeQuizMaster company_colors={companyColors} />}
            path="/"
            exact
          />
          <Route
            {...companyColors}
            element={<ForgotPasswordScreen {...companyColors} />}
            path="/lostPassword/:type"
            exact
          />
          <Route
            element={<ResetPassword />}
            path="/setNewPassword/:id/:resetToken/:type"
          />
          {IsLoggedIn ? (
            <>
              <Route
                element={<Dashboard {...companyColors} />}
                path="/dashboard/quizMaster/*"
                exact
              >
                <Route
                  path="updateProfile"
                  element={<UpdateProfile {...companyColors} />}
                />
                <Route path="quizHistory" element={<QuizHistory />} />
                <Route path="questionsBank" element={<QuestionsBank />} />
                <Route path="category" element={<Category />} />

                <Route path="candidate" element={<Candidate />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="vouchers" element={<ListVoucher />} />
              </Route>
              <Route
                path="/dashboard/candidate/*"
                element={<DashboardCandidat company_info={companyColors} />}
              >
                <Route path="update" element={<Account {...companyColors} />} />
                <Route
                  path="chooseSkills"
                  element={<SkillsPage {...companyColors} />}
                />
                <Route
                  path="certificates"
                  element={<Certificates {...companyColors} />}
                />
                <Route
                  path="quizzes"
                  element={<QuizzesCandidate {...companyColors} />}
                ></Route>
                {/*  */}
              </Route>

              <Route
                element={<AddQuizBySelection {...companyColors} />}
                path="/QuizBySelection"
              />
              <Route
                element={<AddQuizRandomly {...companyColors} />}
                path="/QuizRandomly"
              />
              <Route
                element={<PlayQuiz company_info={companyColors} />}
                path="/playQuiz"
              ></Route>
              <Route
                element={<EditQuizBySelection />}
                path="/EditQuizBySelection"
              />
              <Route element={<EditQuizRandomly />} path="/EditQuizRandomly" />
              <Route element={<EditQuizRandomly />} path="/EditQuizRandomly" />
              <Route element={<CheckoutSuccess />} path="/success" />
            </>
          ) : (
            <Route path="*" element={<NotFound />} />
          )}
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route element={<LinaerStepper />} path="/quizmaster/:id" exact />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
