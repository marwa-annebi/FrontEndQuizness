import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import trac from "./../../assets/trac--136@1x.png";

import axios from "axios";
import Loading from "../Loading";
import Notification from "../Notification";

const styles = makeStyles((theme) => ({
  h5: {
    fontFamily: "cerapro-Medium",
    textAlign: "center",
    paddingTop: "30px",
    fontWeight: 700,
    color: "#560a02",
  },
  textField: {
    width: "120px",
    fontFamily: "cerapro-Medium",
    textAlign: "center",
    justifyContent: "center",
  },
  input: {
    fontFamily: "cerapro-Medium",
    color: "var( --licorice)",
    textAlign: "center",
  },
  inputtextarea: {
    padding: "5px 35px 0px 35px",
    fontFamily: "cerapro-Medium",
    color: "var( --licorice)",
  },
  label: {
    fontFamily: "cerapro-Medium",
    color: "#560a02",
    fontSize: "15px",
    // fontWeight: 700,
    opacity: 0.48,
    whiteSpace: "nowrap",
  },
  title: {
    color: "var(--licorice)",
    fontFamily: "var(--font-family-cerapro-bold)",
    fontSize: "43px",
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "43px",
    minHeight: "49px",
    whiteSpace: "nowrap",
    marginTop: "-5px",
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
  textarea: {
    [`& fieldset`]: {
      borderRadius: 39,
      border: "3px solid var(--gold)",
    },
    backgroundColor: "var(--white)",
    width: "500px",
  },
}));
export default function AddSkill(props) {
  const { loadCategories, setOpenPopup, skill } = props;

  const classes = styles();
  const [skill_name, setskill_name] = useState("");
  const [requirements, setrequirements] = useState("");
  const [loading, setloading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //   function closeModal() {
  //     setOpenPopup(false);
  //   }
  useEffect(() => {
    // loadCategories();
    if (skill) {
      setskill_name(skill.skill_name);
      setrequirements(skill.requirements);
    }
  }, []);

  const updateSkill = async () => {
    try {
      const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${quizmasterInfo.token}`,
        },
      };
      setloading(true);
      const { data } = await axios.put(
        process.env.REACT_APP_BACKEND + `/quizmaster/updateSkill/${skill._id}`,
        { skill_name: skill_name, requirements: requirements },
        config
      );
      setNotify({
        isOpen: true,
        message: data.message,
        type: "success",
      });
      setOpenPopup(false);
      loadCategories();
      setloading(false);
    } catch (error) {
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
  const addSkill = async () => {
    try {
      const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${quizmasterInfo.token}`,
        },
      };
      setloading(true);
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND + "/quizmaster/createSkill",
        { skill_name, requirements },
        config
      );
      setNotify({
        isOpen: true,
        message: data.message,
        type: "success",
      });

      setOpenPopup(false);
      loadCategories();
      setloading(false);
    } catch (error) {
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
        <>
          <Notification
            notify={notify}
            setNotify={setNotify}
            vertical="top"
            horizontal="right"
          />
          <div
            style={{
              direction: "row",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {/* <div class="w3-container w3-center w3-animate-top"> */}
            <img
              src={trac}
              style={{
                width: "30px",
                height: "30px",
                // marginLeft: "77px",
                // cursor: "pointer",
                // display: "inline",
                marginRight: "5px",
              }}
              className="iconaddskill"
            />
            {/* </div> */}
            <h1 className={classes.title}>Add Skill</h1>
          </div>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div
                  style={{
                    color: "var(--mahogany-32)",
                    fontFamily: "var(--font-family-cerapro-bold)",
                    fontSize: "23px",
                    marginBottom: "-15px",
                  }}
                >
                  Skill Name
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  placeholder="Kotlen"
                  variant="outlined"
                  className={classes.txtName}
                  InputProps={{
                    classes: { input: classes.input },
                  }}
                  value={skill_name}
                  onChange={(e) => setskill_name(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{
                    marginTop: "10px",
                    color: "var(--mahogany-32)",
                    fontFamily: "var(--font-family-cerapro-bold)",
                    fontSize: "23px",
                  }}
                >
                  Skill Description
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder={`Lorem Ipsum is simply dummy text,
                  \n
                            of the printing and typesetting industry
                             Lorem Ipsum has been the industry's ,
                            standard dummy text ever since the 1500s,
                            when an unknown printer 
                            took a galley of type and`}
                  value={requirements}
                  onChange={(e) => setrequirements(e.target.value)}
                  multiline
                  rows={4}
                  maxRows={6}
                  className={classes.textarea}
                  InputProps={{
                    className: classes.inputtextarea,
                  }}
                  InputLabelProps={{ className: classes.label }}
                />
              </Grid>
              <Grid item xs={12}>
                <button
                  className="btnVerif border-1px-dove-gray"
                  variant="contained"
                  type="submit"
                  // onClick={handleNext}
                  style={{
                    marginLeft: "50px",
                    // height: "20px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-family-cerapro-bold)",
                      fontWeight: 700,
                      fontSize: "26px",
                    }}
                    onClick={() => {
                      if (!skill) {
                        addSkill();
                      } else if (skill) updateSkill();
                    }}
                  >
                    OKAY
                  </div>
                </button>
              </Grid>
            </Grid>
          </form>
        </>
      )}
    </>
  );
}
