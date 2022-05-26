import React, { useState } from "react";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";

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
    color: "black",
    fontFamily: "cerapro-Medium",
  },
  label: {
    fontFamily: "cerapro-Medium",
    color: "#560a02",
    fontSize: "15px",
    // fontWeight: 700,
    opacity: 0.48,
    whiteSpace: "nowrap",
  },
}));
export default function AddSkill(props) {
  const { loadCategories } = props;
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
  const add = async () => {
    try {
      const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${quizmasterInfo.token}`,
        },
      };
      setloading(true);
      const { result } = await axios.post(
        process.env.REACT_APP_BACKEND + "/quizmaster/createSkill",
        { skill_name, requirements },
        config
      );
      setNotify({
        isOpen: true,
        message: result.message,
        type: "success",
      });

      //   setOpenPopup(false);
      loadCategories();
      setloading(false);
      //   }
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
          <form onSubmit={add}>
            <Grid item xs={12}>
              <TextField
                id="skill_name"
                label="Skill Name"
                value={skill_name}
                onChange={(e) => setskill_name(e.target.value)}
                InputProps={{
                  className: classes.input,
                }}
                className={classes.textField}
                InputLabelProps={{ className: classes.label }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="requirements"
                value={requirements}
                onChange={(e) => setrequirements(e.target.value)}
                multiline
                rows={2}
                maxRows={8}
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{ className: classes.label }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit">add skill</Button>
            </Grid>
          </form>
        </>
      )}
    </>
  );
}
