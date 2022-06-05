import { makeStyles } from "@material-ui/core";
import { Box, Grid, Paper } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
// import axios from "axios";
import ContentMenuItem from "../ContentMenuItem";
// import httpHeaders from "Headers";
export default function SkillsPage(props) {
  const darkColor = props.account.darkColor;
  const lightColor = props.account.lightColor;
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
      fontSize: "18px",
      height: "30px",
      width: "130px",
      marginTop: "-5px",
      textAlign: "center",
      marginLeft: "11.5%",
      paddingTop: "2px",
      marginTop: "-10px",
      cursor: "pointer",
      boxShadow: "0px 3px 4px #000000",
    },
    div1: {
      backgroundColor: darkColor,
      color: lightColor,
      border: `1px solid ${lightColor}`,
      borderRadius: "20px",
      fontSize: "18px",
      height: "30px",
      width: "130px",
      marginBottom: "5px",
      textAlign: "center",
      marginLeft: "11.5%",
      paddingTop: "2px",
      cursor: "pointer",
      marginTop: "10px",
      boxShadow: "0px 3px 4px #000000",
    },
  }));
  console.log(props);
  const [categories, setcategories] = useState([]);
  console.log(props._id);
  const candidate = JSON.parse(localStorage.getItem("candidateInfo"));
  const firstName = candidate.user.firstName;
  const lastName = candidate.user.lastName;

  const loadCategories = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${candidate.token}`,
      },
    };
    console.log("helolo");
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND +
        `/candidate/getSkills?quizmaster=${props._id}`,
      config
    );
    console.log(data);
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
  // const click = (budget) => {
  //   console.log(budget);

  //   // debugger;
  // };
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
                      {key.budget}{" "}
                    </p>

                    <div
                      className={classes.div}
                      onClick={() => {
                        paywithKonnect({
                          receiverWallet: "629b3f54ca1ff70e36b26ec1",
                          amount: key.budget,
                          firstName: firstName,
                          lastName: lastName,
                          phoneNumber: "28467147",
                          email: "marwaannebi25@gmail.com",
                        });
                      }}
                    >
                      Buy Voucher
                    </div>
                    <div className={classes.div1}>Description</div>
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
