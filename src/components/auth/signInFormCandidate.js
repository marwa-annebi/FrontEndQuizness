import React, { useContext } from "react";
import "./../../css/siginFormQuizMaster.css";
import iconPlay from "./../../assets/polygone-2-1@1x.png";
import Icon from "../icon";
import { FaGoogle, FaLinkedinIn, FaMicrosoft } from "react-icons/fa";
import { AccountContext } from "../accountContext";
import "./../../css/signup.css"
function SignInFormCandidate() {
  const { switchToSignup } = useContext(AccountContext);
  return (
    <div className="rectangle-white">
      <h1 className="title">log in as Candidate </h1>
      <div class="form__group field">
        <input
          type="email"
          class="form__field"
          placeholder="Email"
          name="email"
          id="email"
          required
        />
        <label for="email" className="form__label">
          Email
        </label>
      </div>
      {/* <br /> */}

      <div class="form__group field">
        <input
          type="password"
          class="form__field"
          placeholder="Password"
          name="password"
          id="password"
          required
        />
        <label for="password" class="form__label1">
          Password
        </label>
      </div>
      <img src={iconPlay} className="iconPlay" />
      <h4 className="lost-your-password">Lost your password ?</h4>
      <div className="IconsContainer">
        <Icon>
          <FaGoogle size={"40px"} />
        </Icon>
        <Icon>
          <FaLinkedinIn size={"40px"} />
        </Icon>
        <Icon>
          <FaMicrosoft size={"40px"} />
        </Icon>
      </div>
      <div style={{marginTop:"50px"}}>
        <a href="#" className="btn-sign-up" onClick={switchToSignup}>
          sign up
        </a>
      </div>
    </div>
  );
}

export default SignInFormCandidate;
