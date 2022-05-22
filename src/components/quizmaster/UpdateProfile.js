import React, { useState, useRef, useEffect } from "react";
import { makeStyles, TextField, Paper, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Box, Checkbox, Grid } from "@mui/material";
import ContentMenuItem from "./../ContentMenuItem";
import { BiExport } from "react-icons/bi";
import { ColorExtractor } from "react-color-extractor";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import "./../../css/companySettings.css";
import axios from "axios";
import Notification from "../Notification";

const styles = makeStyles((theme) => ({
  grid: {
    textAlign: "center",
    marginBottom: "30px",
    marginLeft: "-20px",
  },
  btn: {
    alignSelf: "center",
    letterSpacing: 0,
    lineHeight: "31px",
    /* margin-left: 22px, */
    marginTop: "5px",
    /* min-height: 41px, */
    /* min-width: 254px, */
    whiteSpace: "nowrap",
    color: "var(--mahogany)",
    fontFamily: "var(--font-family-cerapro-bold)",
    fontSize: "18px",
    "&:hover": {
      backgroundColor: "var(--mahogany)",
      // border: "1px dashed var(--gold)",
      color: "white",
    },
  },
  txtName: {
    [`& fieldset`]: {
      borderRadius: 39,
      border: "3px solid var(--gold)",
    },
    backgroundColor: "var(--white)",
    marginTop: "15px",
    width: "300px",
    height: "45px",
  },
  input: {
    "&::placeholder": {
      // fontStyle: "italic",
      color: "#1c1312",
      fontFamily: "var(--font-family-cerapro-medium)",
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: "18px",
      minHeight: "25px",
      opacity: 0.35,
      whiteSpace: "nowrap",
    },
  },
  txtUsserName: {
    [`& fieldset`]: {
      borderRadius: 39,
      border: "3px solid var(--gold)",
    },
    marginTop: "15px",
    width: "300px",
    height: "45px",
  },
  inputUserName: {
    "&::placeholder": {
      color: "var(--mahogany-3)",
      fontFamily: "var(--font-family-cera_pro)",
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: "24px",
      minHeight: "32px",
      whiteSpace: "nowrap",
      textAlign: "center",
    },
  },
  root: {
    color: "#3B3938",
    fontFamily: "var(--font-family-cerapro-medium)",
    letterSpacing: 0,
    fontWeight: 500,
    lineHeight: "16px",
    marginLeft: "210px",
  },
}));
export default function UpdateProfile() {
  const classes = styles();
  // const dispatch = useDispatch();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const companySettings = useSelector((state) => state.companySettings);
  const { companyInfo } = companySettings;
  console.log("#com", companyInfo);
  const navigate = useNavigate();
  const [domain_name, setdomain_name] = useState("");
  const [businessName, setbusinessName] = useState("");
  const [darkColor, setdarkColor] = useState("");
  const [lightColor, setlightColor] = useState("");
  const [pic, setpic] = useState();
  const [colors, setcolors] = useState([]);
  useEffect(() => {
    if (!companyInfo) {
      navigate("/");
    } else {
      setdomain_name(companyInfo.account.domain_name);
      setbusinessName(companyInfo.account.businessName);
      setdarkColor(companyInfo.account.darkColor);
      setlightColor(companyInfo.account.lightColor);
      setpic(companyInfo.account.logo);
    }
  }, [navigate, companyInfo]);
  const handleChange = (e) => {
    const { value, checked } = e.target;

    // console.log(check);
    if (checked) {
      if (darkColor.length < 1) {
        setdarkColor((prev) => [...prev, value]);
      }
    } else {
      setdarkColor((prev) => prev.filter((x) => value !== x));
    }
  };
  const handleChangeLight = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      if (lightColor.length < 1) {
        setlightColor((prev) => [...prev, value]);
      }
    } else {
      setlightColor((prev) => prev.filter((x) => value !== x));
    }
  };
  const [buttonText, setButtonText] = useState("Upload Your Logo");
  const changeText = (text) => setButtonText(text);
  const [picMessage, setPicMessage] = useState();
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
          setpic(data.url.toString());

          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };
  const renderSwatches = (type, id) => {
    // const id=2;
    // console.log(check);

    const nb = colors.length;
    return colors?.map((color, index) => {
      console.log(nb);
      const normalizeColorValue =
        Array.isArray(color) && type === "rgb"
          ? `rgb(${color[0]}, ${color[1]}})`
          : color;

      return (
        <div>
          <div key={id} style={{ color }}>
            <div
              className="swatches"
              style={{
                backgroundColor: normalizeColorValue,
                color: normalizeColorValue,
              }}
            />
            {/* <Checkbox onChange={checkColors(color)} /> */}

            <div
              style={{
                backgroundColor: color,
                width: 40,
                height: 40,
                borderRadius: "31px",
                border: "1px solid var(--mahogany-3)",
                marginLeft: "4px",
                marginTop: "-25px",
                marginBottom: "-10px",
                // flex:"start"
                // justifyContent:"space-around"
              }}
              className="divColor"
            ></div>
            <Checkbox
              // checked={checked.indexOf(color) !== -1}
              className="check"
              style={{
                color: "var(--gold)",
              }}
              value={color}
              onChange={handleChange}
              checked={darkColor.indexOf(color) >= 0}
              // disabled={shouldDisableCheckbox(color)}
            />
          </div>
        </div>
      );
    });
  };
  const renderSwatchesLight = (type, id) => {
    // const id=2;
    // console.log(check);

    const nb = colors.length;
    return colors?.map((color, index) => {
      console.log(nb);
      const normalizeColorValue =
        Array.isArray(color) && type === "rgb"
          ? `rgb(${color[0]}, ${color[1]}})`
          : color;

      return (
        <div>
          <div key={id} style={{ color }}>
            <div
              className="swatches"
              style={{
                backgroundColor: normalizeColorValue,
                color: normalizeColorValue,
              }}
            />
            {/* <Checkbox onChange={checkColors(color)} /> */}

            <div
              style={{
                backgroundColor: color,
                width: 40,
                height: 40,
                borderRadius: "31px",
                border: "1px solid var(--mahogany-3)",
                marginLeft: "4px",
                marginTop: "-25px",
                marginBottom: "-10px",
                // flex:"start"
                // justifyContent:"space-around"
              }}
              className="divColor"
            ></div>
            <Checkbox
              // checked={checked.indexOf(color) !== -1}
              className="check"
              style={{
                color: "var(--gold)",
              }}
              value={color}
              onChange={handleChangeLight}
              checked={lightColor.indexOf(color) >= 0}
              // disabled={shouldDisableCheckbox(color)}
            />
          </div>
        </div>
      );
    });
  };
  const fileRef = useRef();
  const getColors = (colors) => setcolors(colors);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(params.id);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.put(
        process.env.REACT_APP_BACKEND + "/auth/updateAccount",
        {
          id: companyInfo.id,
          account: {
            domain_name: domain_name,
            logo: pic,
            darkColor: darkColor.toString(),
            lightColor: lightColor.toString(),
            businessName: businessName,
          },
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
  };

  return (
    <ContentMenuItem>
      <Notification
        notify={notify}
        setNotify={setNotify}
        vertical="top"
        horizontal="right"
      />
      <form onSubmit={handleSubmit}>
        <Grid
          className={classes.grid}
          container
          sx={{ flexGrow: 1 }}
          alignItems="center"
          justify="center"
          spacing={6}
        >
          <Grid xs={12}></Grid>
          <Grid xs={6}>
            <Paper
              className="x01 border-6px-gold"
              style={{ borderRadius: 25, marginLeft: "120px" }}
            >
              <div style={{ marginTop: 20 }}>
                <Button
                  // className="button"
                  // id="file-upload"
                  onClick={() => {
                    fileRef.current.click();
                    changeText("Reupload Your Logo");
                  }}
                  // size="large"
                  className={classes.btn}
                  style={{
                    boxShadow: "0px 3px 6px #00000029",
                    borderRadius: "49px",
                    border: "1px dashed var(--dove-gray)",
                    height: "55px",
                    width: "auto",
                  }}
                  // startIcon={<IosShareRoundedIcon />}
                  startIcon={
                    <IconContext.Provider
                      value={{
                        // backgroundColor: "gold",
                        color: "var(--white)",
                        size: "30px",
                        // paddingLeft: "-30px",
                        // marginLeft:"-55px"
                        // textAlign:"center"
                      }}
                    >
                      <div
                        style={{ width: "50px", height: "50px" }}
                        className="export"
                      >
                        <BiExport style={{ marginTop: "7px" }} />
                      </div>
                    </IconContext.Provider>
                  }
                >
                  <input
                    type="file"
                    ref={fileRef}
                    onChange={(e) => postDetails(e.target.files[0])}
                    accept="image/png,image/jpeg"
                    hidden
                  />
                  {/* <div className="upload-your-logo cerapro-bold-mahogany-31px"> */}{" "}
                  {buttonText}
                  {/* </div> */}
                </Button>
              </div>

              <ColorExtractor
                getColors={getColors}
                maxColors={128}
                // onError={props.onError}
                src={pic}
              >
                {/* <img src={pic} style={{ width: 200, height: 200 }} /> */}
              </ColorExtractor>
              <div
                style={{
                  marginTop: 40,
                  textAlign: "start",
                  marginLeft: "10px",
                }}
              >
                <h4 className="selectColor">select one dark color :</h4>

                <div className="display-swatches">
                  {/* <br /> */}
                  {renderSwatches("hex")}
                </div>
                {/* <h6>Selected colors: {check.length ? check.join(", ") : null}</h6> */}
              </div>
              <div
                style={{
                  marginTop: "-25px",
                  textAlign: "start",
                  marginLeft: "10px",
                }}
              >
                <h4 className="selectColor">select one light color :</h4>

                <div className="display-swatches">
                  {/* <br /> */}
                  {renderSwatchesLight("hex")}
                </div>
                {/* <h6>Selected colors: {check.length ? check.join(", ") : null}</h6> */}
              </div>
              <Grid xs={12} style={{ marginTop: "-25px" }}>
                <div className="png-or-jpg-only">PNG OR JPG ONLY</div>
              </Grid>
            </Paper>
          </Grid>
          <Grid xs={4}>
            <Paper
              className="x01 border-6px-gold"
              style={{ borderRadius: 25, marginLeft: "50px" }}
            >
              <Grid xs={12}>
                {" "}
                <div className="business-name">Business name</div>
              </Grid>
              <Grid xs={12}>
                <TextField
                  id="outlined-basic"
                  placeholder="Société tunisienne de l'électricité et du gaz"
                  variant="outlined"
                  className={classes.txtName}
                  InputProps={{
                    classes: { input: classes.input },
                  }}
                  value={businessName}
                  onChange={(e) => setbusinessName(e.target.value)}
                />
              </Grid>
              <Grid xs={12}>
                <div className="business-username">Business Username</div>
              </Grid>
              <Grid xs={12}>
                <TextField
                  id="outlined-basic"
                  placeholder="STEG.Quizness.com"
                  variant="outlined"
                  InputProps={{
                    classes: { input: classes.inputUserName },
                    maxLength: 15,
                  }}
                  helperText={`*15 character`}
                  className={classes.txtUsserName}
                  FormHelperTextProps={{
                    classes: {
                      root: classes.root,
                    },
                  }}
                  value={domain_name}
                  onChange={(val) => setdomain_name(val.target.value)}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <button
          className="btnVerif border-1px-dove-gray"
          variant="contained"
          type="submit"
        >
          save
        </button>
      </form>
    </ContentMenuItem>
  );
}
