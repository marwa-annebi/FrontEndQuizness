import { Button } from "@material-ui/core";
import React, { useState } from "react";
import ContentMenuItem from "./../ContentMenuItem";
import ChooseTypeQuiz from "./ChooseTypeQuiz";

export default function QuizHistory() {
  const [openModel, setopenModel] = useState(false);
  const closeModal = () => {
    setopenModel(false);
  };
  return (
    <ContentMenuItem>
      <Button
        id="basic-button"
        style={{ width: "170px", justifyContent: "center" }}
        onClick={() => {
          setopenModel(true);
        }}
      >
        add Quiz
      </Button>
      <ChooseTypeQuiz
        modalIsOpen={openModel}
        // onAfterOpen={afterOpenModal}
        closeModal={closeModal}
      >
        {/* <ChooseTypeQuiz /> */}
      </ChooseTypeQuiz>
    </ContentMenuItem>
  );
}
