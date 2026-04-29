import React from "react";

import Logo from "../components/Logo";

import Footer from "../components/FooterContent";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";

import axios from "axios";

import * as Yup from "yup";

function Signin() {

  const navigate =
    useNavigate();

  // BACKEND URL
  const API_URL =
    "https://password-reset-backend-1-e0hb.onrender.com";

  // INITIAL VALUES
  const initialValues = {

    email: "",

    password: "",
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

      password: Yup.string()

        .min(
          6,
          "Password must be at least 6 characters"
        )

        .required(
          "Password is required"
        ),
    });

  // LOGIN SUBMIT
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

          `${API_URL}/api/auth/login`,

          {

            email:
              values.email
                .toLowerCase()
                .trim(),

            password:
              values.password,
          }
        );

      console.log(
        "LOGIN RESPONSE:",
        response.data
      );

      // SUCCESS
      alert(

        response.data.message ||

        "Login successful"
      );

      resetForm();

      // NAVIGATE
      navigate(
        "/welcome"
      );

    } catch (error) {

      console.log(
        "LOGIN ERROR:",
        error.response?.data
      );

      alert(

        error.response?.data?.error ||

        "Signin failed"
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

        Welcome to{" "}

        <span
          className="
            text-green-700
          "
        >
          E-Mart
        </span>

      </h1>

      <p
        className="
          text-center
          mt-4
          text-gray-600
        "
      >
        Please sign in
        to continue
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

                type="email"

                name="email"

                placeholder="Enter email"

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

              {/* PASSWORD */}

              <label
                className="
                  block
                  font-semibold
                  text-gray-800
                  mt-4
                "
              >
                Password
              </label>

              <Field

                type="password"

                name="password"

                placeholder="Enter password"

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

                name="password"

                component="div"

                className="
                  text-red-500
                  text-sm
                "
              />

              {/* FORGOT PASSWORD */}

              <div
                className="
                  flex
                  justify-end
                  mt-4
                "
              >

                <Link

                  to="/forgot-password"

                  className="
                    text-sm
                    font-semibold
                    hover:underline
                  "
                >

                  Forgot Password?

                </Link>

              </div>

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

                  ? "Signing In..."

                  : "Sign In"}

              </button>

              {/* SIGNUP */}

              <p
                className="
                  text-center
                  mt-4
                  text-sm
                "
              >

                Don't have
                an account?{" "}

                <Link

                  to="/signup"

                  className="
                    font-semibold
                    hover:underline
                  "
                >

                  Sign Up

                </Link>

              </p>

            </Form>

            <Footer />

          </div>
        )}

      </Formik>

    </div>
  );
}

export default Signin;