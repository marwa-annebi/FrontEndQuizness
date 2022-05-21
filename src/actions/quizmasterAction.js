import axios from "axios";
import {
  COMPANY_SETTINGS_FAIL,
  COMPANY_SETTINGS_REQUEST,
  COMPANY_SETTINGS_SUCCESS,
} from "../constants/quizmasterConstant";

export const CompanySettings = () => async (dispatch) => {
  try {
    dispatch({
      type: COMPANY_SETTINGS_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const host = window.location.host;
    console.log(host);
    const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2);
    let hostname = arr.toString();
    console.log(hostname);
    // console.log("hello");
    const data = await axios.get(
      process.env.REACT_APP_BACKEND +
        `/auth/getCompanySettings?domain_name=${hostname}`,
      config
    );

    dispatch({
      type: COMPANY_SETTINGS_SUCCESS,
      payload: data,
    });
    localStorage.setItem("companyInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: COMPANY_SETTINGS_FAIL,
      payload: message,
    });
  }
};
