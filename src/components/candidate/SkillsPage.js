import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Box, Grid, Paper } from "@mui/material";
import axios from "axios";
import Popup from "reactjs-popup";
import ContentMenuItem from "../ContentMenuItem";
import Loading from "../Loading";
export default function SkillsPage(props) {
  const darkColor = props.account.darkColor;
  const lightColor = props.account.lightColor;
  const styles = makeStyles(() => ({
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
  React.useEffect(
    () => {
      loadCategories();
    },
    [],
    []
  );
  const classes = styles();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const candidate = JSON.parse(sessionStorage.getItem("candidateInfo"));
  const [loading, setloading] = useState(false);
  const subdomain = JSON.parse(sessionStorage.getItem("companyInfo"));
  const handleCheckout = (key) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${candidate.token}`,
      },
    };
    setloading(true);
    axios
      .post(
        process.env.REACT_APP_BACKEND + "/candidate/paymentCandidate",
        {
          key,
          userId: candidate.user._id,
          subdomain: subdomain.account.domain_name,
        },
        config
      )
      .then((res) => {
        setloading(false);
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        setloading(false);
        if (
          err.response &&
          err.response.status >= 400 &&
          err.response.status <= 500
        ) {
          setNotify({
            isOpen: true,
            message: err.response.data.message,
            type: "error",
          });
        }
      });
  };
  return (
    <div style={{ height: "100vh" }}>
      <ContentMenuItem
        style={{ borderColor: darkColor, boxShadow: " 0px 3px 6px #00000029" }}
      >
        {loading ? (
          <Loading />
        ) : (
          <Box
            style={{ maxHeight: "100%", overflow: "auto" }}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                borderRadius: "35px",
              },
            }}
          >
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
                          {key.requirements}
                        </div>
                      </Popup>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </ContentMenuItem>
    </div>
  );
}
