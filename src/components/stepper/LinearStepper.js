import React, { useState, useEffect } from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import * as animationData from "./../../assets/lotties/11272-party-popper.json";
import { makeStyles } from "@material-ui/core/styles";
import "./../../css/stepper.css";
import CompanySettings from "./CompanySettings";
import VerifyAccount from "./VerifyAccount";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import quizness from "./../../assets/logo.svg";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios, { Axios } from "axios";
import Notification from "../Notification";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: " var(--font-family-cerapro-bold)",
    fontStyle: "normal",
    fontWeight: 700,

    "& .MuiStepIcon-active": {
      color: "rgba(86, 10, 2, 1)",
      marginRight: 0,
      width: 50,
      height: 50,
      backgroundColor: "rgba(86, 10, 2, 1)",
      border: "5px solid gold",
      borderRadius: "30px",
    },
    "& .MuiStepIcon-completed": { color: "white" },
    "& .Mui-disabled .MuiStepIcon-root": { color: "white" },
  },
}));

function getSteps() {
  return ["", "", ""];
}

const LinaerStepper = () => {
  const params = useParams();
  const [otp, setotp] = useState();
  const [check, setcheck] = useState([]);
  const [logo, setlogo] = useState();
  const classes = useStyles();
  const [domain_name, setdomain_name] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const [subdomain, setSubDomain] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const steps = getSteps();
  const handleNext = () => {
    if (notify.type === "success") {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    } else if (notify.type === "error") {
      setActiveStep(activeStep);
    }
  };
  const handleColors = (e) => {
    const { value, checked } = e.target;

    // console.log(check);
    if (checked) {
      if (check.length <= 1) {
        setcheck((prev) => [...prev, value]);
      }
      console.log(check);
    } else {
      //  console.log(check);
      setcheck((prev) => prev.filter((x) => value !== x));
    }
  };

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "3almni");
      data.append("cloud_name", "dknkfvzye");
      fetch("https://api.cloudinary.com/v1_1/dknkfvzye/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())

        .then((data) => {
          setlogo(data.url.toString());

          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };
  const handleChange = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (activeStep === 0) {
      try {
        // console.log(otp);
        const { data } = await axios.post(
          "/auth/verifyOTP",
          { userId: params.id, otp },
          config
        );
        // console.log(params.id);
        setNotify({
          isOpen: false,
          message: data.message,
          type: "success",
        });
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setNotify({
            isOpen: true,
            message: error.response.data.message,
            type: "error",
          });
          console.log(error.response.data.message);
        }
      }
    }
    if (activeStep === 1) {
      try {
        console.log(params.id);
        const { data } = await axios.put(
          "/auth/updateAccount",
          {
            id: params.id,
            account: { domain_name: domain_name, logo: logo, colors: check },
          },
          config
        );
        setNotify({
          isOpen: false,
          message: data.message,
          type: "success",
        });
        console.log(data);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setNotify({
            isOpen: true,
            message: error.response.data.message,
            type: "error",
          });
          // console.log(error.response.data.message);
        }
      }
    }
  };
  const [picMessage, setPicMessage] = useState();
  // const postDetails = (pics) => {
  //   setPicMessage(null);
  //   if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //     const data = new FormData();
  //     data.append("file", pics);
  //     data.append("upload_preset", "3almni");
  //     data.append("cloud_name", "dknkfvzye");
  //     fetch("https://api.cloudinary.com/v1_1/dknkfvzye/image/upload", {
  //       method: "post",
  //       body: data,
  //     })
  //       .then((res) => res.json())

  //       .then((data) => {
  //         setlogo(data.url.toString());
  //         console.log("hello");
  //         console.log(data.url);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     return setPicMessage("Please Select an Image");
  //   }
  // };

  function getStepContent(step) {
    // console.log(params);
    switch (step) {
      case 0:
        return (
          <VerifyAccount
            handleChange={handleChange}
            // onChange={onChange}
            otp={otp}
            setValue={setotp}
          />
        );
      case 1:
        return (
          <CompanySettings
            pic={logo}
            setPic={setlogo}
            handleSubmit={handleChange}
            // // onChange={onChange}
            postDetails={postDetails}
            check={check}
            setcheck={setcheck}
            domain_name={domain_name}
            setdomain_name={setdomain_name}
          />
        );

      default:
        return "unknown step";
    }
  }
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,

    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepSkipped(activeStep)) {
  //     setSkippedSteps([...skippedSteps, activeStep]);
  //   }
  //   setActiveStep(activeStep + 1);
  // };
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% )",
      right: "calc(50%)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "gold",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "red",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === "bold" ? "white" : "gold",
      borderTopWidth: 15,
      borderRadius: 14,
    },
  }));

  return (
    <div className="container-center-horizontal">
      <div className="stepper screen">
        <div className="flex-row">
          <img className="rectangle" src={quizness} />
          <IconContext.Provider
            value={{
              color: "#570b03",
              ".&:hover": {
                color: "gold",
              },
            }}
          >
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <IoIosArrowDropleftCircle className="x3" />
            </Button>
          </IconContext.Provider>
        </div>
        <div className="border1 cerapro-bold-mahogany-45px border-5px-mahogany">
          <div className="content1">
            <Stepper
              activeStep={activeStep}
              connector={<QontoConnector></QontoConnector>}
              className={classes.root}
            >
              {steps.map((step, index) => {
                const labelProps = {};
                const stepProps = {};
                {
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step {...stepProps} key={index}>
                    <Notification
                      notify={notify}
                      setNotify={setNotify}
                      vertical="top"
                      horizontal="right"
                    />
                    <StepLabel>{step}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {activeStep === steps.length - 1 ? (
              <div
                style={{
                  textAlign: "flex-end",
                  position: "absolute",
                  justifyContent: "flex-end",
                  marginLeft: "10px",
                  marginTop: "-100px",
                }}
              >
                <Lottie options={defaultOptions} height={400} width={400} />
                <button
                  className="btnVerif border-1px-dove-gray"
                  variant="contained"
                  type="submit"
                >
                  <a
                    key={domain_name}
                    href={
                      window.location.protocol +
                      "//" +
                      domain_name +
                      "." +
                      window.location.host +
                      "/myHome"
                    }
                    style={{ color: "var(--mahogany)" }}
                  >
                    {" "}
                    Continue
                  </a>
                </button>
              </div>
            ) : (
              <>
                <form onSubmit={handleChange}>
                  {getStepContent(activeStep)}
                  {/* <Button
                  className={classes.button}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  back
                </Button> */}
                  {/* {isStepOptional(activeStep) && (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleSkip}
            >
              skip
            </Button>
          )} */}

                  <button
                    className="btnVerif border-1px-dove-gray"
                    variant="contained"
                    type="submit"
                    onClick={handleNext}
                  >
                    {activeStep === 1 ? "Continue" : "Verify"}
                  </button>
                </form>
              </>
            )}
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinaerStepper;
