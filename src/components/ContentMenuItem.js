import React from "react";

export default function ContentMenuItem({ children, style }) {
  return (
    <div className="border" style={style}>
      <div className="content">{children}</div>
    </div>
  );
}
