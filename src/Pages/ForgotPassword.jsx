import React from "react";

import Logo from "../components/Logo";

import Footer from "../components/FooterContent";

import {
  Field,
  Formik,
  Form,
  ErrorMessage,
} from "formik";

import * as Yup from "yup";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

function ForgotPassword() {

  const navigate =
    useNavigate();

  // BACKEND URL
  const API_URL =
    "https://password-reset-backend-1-e0hb.onrender.com";

  // INITIAL VALUES
  const initialValues = {

    email: "",
  };

  // VALIDATION
  const validationSchema =
    Yup.object({

      email: Yup.string()

        .email(
          "Invalid email format"
        )

        .required(
          "Email is required"
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

      // API CALL
      const response =
        await axios.post(

          `${API_URL}/api/auth/forgot-password`,

          {

            email:
              values.email
                .toLowerCase()
                .trim(),
          }
        );

      console.log(
        "FORGOT PASSWORD RESPONSE:",
        response.data
      );

      // SUCCESS
      alert(
        "Password reset email sent successfully"
      );

      resetForm();

      // GO CHECK EMAIL PAGE
      navigate(
        "/check-email"
      );

    } catch (error) {

      console.log(
        "FORGOT PASSWORD ERROR:",
        error.response?.data
      );

      alert(

        error.response?.data?.error ||

        error.response?.data?.message ||

        "Failed to send reset email"
      );

    } finally {

      setSubmitting(false);
    }
  };

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

        Forgot Password

      </h1>

      <p
        className="
          text-center
          mt-4
          text-gray-600
        "
      >

        Enter your email
        to receive a
        password reset link.

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
              mt-4
              max-w-xl
              mx-auto
              bg-white
              p-4
            "
          >

            <Form>

              {/* EMAIL */}

              <label
                className="
                  block
                  font-semibold
                  text-gray-800
                "
              >

                Email

              </label>

              <Field

                name="email"

                type="email"

                placeholder="Enter your email"

                className="
                  border
                  border-gray-300
                  w-full
                  p-2
                  rounded
                  mt-1
                "
              />

              <ErrorMessage

                name="email"

                component="div"

                className="
                  text-red-500
                  text-sm
                "
              />

              {/* BUTTON */}

              <button

                type="submit"

                disabled={
                  isSubmitting
                }

                className="
                  w-full
                  bg-black
                  text-white
                  py-2
                  rounded
                  mt-4
                  hover:bg-gray-800
                "
              >

                {isSubmitting

                  ? "Sending..."

                  : "Send Reset Link"}

              </button>

            </Form>

            <Footer />

          </div>
        )}

      </Formik>

    </div>
  );
}

export default ForgotPassword;