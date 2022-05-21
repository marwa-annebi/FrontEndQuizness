import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./../assets/lotties/99257-loading-gif-animation.json";
export default function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    // container: animationData.current,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      {/* {loading && ( */}
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        style={{ transformOrigin: "50% 50%" }}
      />
      {/* )} */}
    </div>
  );
}
