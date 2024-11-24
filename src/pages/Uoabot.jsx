import React from "react";
import Iframe from "react-iframe";

const Uoabot = () => {
  return (
    <>
      <div className="container mt-3"></div>
      <Iframe
        url="https://cgi.di.uoa.gr/~uoabot/"
        width="100%"
        height="800px"
        display="initial"
        position="relative"
      />
    </>
  );
};

export default Uoabot;
