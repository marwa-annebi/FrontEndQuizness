import { Grid, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import Notification from "../Notification";

export default function Subscription(props) {
  const quizmasterInfo = JSON.parse(sessionStorage.getItem("quizmasterInfo"));
  const [prices, setprices] = useState([]);
  const [loading, setloading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const darkColor = props.account.darkColor;
  const lightColor = props.account.lightColor;
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
          subDomain: quizmasterInfo.user.account.domain_name,
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid
          container
          textAlign="center"
          justifyContent="space-between"
          style={{ paddingLeft: "35px", marginTop: "120px" }}
        >
          <Notification
            notify={notify}
            setNotify={setNotify}
            vertical="top"
            horizontal="right"
          />
          {prices.data?.map((key, index) => {
            return (
              <Grid item xs={4} style={{ display: "block" }}>
                <Paper
                  style={{
                    width: "400px",
                    borderRadius: "39px",
                    border: `4px solid ${lightColor}`,
                    height: "350px",
                    boxShadow: "0px 6px 6px #00000029",
                    backgroundColor: darkColor,
                  }}
                >
                  <h1
                    style={{
                      fontFamily: "var(--font-family-cerapro-bold)",
                      //   color: "#1D1D1D",
                      color: lightColor,
                    }}
                  >
                    {key.nickname}
                  </h1>
                </Paper>
                <Paper
                  style={{
                    width: "380px",
                    borderRadius: "39px",
                    border: `4px solid ${lightColor}`,
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
                    }}
                  >
                    Features Include
                  </p>
                  <div></div>
                  <div
                    style={{
                      display: "flex",
                      direction: "row",
                      marginTop: "180px",
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
                      background: darkColor,
                      opacity: "0.7",
                      borderRadius: "39px",
                      border: `2px solid ${lightColor}`,
                      width: "350px",
                      height: "50px",
                      boxShadow: "0px 3px 6px #00000029",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-family-cerapro-bold)",
                        color: lightColor,
                        fontSize: "22px",
                        opacity: 1,
                        cursor: "pointer",
                        lineHeight: "5px",
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
      )}
    </>
  );
}
