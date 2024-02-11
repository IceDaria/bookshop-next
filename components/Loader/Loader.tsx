import React from "react";
import s from "./Loader.module.scss";

const LoadingAnimation = () => {
  return (
    <div className={s.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  );
};

export default LoadingAnimation;