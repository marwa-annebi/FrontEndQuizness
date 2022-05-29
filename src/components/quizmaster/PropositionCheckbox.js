import { Checkbox, Grid, TextField } from "@material-ui/core";
import React from "react";

export default function PropositionCheckbox(props) {
  const { index, setquestion, question } = props;
  let prop = question;

  return (
    <div>
      {" "}
      <Grid xs={6}>
        <Checkbox
          name="veracity"
          value={question.propositions[index].veracity}
          onChange={(e) => {
            prop.propositions[index].veracity = e.target.checked;
            console.log(prop);
            setquestion({ ...prop });
          }}
        ></Checkbox>
        <TextField
          //   name={propositions[index].content}
          id="standard-basic"
          label={`Option ${index + 1}`}
          variant="standard"
          value={question.propositions[index].content}
          onChange={(e) => {
            prop.propositions[index].content = e.target.value;
            console.log(prop);
            setquestion({ ...prop });
          }}
        />
      </Grid>
    </div>
  );
}
