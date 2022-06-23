import React from "react";
import "./../../../css/certificate.css";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { account, candidat } = props;
  console.log(props);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <table
        className="cert"
        style={{
          borderColor: account.account.darkColor,
          borderRadius: "39px",
          marginLeft: "50px",
        }}
      >
        <tr>
          <td align="center" class="crt_logo">
            <img
              src={account.account.logo}
              alt="logo"
              width="100px"
              style={{ borderRadius: "40px" }}
            />
          </td>
        </tr>
        <tr>
          <td align="center">
            <h1
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "44px",
              }}
            >
              Certificate Of{" "}
              {candidat.voucher.quiz.questions[0].skill.skill_name}{" "}
            </h1>
            <h2 style={{ fontFamily: "'Dancing Script', cursive" }}>
              This Certificate is awarded to
            </h2>
            <h1
              class="colorGreen crt_user"
              style={{ color: account.account.lightColor }}
            >
              {candidat.voucher.candidat.lastName}{" "}
              {candidat.voucher.candidat.firstName}
            </h1>
            <h3 class="afterName">
              For his/her completion of HSE Awareness session
            </h3>
            <h3>Awarded on 1 March 2020 </h3>
          </td>
        </tr>
        <tr>
          <td align="center">
            <img
              src="https://camo.githubusercontent.com/805e05b94844e39d7edd518f492c8599c71835b3/687474703a2f2f692e696d6775722e636f6d2f646e5873344e442e706e67"
              class="certSign"
              alt="sign"
            />
            <h3>Person Name </h3>
          </td>
        </tr>
      </table>
    </div>
  );
});
