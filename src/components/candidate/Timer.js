import React, { useState } from "react";

export default function Timer() {
  const [seconds, setseconds] = useState(0);
  const [minutes, setminutes] = useState(0);
  var timer;
  useEffect(() => {
    timer = setInterval(() => {
      setseconds(seconds + 1);
    });
  });

  return <div>Timer</div>;
}
