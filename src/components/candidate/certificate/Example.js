import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import { ComponentToPrint } from "./ComponentToPrint";
export default function Example(props) {
  // return (

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const location = useLocation();
  const { state } = location;

  return (
    <div style={{ display: "flex" }}>
      <ComponentToPrint candidat={state} account={props} ref={componentRef} />
      <button
        style={{
          borderRadius: "39px",
          color: "white",
          background: props.account.darkColor,
          border: "0px",
          width: "160px",
          height: "50px",
          marginLeft: "5px",
          cursor: "pointer",
          // padding: "10px",
          fontFamily: " var(--font-family-cerapro-bold)",
          fontSize: "16px",
          // marginLeft: "760px",
          // marginTop: "30px",
        }}
        onClick={handlePrint}
      >
        Print this out!
      </button>
    </div>
  );
  // )
}
