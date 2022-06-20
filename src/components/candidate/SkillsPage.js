import { makeStyles } from "@material-ui/core";
import { Box, Grid, Paper } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";
import Popup from "reactjs-popup";
import ContentMenuItem from "../ContentMenuItem";
// import httpHeaders from "Headers";
export default function SkillsPage(props) {
  const darkColor = props.account.darkColor;
  const lightColor = props.account.lightColor;
  const customStyles = {
    content: {
      top: "auto",
      left: "auto",
      // right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-34%, -50%)",
      backgroundColor: darkColor,
      width: "130px",
      fontFamily: "var(--font-family-cerapro-bold)",
      justifyContent: "center",
      textAlign: "center",
      boxShadow: " 0px 3px 6px  #00000029",
      color: lightColor,
      border: `1px solid ${lightColor}`,
      borderRadius: "20px",
      fontSize: "15px",
      height: "200px",
      width: "250px",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      // webkitBackdropFilter: "blur(13px) brightness(115%)",
      // backdropFilter: " blur(13px) brightness(115%)",
      backgroundColor: "transparent",
    },
  };
  const styles = makeStyles((theme) => ({
    paper: {
      border: `4px solid ${lightColor}`,
      width: "170px",
      height: "170px",
      textAlign: "center",
      justifyContent: "center",
      fontFamily: "var(--font-family-cerapro-bold)",
      fontWeight: 700,
      fontSize: "26px",
      color: "#000000",
      boxShadow: "0px 3px 6px #00000029",
    },
    div: {
      backgroundColor: darkColor,
      color: lightColor,
      border: `1px solid ${lightColor}`,
      borderRadius: "20px",
      fontSize: "15px",
      height: "30px",
      width: "130px",
      marginTop: "-5px",
      textAlign: "center",
      marginLeft: "11.5%",
      paddingTop: "8px",
      marginTop: "-10px",
      cursor: "pointer",
      boxShadow: "0px 3px 4px #000000",
    },
    div1: {
      backgroundColor: darkColor,
      color: lightColor,
      border: `1px solid ${lightColor}`,
      borderRadius: "20px",
      fontSize: "15px",
      height: "30px",
      width: "130px",
      marginBottom: "3px",
      textAlign: "center",
      marginLeft: "11.5%",
      paddingTop: "8px",
      cursor: "pointer",
      marginTop: "7px",
      boxShadow: "0px 3px 4px #000000",
    },
  }));
  const [categories, setcategories] = useState([]);
  const candidate = JSON.parse(sessionStorage.getItem("candidateInfo"));
  const firstName = candidate.user.firstName;
  const lastName = candidate.user.lastName;

  const loadCategories = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${candidate.token}`,
      },
    };
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND +
        `/candidate/getSkills?quizmaster=${props._id}`,
      config
    );
    setcategories(data.reverse());
  };
  // console.log(categories);
  React.useEffect(
    () => {
      loadCategories();
    },
    [],
    []
  );
  const classes = styles();

  const paywithKonnect = async (data) => {
    // const header = new Headers();
    // header.append();
    // var myHeaders = new Headers();
    // myHeaders.append(
    //   "x-api-key",
    //   "629b3f54ca1ff70e36b26ec0:xSxHuyqJL415qJoM9rUi4D8S05E"
    // );
    // console.log(myHeaders);
    // const header = myHeaders.get("x-api-key");
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "629b3f54ca1ff70e36b26ec0:9Tr9hCClC147I4xEPwA1",
      },
    };
    axios
      .post(
        "https://api.preprod.konnect.network/api/v2/payments/init-payment/",
        data,
        config
      )
      .then((response) => {
        console.log(response.data);
        window.open(response.data.payUrl);
        // if()
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(response);
    // .then((response) => {
    //   console.log(response);
    //   window.open(response.payUrl);
    // });
  };
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const candidateInfo = JSON.parse(sessionStorage.getItem("candidateInfo"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${candidateInfo.token}`,
    },
  };
  const handleCheckout = (key) => {
    axios
      .post(
        process.env.REACT_APP_BACKEND + "/candidate/paymentCandidate",
        {
          key,
          userId: candidateInfo.user._id,
        },
        config
      )
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status >= 400 &&
          err.response.status <= 500
        ) {
          // setloading(false);
          setNotify({
            isOpen: true,
            message: err.response.data.message,
            type: "error",
          });
        }
      });
  };
  const [show, setshow] = useState(false);
  const showModal = (e) => {
    setshow(true);
  };
  return (
    <div style={{ height: "100vh" }}>
      <ContentMenuItem
        style={{ borderColor: darkColor, boxShadow: " 0px 3px 6px #00000029" }}
      >
        <Box
          style={{ maxHeight: "100%", overflow: "auto" }}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              // width: 200,
              // height: 150,
              borderRadius: "35px",
            },
          }}
        >
          {/* <h1>hellooooooo</h1> */}
          <Grid container spacing={2}>
            {categories?.map((key, id) => {
              return (
                <Grid xs={3} style={{ marginRight: "5px" }}>
                  <Paper
                    // key={key}
                    className={classes.paper}
                    style={{ borderRadius: 20 }}
                  >
                    <h3 style={{ marginTop: "9px" }}> {key.skill_name} </h3>
                    <p
                      style={{
                        marginTop: "-25px",
                        fontSize: "15px",
                        opacity: "0.5",
                      }}
                    >
                      {" "}
                      {key.budget} DT
                    </p>

                    <div
                      className={classes.div}
                      onClick={() => handleCheckout(key)}
                    >
                      Buy Voucher
                    </div>
                    <Popup
                      trigger={
                        <div className={classes.div1}> Description </div>
                      }
                      position="bottom "
                    >
                      <div
                        style={{
                          backgroundColor: darkColor,
                          width: "250px",
                          height: "110px",
                          borderRadius: "33px",
                          textAlign: "center",
                          padding: "10px",
                          justifyItems: "center",
                          fontFamily: "var(--font-family-cerapro-medium)",
                          fontSize: "12px",
                        }}
                      >
                        {" "}
                        {key.requirements}
                      </div>
                      {/* <button>Click here</button> */}
                    </Popup>
                    {/* <div
                      className={classes.div1}
                      onClick={(e) => {
                        showModal(e);
                      }}
                    >
                      Description
                    </div>
                    <Modal
                      isOpen={show}
                      onRequestClose={() => {
                        setshow(false);
                      }}
                      style={customStyles}
                    >
                      {key.requirements}
                    </Modal> */}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </ContentMenuItem>
    </div>
  );
}
