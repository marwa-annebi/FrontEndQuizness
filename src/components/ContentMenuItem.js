import React from "react";

export default function ContentMenuItem({ children }) {
  return (
    <div className="border">
      <div className="content">{children}</div>
    </div>
  );
}
