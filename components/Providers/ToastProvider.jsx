"use client";
import React from "react";
import { cssTransition, ToastContainer } from "react-toastify";
const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut",
});

const ToastProvider = ({ children }) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        bodyClassName={'min-w-max py-3'}
        autoClose={2500}
        newestOnTop={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      {children}
    </>
  );
};

export default ToastProvider;
