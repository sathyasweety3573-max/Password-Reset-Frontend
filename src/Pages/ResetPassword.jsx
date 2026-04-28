import React, { useEffect, useState } from "react";

import Logo from "../components/Logo";
import Footer from "../components/FooterContent";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";

import * as Yup from "yup";

import axios from "axios";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

function ResetPassword() {

  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [tokenValid, setTokenValid] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  // IMPORTANT
  // USE ONLY THIS BACKEND URL
  const API_URL =
    "https://password-reset-backend-1-e0hb.onrender.com";

  console.log(
    "TOKEN FROM URL:",
    token
  );

  // VERIFY TOKEN WHEN PAGE LOADS
  useEffect(() => {

    const verifyToken =
      async () => {

        try {

          const response =
            await axios.get(

              `${API_URL}/api/auth/verify-reset-token/${token}`
            );

          console.log(
            "VERIFY RESPONSE:",
            response.data
          );

          if (
            response.data.success
          ) {

            setTokenValid(true);
          }

        } catch (error) {

          console.log(
            "VERIFY ERROR:",
            error.response?.data
          );

          alert(
            error.response?.data?.error ||

            "Invalid or expired token"
          );

          navigate(
            "/forgot-password"
          );

        } finally {

          setLoading(false);
        }
      };

    if (token) {

      verifyToken();
    }

  }, [token, navigate]);

  // INITIAL VALUES
  const initialValues = {

    newPassword: "",

    confirmPassword: "",
  };

  // VALIDATION
  const validationSchema =
    Yup.object({

      newPassword:
        Yup.string()

          .min(
            6,
            "Password must be at least 6 characters"
          )

          .required(
            "Password is required"
          ),

      confirmPassword:
        Yup.string()

          .oneOf(
            [Yup.ref("newPassword")],
            "Passwords must match"
          )

          .required(
            "Confirm password is required"
          ),
    });

  // SUBMIT
  const onSubmit = async (

    values,

    {
      setSubmitting,
      resetForm,
    }

  ) => {

    try {

      setSubmitting(true);

      console.log(
        "TOKEN SENT:",
        token
      );

      console.log(
        "FORM VALUES:",
        values
      );

      const response =
        await axios.post(

          `${API_URL}/api/auth/reset-password/${token}`,

          {

            newPassword:
              values.newPassword,

            confirmPassword:
              values.confirmPassword,
          }
        );

      console.log(
        "RESET RESPONSE:",
        response.data
      );

      alert(
        "Password reset successful"
      );

      resetForm();

      navigate("/");

    } catch (error) {

      console.log(
        "RESET ERROR:",
        error.response?.data
      );

      alert(

        error.response?.data?.error ||

        error.response?.data?.message ||

        "Password reset failed"
      );

    } finally {

      setSubmitting(false);
    }
  };

  // LOADING
  if (loading) {

    return (

      <div
        className="
          text-center
          mt-10
          text-xl
        "
      >
        Verifying token...
      </div>
    );
  }

  // INVALID TOKEN
  if (!tokenValid) {

    return null;
  }

  return (

    <div
      className="
        max-w-4xl
        mx-auto
        p-8
        min-h-screen
      "
    >

      <Logo />

      <h1
        className="
          text-3xl
          font-bold
          text-center
        "
      >
        Reset Password
      </h1>

      <p
        className="
          text-center
          mt-4
          text-gray-600
        "
      >
        Enter your new password
        below.
      </p>

      <Formik

        initialValues={
          initialValues
        }

        validationSchema={
          validationSchema
        }

        onSubmit={
          onSubmit
        }
      >

        {({
          isSubmitting,
        }) => (

          <div
            className="
              mt-2
              max-w-xl
              mx-auto
              bg-white
              p-4
            "
          >

            <Form>

              {/* NEW PASSWORD */}

              <label
                className="
                  block
                  font-semibold
                  mt-4
                "
              >
                New Password
              </label>

              <Field

                type="password"

                name="newPassword"

                placeholder="Enter new password"

                className="
                  border
                  w-full
                  p-2
                  mt-1
                  rounded
                "
              />

              <ErrorMessage

                name="newPassword"

                component="div"

                className="
                  text-red-500
                  text-sm
                "
              />

              {/* CONFIRM PASSWORD */}

              <label
                className="
                  block
                  font-semibold
                  mt-4
                "
              >
                Confirm Password
              </label>

              <Field

                type="password"

                name="confirmPassword"

                placeholder="Confirm password"

                className="
                  border
                  w-full
                  p-2
                  mt-1
                  rounded
                "
              />

              <ErrorMessage

                name="confirmPassword"

                component="div"

                className="
                  text-red-500
                  text-sm
                "
              />

              <button

                type="submit"

                disabled={
                  isSubmitting
                }

                className="
                  w-full
                  bg-black
                  text-white
                  p-2
                  mt-4
                  rounded
                "
              >

                {isSubmitting

                  ? "Resetting..."

                  : "Reset Password"}

              </button>

            </Form>

            <Footer />

          </div>
        )}

      </Formik>

    </div>
  );
}

export default ResetPassword;