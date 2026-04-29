import React from "react";

import { Link, useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

import axios from "axios";

import Logo from "../components/Logo";

import Footer from "../components/FooterContent";

function SignUp() {

  const navigate =
    useNavigate();

  // BACKEND URL
  const API_URL =
    "https://password-reset-backend-1-e0hb.onrender.com";

  // INITIAL VALUES
  const initialValues = {

    name: "",

    email: "",

    password: "",

    confirmPassword: "",
  };

  // VALIDATION
  const validationSchema =
    Yup.object({

      name: Yup.string()

        .min(
          3,
          "Name must be at least 3 characters"
        )

        .required(
          "Name is required"
        ),

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

      confirmPassword:
        Yup.string()

          .oneOf(
            [Yup.ref("password")],
            "Passwords must match"
          )

          .required(
            "Confirm Password is required"
          ),
    });

  // SUBMIT FUNCTION
  const onSubmit = async (

    values,

    {
      setSubmitting,
      resetForm,
    }

  ) => {

    try {

      setSubmitting(true);

      // SEND DATA TO BACKEND
      const response =
        await axios.post(

          `${API_URL}/api/user`,

          {

            name:
              values.name,

            email:
              values.email
                .toLowerCase()
                .trim(),

            password:
              values.password,
          }
        );

      // SUCCESS
      alert(

        response.data.message ||

        "Signup successful"
      );

      resetForm();

      // GO TO LOGIN
      navigate("/");

    } catch (error) {

      console.log(
        "SIGNUP ERROR:",
        error.response?.data
      );

      alert(

        error.response?.data?.error ||

        "Signup failed"
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
        Create Your{" "}

        <span
          className="
            text-green-700
          "
        >
          E-Mart
        </span>{" "}

        Account

      </h1>

      <p
        className="
          text-center
          mt-4
          text-gray-600
        "
      >
        Signup to continue
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

              {/* NAME */}

              <label
                className="
                  block
                  font-semibold
                  text-gray-800
                "
              >
                Name
              </label>

              <Field

                type="text"

                name="name"

                placeholder="Enter your name"

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

                name="name"

                component="div"

                className="
                  text-red-500
                  text-sm
                "
              />

              {/* EMAIL */}

              <label
                className="
                  block
                  font-semibold
                  text-gray-800
                  mt-4
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

              {/* CONFIRM PASSWORD */}

              <label
                className="
                  block
                  font-semibold
                  text-gray-800
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
                  border-gray-300
                  w-full
                  p-2
                  rounded
                  mt-1
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

                  ? "Signing Up..."

                  : "Sign Up"}

              </button>

              <p
                className="
                  text-center
                  mt-4
                  text-sm
                "
              >

                Already have an account?{" "}

                <Link

                  to="/"

                  className="
                    font-semibold
                    hover:underline
                  "
                >
                  Sign In
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

export default SignUp;