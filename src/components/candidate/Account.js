import React, { useRef, useState } from "react";
import ContentMenuItem from "../ContentMenuItem";
import { backdropClasses, Box, Grid, Paper } from "@mui/material";
import { makeStyles, TextField } from "@material-ui/core";
import { FitScreen } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Edit } from "./../../assets/edit-pencil-svgrepo-com.svg";
import axios from "axios";
import { message } from "antd";
import Notification from "../Notification";
export default function Account(props) {
  console.log("#", props);
  const darkColor = props.account.darkColor;
  const lightColor = props.account.lightColor;
  const [email, setemail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [picture, setpicture] = useState();
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [nationality, setnationality] = useState("");
  const [Address, setAddress] = useState("");
  const [state, setstate] = useState("");
  const [loading, setloading] = useState(false);
  const styles = makeStyles((theme) => ({
    paper1: {
      height: "200px",
      width: "200px",
      border: `4px solid ${lightColor}`,
    },
    paper2: {
      height: "485px",
      width: "600px",
      border: `4px solid ${darkColor}`,
      marginLeft: "-60px",
    },
    paper3: {
      height: "200px",
      width: "200px",
      border: `4px solid ${darkColor}`,
      backgroundColor: darkColor,
      marginTop: "10px",
    },
    paper4: {
      height: "200px",
      width: "170px",
      border: `4px solid ${lightColor}`,
      marginTop: "-170px",
    },
    textField: {
      width: "150px",
    },
    paper5: {
      marginTop: "-450px",
      height: "417px",
      width: "540px",
      border: `4px solid ${lightColor}`,
      marginLeft: "-60px",
      padding: "30px 30px 30px 30px",
    },
    sousGrid: {
      flexDirection: "row",
      display: "flex",
      width: "450px",
      textAlign: "start",
      padding: "15px 15px",
    },
    textField2: {
      width: "250px",
      marginLeft: "30px",
      textAlign: "start",
      // borderColor: "white",
      [`& fieldset`]: {
        borderBottom: 0,
        // borderC,
      },
    },
  }));
  const userInfo = JSON.parse(localStorage.getItem("candidateInfo"));
  const navigate = useNavigate();
  console.log(userInfo.user);
  React.useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setfirstName(userInfo.user.firstName);
      setemail(userInfo.user.email);
      setlastName(userInfo.user.lastName);
      setAddress(userInfo.user.Address);
      setnationality(userInfo.user.nationality);
      setstate(userInfo.user.state);
      setpicture(userInfo.user.picture);
    }
  }, [navigate, userInfo]);
  const fileRef = useRef();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const postDetails = (pics) => {
    // setPicMessage(null);
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
          setpicture(data.url.toString());
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setNotify({
        isOpen: true,
        message: "Please Select an Image",
        type: "error",
      });
    }
  };
  console.log("picture", picture);
  const classes = styles();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      if (password !== confirmPassword) {
        setNotify({
          isOpen: true,
          message: "Passwords do not match",
          type: "error",
        });
      } else {
        const { data } = await axios.put(
          process.env.REACT_APP_BACKEND + "/candidate/updateProfile",
          {
            firstName,
            lastName,
            email,
            password,
            picture,
            nationality,
            state,
            Address,
          },
          config
        );
        if (data) {
          setNotify({
            isOpen: true,
            message: data.message,
            type: "success",
          });
        }
      }
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
  };
  return (
    <div style={{ height: "100vh" }}>
      <ContentMenuItem style={{ borderColor: darkColor }}>
        <Notification
          notify={notify}
          setNotify={setNotify}
          vertical="top"
          horizontal="right"
        />
        <form
          onSubmit={handleSubmit}
          style={{ maxHeight: "100%", overflow: "auto" }}
        >
          <Box
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
            <Grid
              container
              sx={{ flexGrow: 1 }}
              // alignItems="center"
              // justify="center"
            >
              <Grid item xs={4}>
                <Paper
                  className={classes.paper1}
                  style={{ borderRadius: "20px" }}
                >
                  <img
                    src={picture}
                    style={{ width: "100%", borderRadius: "20px" }}
                  />
                </Paper>
                <div
                  style={{
                    borderRadius: "20px",
                    border: `1px dashed ${darkColor}`,
                    backgroundColor: lightColor,
                    width: "13.5%",
                    height: "6%",
                    textAlign: "center",
                    justifyContent: "center",
                    paddingTop: "9px",
                    marginTop: "-23px",
                    position: "relative",
                    marginLeft: "80px",
                    cursor: "pointer",
                  }}
                >
                  <Edit
                    onClick={() => {
                      fileRef.current.click();
                    }}
                    fill={darkColor}
                    style={{ textAlign: "center" }}
                  />
                  <input
                    type="file"
                    ref={fileRef}
                    // value={picture}
                    onChange={(e) => postDetails(e.target.files[0])}
                    accept="image/png,image/jpeg"
                    hidden
                  />
                </div>
                <div style={{ display: "block", marginTop: "25px" }}>
                  <Paper
                    style={{
                      borderRadius: "20px",
                      backgroundColor: darkColor,
                      color: "white",
                      fontFamily: "var(--font-family-cerapro-bold)",
                      textAlign: "center",
                      fontSize: "23px",
                    }}
                    className={classes.paper3}
                  >
                    Log In Infos
                  </Paper>
                  <Paper
                    style={{ borderRadius: "20px", padding: "15px 15px" }}
                    className={classes.paper4}
                  >
                    <Grid xs={4}>
                      <div
                        style={{
                          color: "#2D2D2D",
                          fontFamily: "var(--font-family-cerapro-bold)",
                          fontSize: "20px",
                          marginBottom: "-5px",
                        }}
                      >
                        Email:
                      </div>
                      <TextField
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        variant="standard"
                        className={classes.textField}
                      ></TextField>
                    </Grid>
                    <Grid xs={4}>
                      <div
                        style={{
                          color: "#2D2D2D",
                          fontFamily: "var(--font-family-cerapro-bold)",
                          fontSize: "20px",
                          marginBottom: "-5px",
                          marginTop: "10px",
                        }}
                      >
                        Password:
                      </div>
                      <TextField
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        variant="standard"
                        className={classes.textField}
                      ></TextField>
                    </Grid>{" "}
                    <Grid xs={4}>
                      <div
                        style={{
                          marginTop: "10px",

                          color: "#2D2D2D",
                          fontFamily: "var(--font-family-cerapro-bold)",
                          fontSize: "20px",
                          marginBottom: "-5px",
                        }}
                      >
                        ConfirmPassword:
                      </div>
                      <TextField
                        variant="standard"
                        className={classes.textField}
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                      ></TextField>
                    </Grid>
                  </Paper>
                </div>
              </Grid>
              <Grid xs={8}>
                <div style={{ display: "block" }}>
                  <Paper
                    style={{
                      borderRadius: "20px",
                      backgroundColor: darkColor,
                      color: "white",
                      textAlign: "center",
                      fontFamily: "var(--font-family-cerapro-bold)",
                      fontSize: "24px",
                    }}
                    className={classes.paper2}
                  >
                    Profile Information
                  </Paper>
                  <Paper
                    style={{ borderRadius: "20px" }}
                    className={classes.paper5}
                  >
                    <Grid xs={2.4}>
                      <div className={classes.sousGrid}>
                        <div
                          style={{
                            marginTop: "10px",

                            color: darkColor,

                            fontFamily: "var(--font-family-cerapro-bold)",
                            fontSize: "20px",
                            marginBottom: "-5px",
                          }}
                        >
                          Last Name :
                        </div>
                        <TextField
                          variant="standard"
                          className={classes.textField2}
                          value={lastName}
                          onChange={(e) => setlastName(e.target.value)}
                        ></TextField>
                      </div>
                    </Grid>
                    <hr></hr>
                    <Grid xs={2.4}>
                      <div className={classes.sousGrid}>
                        <div
                          style={{
                            marginTop: "10px",

                            color: darkColor,

                            fontFamily: "var(--font-family-cerapro-bold)",
                            fontSize: "20px",
                            marginBottom: "-5px",
                          }}
                        >
                          First Name :
                        </div>
                        <TextField
                          variant="standard"
                          value={firstName}
                          onChange={(e) => setfirstName(e.target.value)}
                          className={classes.textField2}
                        ></TextField>
                      </div>
                    </Grid>{" "}
                    <hr></hr>
                    <Grid xs={2.4}>
                      <div className={classes.sousGrid}>
                        <div
                          style={{
                            marginTop: "10px",

                            color: darkColor,

                            fontFamily: "var(--font-family-cerapro-bold)",
                            fontSize: "20px",
                            marginBottom: "-5px",
                          }}
                        >
                          Nationality :
                        </div>
                        <TextField
                          variant="standard"
                          value={nationality}
                          onChange={(e) => setnationality(e.target.value)}
                          className={classes.textField2}
                        ></TextField>
                      </div>
                    </Grid>{" "}
                    <hr></hr>
                    <Grid xs={2.4}>
                      <div className={classes.sousGrid}>
                        <div
                          style={{
                            marginTop: "10px",

                            color: darkColor,

                            fontFamily: "var(--font-family-cerapro-bold)",
                            fontSize: "20px",
                            marginBottom: "-5px",
                          }}
                        >
                          Address :
                        </div>
                        <TextField
                          variant="standard"
                          value={Address}
                          onChange={(e) => setAddress(e.target.value)}
                          className={classes.textField2}
                        ></TextField>
                      </div>
                    </Grid>{" "}
                    <hr></hr>
                    <Grid xs={2.4}>
                      <div className={classes.sousGrid}>
                        <div
                          style={{
                            marginTop: "10px",

                            color: darkColor,

                            fontFamily: "var(--font-family-cerapro-bold)",
                            fontSize: "20px",
                            marginBottom: "-5px",
                          }}
                        >
                          State :
                        </div>
                        <TextField
                          variant="standard"
                          value={state}
                          onChange={(e) => setstate(e.target.value)}
                          className={classes.textField2}
                        ></TextField>
                      </div>
                    </Grid>
                  </Paper>
                </div>
              </Grid>
            </Grid>
            <button
              className="btnVerif border-1px-dove-gray"
              variant="contained"
              type="submit"
              style={{
                marginLeft: "300px",
                color: darkColor,
                backgroundColor: lightColor,
              }}
            >
              save
            </button>
          </Box>
        </form>
      </ContentMenuItem>
    </div>
  );
}
