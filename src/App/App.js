import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import LinaerStepper from "../components/stepper/LinearStepper";
import { CompanySettings } from "./../actions/quizmasterAction";
import axios from "axios";

function App() {
  // const [companySettings, setcompanySettings] = useState({});
  const getCompanySettings = async () => {
    // const config = {
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // };
    // const host = window.location.host;
    // console.log(host);
    // const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2);
    // let hostname = arr.toString();
    // console.log(hostname);
    // console.log("hello");
    // try {
    //   const { data } = await axios.get(
    //     process.env.REACT_APP_BACKEND +
    //       `/auth/getCompanySettings?domain_name=${hostname}`,
    //     config
    //   );
    //   console.log(data);
    //   // const { name, value } = data;
    //   setcompanySettings((companySettings) => {
    //     return {
    //       ...companySettings,
    //       data,
    //     };
    //   });
    //   console.log("*companySettings", companySettings);
    //   // console.log("#result", re);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const [companyColors, setcompanyColors] = React.useState("");
  const [subdomain, setSubDomain] = React.useState(null);
  const dispatch = useDispatch();
  const companySettings = useSelector((state) => state.companySettings);
  const { companyInfo } = companySettings;
  // console.log("#companyInfo", companyInfo);
  const company = companyInfo?.data;

  useEffect(() => {
    const host = window.location.host; // gets the full domain of the app
    // console.log(host);
    // console.log(window.history);
    const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2);
    if (arr.length > 0) setSubDomain(arr[0]);
    dispatch(CompanySettings());
    // console.log("......bla bla...", company);
    if (company) {
      console.log("#color", company.account.colors[0]);
      // alert(company.firstName);
      setcompanyColors(company.account);
    }
  }, [dispatch, company]);

  return (
    <div>
      <BrowserRouter>
        {subdomain ? (
          <Routes>
            <Route
              element={<HomeQuizMaster company_colors={companyColors} />}
              path="/"
              exact
            />
            <Route element={<Dashboard />} path="/dashboard/quizMaster/*" exact>
              <Route path="updateProfile" element={<UpdateProfile />} />
              <Route path="quizHistory" element={<QuizHistory />} />
              <Route path="questionsBank" element={<QuestionsBank />} />
              <Route path="category" element={<Category />} />
              <Route path="candidate" element={<Candidate />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
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
    </div>
  );
}

export default App;
