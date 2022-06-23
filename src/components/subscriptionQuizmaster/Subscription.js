import { Grid, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import Notification from "../Notification";
import logo from "./../../assets/logo.png";
export default function Subscription(props) {
  const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
  const [prices, setprices] = useState([]);
  const [loading, setloading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    fetchPrices();
  }, [prices]);
  const fetchPrices = async () => {
    // e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        //   Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND + "/subs/getPrices",
      config
    );
    // console.log(data);
    setprices(data);
  };
  const createSession = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    try {
      setloading(true);
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND + "/subs/session",
        {
          priceId: id,
          user: quizmasterInfo.user._id,
          // subDomain: quizmasterInfo.user.account.domain_name,
        },
        config
      );
      setloading(false);
      console.log(data);
      //   if (data) {
      window.location.href = data.url;
      //   }
    } catch (error) {
      console.log(error.message);
      setloading(false);
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
      }
    }
  };
  const features = [
    {
      Premium: (
        <div
          style={{
            fontFamily: "var(--font-family-cerapro-medium)",
            color: "#1D1D1D",
            fontSize: "13px",
          }}
        >
          <p>5000 users</p>
          <p>10 000 quiz</p>
          <p>100 000 questions</p>
          <p>2 Types of Quiz (Randomize,By selection)</p>
          <p>More Types of Question</p>
          <p>Customize scoring Method</p>
        </div>
      ),
    },
    {
      Standard: (
        <div
          style={{
            fontFamily: "var(--font-family-cerapro-medium)",
            color: "#1D1D1D",
            fontSize: "13px",
          }}
        >
          <p>3000 users</p>
          <p>6000 quiz</p>
          <p>60 000 questions</p>
          <p>2 Types of Quiz (Randomize,By selection)</p>
          <p>More Types of Question</p>
          <p>1 scoring method </p>
        </div>
      ),
    },
    {
      Basic: (
        <div
          style={{
            fontFamily: "var(--font-family-cerapro-medium)",
            color: "#1D1D1D",
            fontSize: "13px",
          }}
        >
          <p>1000 users</p>
          <p>3000 quiz</p>
          <p>50 000 questions</p>
          <p>2 Types of Quiz (Randomize,By selection)</p>
          <p>2 Types of Question(Multiple Choice,True Or False)</p>
          <p>1 scoring method </p>
        </div>
      ),
    },
  ];
  const backgrounds = {
    Premium: "var(--gold)",
    Standard: "var(--mahogany)",
    Basic: "#1D1D1D",
  };
  const color = {
    Premium: "var(--mahogany)",
    Standard: "var(--gold)",
    Basic: "white",
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid container textAlign="center" justifyContent="center" spacing={2}>
          <Notification
            notify={notify}
            setNotify={setNotify}
            vertical="top"
            horizontal="right"
          />
          <Grid
            item
            xs={12}
            style={{ marginTop: "50px", marginLeft: "-1100px" }}
          >
            <img src={logo} width="250px" height="60px" />
          </Grid>
          <Grid item xs={12}>
            <h1
              style={{
                fontFamily: "var(--font-family-cerapro-bold)",
                textAlign: "center",
                marginTop: "-10px",
                fontSize: "36px",
                color: "var(--mahogany)",
              }}
            >
              Pricing
              <hr style={{ width: "200px" }}></hr>
            </h1>
          </Grid>
          <Grid xs={12} item style={{ display: "flex", marginLeft: "70px" }}>
            {prices.data?.map((key, index) => {
              return (
                <Grid item xs={4} style={{ display: "block" }}>
                  <Paper
                    style={{
                      width: "400px",
                      borderRadius: "39px",
                      border: `4px solid ${color[key.nickname]}`,
                      height: "350px",
                      boxShadow: "0px 6px 6px #00000029",
                      backgroundColor: backgrounds[key.nickname],
                    }}
                  >
                    <h1
                      style={{
                        fontFamily: "var(--font-family-cerapro-bold)",
                        //   color: "#1D1D1D",
                        color: color[key.nickname],
                      }}
                    >
                      {key.nickname}
                    </h1>
                  </Paper>
                  <Paper
                    style={{
                      width: "380px",
                      borderRadius: "39px",
                      border: `4px solid ${color[key.nickname]}`,

                      height: "350px",
                      boxShadow: "0px 6px 6px #00000029",
                      marginTop: "-280px",
                      paddingLeft: "20px",
                      textAlign: "start",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-family-cerapro-bold)",
                        color: "var(--mahogany)",
                      }}
                    >
                      Features Include
                    </p>
                    <div style={{ marginLeft: "10px" }}>
                      {features.map((feature) => {
                        return feature[key.nickname];
                      })}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        direction: "row",
                        // marginTop: "180px",
                        textAlign: "center",
                      }}
                    >
                      <h2
                        style={{
                          fontFamily: "var(--font-family-cerapro-bold)",
                        }}
                      >
                        $ {key.unit_amount / 100}
                      </h2>
                      <p
                        style={{
                          fontFamily: "var(--font-family-cerapro-bold)",
                          color: "#AFAFAF",
                          marginTop: "28px",
                          //   position: "absolute",
                        }}
                      >
                        /month
                      </p>{" "}
                    </div>
                    <button
                      style={{
                        //   marginTop: "20px",
                        background: backgrounds[key.nickname],
                        // opacity: "0.7",
                        borderRadius: "39px",
                        border: `2px solid ${color[key.nickname]}`,
                        width: "350px",
                        height: "50px",
                        marginTop: "30px",
                        boxShadow: "0px 3px 6px #00000029",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-family-cerapro-bold)",
                          color: color[key.nickname],

                          fontSize: "22px",
                          opacity: 1,
                          cursor: "pointer",
                          marginTop: "5px",
                        }}
                        onClick={() => createSession(key.id)}
                      >
                        Buy Now
                      </p>
                    </button>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
    </>
  );
}
