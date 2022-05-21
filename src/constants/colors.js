import React from "react";

const [companySettings, setcompanySettings] = React.useState({
  account: {
    logo: "",
    colors: [],
    businessName: "",
    domain_name: "",
  },
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  verified: "",
});
const getCompanySettings = async () => {
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
  console.log("hello");
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND +
        `/auth/getCompanySettings?domain_name=${hostname}`,
      config
    );
    console.log(data);
    const { name, value } = data;
    setcompanySettings((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
    console.log("*companySettings", companySettings);
    // console.log("#result", re);
  } catch (error) {
    console.log(error);
  }
};
export const GlobalStyles = {
  colors: {
    color1: companySettings.account.colors[0],
    color2: companySettings.account.colors[1],
  },
};
