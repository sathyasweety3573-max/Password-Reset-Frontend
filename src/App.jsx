import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ForgotPassword from "./Pages/ForgotPassword";
import CheckEmail from "./Pages/CheckEmail";
import ResetPassword from "./Pages/ResetPassword";
import { Routes, Route, Link } from "react-router-dom";
import WelcomeBlog from "./Pages/Welcome";
import SuccessReset from "./Pages/SuccessReset";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/welcome" element={<WelcomeBlog />} />
        <Route path="/success" element={<SuccessReset/>}/>
      </Routes>
    </>
  );
}

export default App;