import React from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ForgotPassword from "./Pages/ForgotPassword";
import CheckEmail from "./Pages/CheckEmail";
import ResetPassword from "./Pages/ResetPassword";
import WelcomeBlog from "./Pages/Welcome";
import SuccessReset from "./Pages/SuccessReset";

function App() {

  return (

    <div>

      <Routes>

        {/* SIGN IN */}
        <Route
          path="/"
          element={<SignIn />}
        />

        {/* SIGN UP */}
        <Route
          path="/signup"
          element={<SignUp />}
        />

        {/* FORGOT PASSWORD */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* CHECK EMAIL */}
        <Route
          path="/check-email"
          element={<CheckEmail />}
        />

        {/* RESET PASSWORD */}
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* SUCCESS PAGE */}
        <Route
          path="/success"
          element={<SuccessReset />}
        />

        {/* WELCOME PAGE */}
        <Route
          path="/welcome"
          element={<WelcomeBlog />}
        />

      </Routes>

    </div>

  );

}

export default App;