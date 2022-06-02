import { Checkbox, Grid, makeStyles, TextField } from "@material-ui/core";
import React from "react";
const styles = makeStyles((theme) => ({
  input: {
    fontFamily: "cerapro-Medium",
    color: "var( --licorice)",
    textAlign: "center",
  },

  label: {
    fontFamily: "cerapro-Medium",
    // color: "#560a02",
    fontSize: "15px",
    // fontWeight: 700,
    // opacity: 0.48,
    whiteSpace: "nowrap",
  },

  txtName: {
    [`& fieldset`]: {
      borderRadius: 49,
      border: "3px solid var(--gold)",
      boxShadow: "0px 3px 6px #00000029",
      height: "50px",
    },
    // backgroundColor: "transparent",
    marginTop: "15px",
    // width: "300px",
  },
}));
export default function PropositionCheckbox(props) {
  const { index, setquestion, question } = props;
  let prop = question;
  const classes = styles();
  return (
    <Grid container>
      <Grid xs={2} style={{ marginTop: "15px" }}>
        <Checkbox
          style={{ color: "var(--mahogany-32)", width: 36, height: 36 }}
          name="veracity"
          value={question.propositions[index].veracity}
          onChange={(e) => {
            prop.propositions[index].veracity = e.target.checked;
            console.log(prop);
            setquestion({ ...prop });
          }}
          // size="30px"
        ></Checkbox>
      </Grid>
      <Grid xs={10}>
        <TextField
          //   name={propositions[index].content}

          label={`Option ${index + 1}`}
          id="outlined-basic"
          variant="outlined"
          className={classes.txtName}
          InputProps={{
            classes: { input: classes.input },
          }}
          value={question.propositions[index].content}
          InputLabelProps={{ className: classes.label }}
          onChange={(e) => {
            prop.propositions[index].content = e.target.value;
            console.log(prop);
            setquestion({ ...prop });
          }}
        />
      </Grid>
    </Grid>
  );
}
