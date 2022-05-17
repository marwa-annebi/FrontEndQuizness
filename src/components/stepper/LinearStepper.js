import React, { useState } from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Lottie from "react-lottie";
import { IconContext } from "react-icons";
import * as animationData from "./../../assets/lotties/11272-party-popper.json";
import { makeStyles } from "@material-ui/core/styles";
import "./../../css/stepper.css";
import CompanySettings from "./CompanySettings";
import VerifyAccount from "./VerifyAccount";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import logo from "./../../assets/logo.svg";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Button } from "@mui/material";
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

function getStepContent(step) {
  switch (step) {
    case 0:
      return <VerifyAccount />;
    case 1:
      return <CompanySettings />;

    default:
      return "unknown step";
  }
}

const LinaerStepper = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,

    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };
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
          {/* <div className="groupe-32">
            <div className="groupe-19"> */}
          {/* <div className="lg"> */}
          <img className="rectangle" src={logo} />
          {/* </div> */}
          {/* </div>
          </div> */}

          {/* <div className="flex-col"> */}
          <IconContext.Provider
            value={{
              color: "#570b03",
              // display:"flex"
              // marginLeft: "500px",
              // alignItems: "flex-end",
              ".&:hover": {
                color: "gold",
              },
            }}
          >
            {/* <div style={{marginLeft:"500px"}}> */}
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <IoIosArrowDropleftCircle
                className="x3"
                // onMouseEnter={({target})=>target.style.color="gold"}
              />
            </Button>
            {/* </div> */}
            {/* <div className="back-svgrepo-com"></div> */}
          </IconContext.Provider>
          {/* </div> */}
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
                    <StepLabel
                    // style={{ fontFamily: "cerapro-bold ",fontSize:"" }}
                    >
                      {step}
                    </StepLabel>
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
                  // color="primary"
                  type="submit"
                  // onClick={handleNext}
                >
                  Continue To Login
                </button>
              </div>
            ) : (
              <>
                <form>{getStepContent(activeStep)}</form>
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
                  {activeStep === steps.length - 1 ? "Finish" : "Verify"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinaerStepper;
