import React from "react";

export default function buyvoucher(darkColor, lightColor) {
  const handleCheckout = () => {};
  return (
    <div
      style={{
        backgroundColor: darkColor,
        color: lightColor,
        border: `1px solid ${lightColor}`,
        borderRadius: "20px",
        fontSize: "18px",
        height: "30px",
        width: "130px",
        marginTop: "-5px",
        textAlign: "center",
        marginLeft: "11.5%",
        paddingTop: "2px",
        marginTop: "-10px",
        cursor: "pointer",
        boxShadow: "0px 3px 4px #000000",
      }}
      onClick={() => handleCheckout()}
    >
      Buy Voucher
    </div>
  );
}
