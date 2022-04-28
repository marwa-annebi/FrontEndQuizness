import React, { useContext } from "react";
import { AccountContext } from "../accountContext";
import iconPlay from "./../../assets/polygone-2-1@1x.png";
import Icon from "../icon";
import { FaGoogle, FaLinkedinIn, FaMicrosoft } from "react-icons/fa";
function SignUpQuizmaster() {
  const { switchToSignin } = useContext(AccountContext);

  return (
    <div className="rectangle-white">
      <h1 className="title1">Register as Quiz Master</h1>
      <div class="form__group1 field1">
        <input
          type="text"
          class="form__field"
          placeholder="Password"
          name="password"
          id="password"
          required
        />
        <label for="password" class="form__label1">
          First name
        </label>
      </div>
      <div class="form__group1 field1">
        <input
          type="text"
          class="form__field"
          placeholder="Password"
          name="password"
          id="password"
          required
        />
        <label for="password" class="form__label1">
          Last name
        </label>
      </div>
      <div class="form__group1 field1">
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

      <div class="form__group1 field1">
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
      <div class="form__group1 field1">
        <input
          type="password"
          class="form__field"
          placeholder="Password"
          name="password"
          id="password"
          required
        />
        <label for="password" class="form__label1">
          Confirm password
        </label>
      </div>
      <img src={iconPlay} className="iconPlay1" />
      <div className="IconsContainer1">
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
      <div style={{ marginTop: "25px" }}>
        <a href="#" className="btn-sign-up1" onClick={switchToSignin}>
          sign in
        </a>
      </div>
    </div>
  );
}

export default SignUpQuizmaster;
