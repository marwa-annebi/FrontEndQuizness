import React, { useState } from "react";
import { AccountContext } from "../accountContext";
import SignInFormCandidate from "./signInFormCandidate";
import SignUpCandidate from "./signUpCandidate";
export default function Index() {
  const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
  };
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };
  const contextValue = { switchToSignup, switchToSignin };
  return (
    <AccountContext.Provider value={contextValue}>
      <div>
        {" "}
        {active === "signin" && <SignInFormCandidate />}
        {active === "signup" && <SignUpCandidate />}
      </div>
    </AccountContext.Provider>
  );
}
