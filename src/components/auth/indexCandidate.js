import React, { useState } from "react";
import { AccountContext } from "../accountContext";
import SignInFormCandidate from "./signInFormCandidate";
import SignUpCandidate from "./signUpCandidate";
export default function Index(companyInfo) {
  const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
  };
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");
  console.log(companyInfo);
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
        {active === "signin" && (
          <SignInFormCandidate companyInfo={companyInfo} />
        )}
        {active === "signup" && <SignUpCandidate companyInfo={companyInfo} />}
      </div>
    </AccountContext.Provider>
  );
}
