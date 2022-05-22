import { TextField, makeStyles, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ContentMenuItem from "./../ContentMenuItem";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Box, CardContent, Collapse } from "@mui/material";
import { GrAdd } from "react-icons/gr";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import Loading from "../Loading";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
export default function Category() {
  const classes = styles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [categories, setcategories] = useState([]);
  const [skill_name, setcategory] = useState("");
  const [loading, setloading] = useState(false);
  const [requirements, setrequirements] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const loadCategories = async () => {
    const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${quizmasterInfo.token}`,
      },
    };
    // console.log(quizmasterInfo.token);
    const result = await axios.get(
      process.env.REACT_APP_BACKEND + "/quizmaster/getSkills",
      config
    );
    setcategories(result.data.reverse());
  };
  useEffect(
    () => {
      loadCategories();
    },
    [],
    [categories]
  );
  const deleteCategory = async (id) => {
    try {
      const quizmasterInfo = JSON.parse(localStorage.getItem("quizmasterInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${quizmasterInfo.token}`,
        },
      };
      await axios.delete(
        process.env.REACT_APP_BACKEND + `/quizmaster/skill/${id}`,
        config
      );
      loadCategories();
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "success",
      });
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
      }
    }
  };
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
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
      loadCategories();
      setNotify({
        isOpen: true,
        message: result.message,
        type: "success",
      });
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
    <div style={{ height: "100vh" }}>
      {/* {loading && <Loading />} */}
      <ContentMenuItem>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 200,
              height: 150,
              borderRadius: "18px",
              fontFamily: "cerapro-Medium",
            },
          }}
        >
          <Paper
            elevation={3}
            className={classes.paper}
            style={{ textAlign: "center" }}
          >
            <div style={{ display: "inline" }}>
              <TextField
                id="skill_name"
                label="category Name"
                value={skill_name}
                onChange={(e) => setcategory(e.target.value)}
                InputProps={{
                  className: classes.input,
                }}
                className={classes.textField}
                InputLabelProps={{ className: classes.label }}
              />
              <IconContext.Provider
                value={{
                  size: "20px",
                }}
              >
                <div
                  style={{
                    float: "right",
                    marginRight: "20px",
                    marginTop: "30px",
                    cursor: "pointer",
                  }}
                >
                  <GrAdd onClick={add} />
                </div>
              </IconContext.Provider>
            </div>
            <TextareaAutosize
              maxRows={4}
              // placeholder="Maximum 4 rows"
              // id="outlined-multiline-static"
              aria-label="maximum height"
              placeholder="Maximum 4 rows"
              label="requirements"
              style={{
                fontFamily: "cerapro-Medium",
                marginTop: "20px",
                border: "2px solid #560a02",
                borderRadius: "15px",
                // width: "120px",
              }}
              value={requirements}
              onChange={(e) => setrequirements(e.target.value)}
              // variant="outlined"
            />
          </Paper>

          {categories?.map((key, id) => (
            <Paper
              elevation={3}
              key={id}
              className={classes.paper}
              style={{ height: "100px" }}
            >
              <IconContext.Provider
                value={{
                  size: "20px",
                  position: "relative",
                  right: "10px",
                }}
              >
                <div
                  style={{
                    float: "right",
                    marginRight: "10px",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  <AiOutlineClose
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete this record?",
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          deleteCategory(key._id);
                          console.log(key._id);
                          setConfirmDialog({
                            isOpen: false,
                          });
                        },
                      });
                    }}
                  />
                </div>
              </IconContext.Provider>
              <Typography variant="h5" className={classes.h5}>
                {key.skill_name}
              </Typography>

              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                style={{ marginTop: "15px", color: "gold" }}
              >
                <ExpandMoreIcon
                  style={{ marginRight: "-20px", color: "gold" }}
                />
              </ExpandMore>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>{key.requirements}</Typography>
                </CardContent>
              </Collapse>
              {/* </Box>   */}
            </Paper>
          ))}

          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
          <Notification
            notify={notify}
            setNotify={setNotify}
            vertical="top"
            horizontal="right"
          />
        </Box>
      </ContentMenuItem>
    </div>
  );
}
