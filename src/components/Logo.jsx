import React from "react";

import logo from "../assets/logo.jpg";

function Logo() {

  return (

    <img
      src={logo}
      alt="E-Mart Logo"
      className="
        mx-auto
        w-24
        h-24
      "
    />

  );

}

export default Logo;