import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContentMenuItem from "../ContentMenuItem";

export default function QuizzesCandidate(props) {
  const darkColor = props.account.darkColor;
  const lightColor = props.account.lightColor;
  const [quizzes, setquizzes] = useState([]);
  const candidate = JSON.parse(sessionStorage.getItem("candidateInfo"));

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${candidate.token}`,
    },
  };
  const loadQuizzes = async () => {
    const result = await axios.get(
      process.env.REACT_APP_BACKEND +
        `/candidate/getQuizzes?quizmaster=${props._id}`,
      config
    );
    console.log(result.data.reverse());
    setquizzes(result.data.reverse());
  };
  useEffect(
    () => {
      loadQuizzes();
    },
    [],
    [quizzes]
  );
  // const styles = makeStyles((theme) => ({
  //   paper: {
  //     border: `4px solid ${lightColor}`,
  //     width: "170px",
  //     height: "170px",
  //     textAlign: "center",
  //     justifyContent: "center",
  //     fontFamily: "var(--font-family-cerapro-bold)",
  //     fontWeight: 700,
  //     fontSize: "26px",
  //     color: "#000000",
  //     boxShadow: "0px 3px 6px #00000029",
  //   },
  //   div: {
  //     backgroundColor: darkColor,
  //     color: lightColor,
  //     border: `1px solid ${lightColor}`,
  //     borderRadius: "20px",
  //     fontSize: "18px",
  //     height: "30px",
  //     width: "130px",
  //     marginTop: "-5px",
  //     textAlign: "center",
  //     marginLeft: "11.5%",
  //     paddingTop: "2px",
  //     marginTop: "-10px",
  //     cursor: "pointer",
  //     boxShadow: "0px 3px 4px #000000",
  //   },
  //   div1: {
  //     backgroundColor: darkColor,
  //     color: lightColor,
  //     border: `1px solid ${lightColor}`,
  //     borderRadius: "20px",
  //     fontSize: "18px",
  //     height: "30px",
  //     width: "130px",
  //     marginBottom: "5px",
  //     textAlign: "center",
  //     marginLeft: "11.5%",
  //     paddingTop: "2px",
  //     cursor: "pointer",
  //     marginTop: "10px",
  //     boxShadow: "0px 3px 4px #000000",
  //   },
  // }));
  return (
    <div style={{ height: "100vh" }}>
      <ContentMenuItem
        style={{ borderColor: darkColor, boxShadow: " 0px 3px 6px #00000029" }}
      >
        {quizzes?.map((item) => {
          return (
            <div>
              <h3>{item.quizName}</h3>
              <Link to="/playQuiz" state={{ from: { item } }}>
                play quiz
              </Link>
            </div>
          );
        })}
      </ContentMenuItem>
    </div>
  );
}
