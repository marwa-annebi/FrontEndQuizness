import React from "react";
import ContentMenuItem from "../ContentMenuItem";

export default function Certificates(props) {
  const darkColor = props.account.darkColor;
  const lightColor = props.account.lightColor;
  return (
    <div style={{ height: "100vh" }}>
      <ContentMenuItem
        style={{ borderColor: darkColor, boxShadow: " 0px 3px 6px #00000029" }}
      ></ContentMenuItem>
    </div>
  );
}
