import React from "react";

import { Link } from "react-router-dom";

import email from "../assets/email.svg";

import Footer from "../components/FooterContent";

function CheckEmail() {

  return (

    <div
      className="
        max-w-2xl
        mx-auto
        p-8
        min-h-screen
      "
    >

      <img
        src={email}
        alt="Check Email"
        className="
          mx-auto
          w-24
          h-24
        "
      />

      <h1
        className="
          text-3xl
          font-bold
          text-center
          mt-4
        "
      >
        Check Your Email
      </h1>

      <p
        className="
          text-center
          mt-4
          text-gray-600
        "
      >
        We have sent a password reset link
        to your email address.
      </p>

      <Link
        to="/"
        className="
          block
          w-full
          bg-black
          text-white
          text-center
          py-2
          px-4
          rounded
          mt-4
          hover:bg-gray-800
          font-semibold
        "
      >
        Back to Sign In
      </Link>

      <p
        className="
          text-center
          mt-4
          text-gray-600
          text-sm
        "
      >
        Didn't receive the email?{" "}

        <Link
          to="/forgot-password"
          className="
            text-black
            font-semibold
            hover:underline
          "
        >
          Resend
        </Link>

      </p>

      <Footer />

    </div>
  );
}

export default CheckEmail;