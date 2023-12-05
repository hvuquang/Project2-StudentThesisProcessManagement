"use client";
import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "./loading-animation.json";
const Loading = () => {
  return (
    <Lottie
      className="w-40 h-40 m-auto min-h-screen"
      animationData={loadingAnimation}
    />
  );
};

export default Loading;
