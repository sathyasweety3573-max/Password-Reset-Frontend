import React from "react";
import Logo from "../components/Logo";
import Footer from "../components/FooterContent";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {

  const { token } = useParams();

  const navigate = useNavigate();

  
  // SAME BACKEND URL
  const API_URL =
    "https://password-reset-backend-1-e0hb.onrender.com";

  console.log("TOKEN FROM URL:", token);

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({

    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword")],
        "Passwords must match"
      )
      .required("Confirm password is required"),
  });

  const onSubmit = async (
    values,
    {
      setSubmitting,
      resetForm,
    }
  ) => {

    try {

      setSubmitting(true);

      console.log("TOKEN SENT:", token);

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
        response.data.message ||
        "Password reset successful!"
      );

      resetForm();

      navigate("/success");

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
        Create New Password
      </h1>

      <p
        className="
          text-center
          mt-4
          text-gray-600
        "
      >
        Enter your new password
        below to complete
        the reset process.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
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

              <label
                className="
                  block
                  font-semibold
                  text-gray-800
                  mt-4
                "
              >
                New Password
              </label>

              <Field
                className="
                  text-gray-600
                  border
                  border-gray-300
                  w-full
                  p-2
                  rounded
                  mt-1
                  bg-transparent
                  focus:outline-none
                  focus:ring-2
                  focus:ring-green-500
                "
                name="newPassword"
                type="password"
                placeholder="Enter new password"
              />

              <ErrorMessage
                name="newPassword"
                component="div"
                className="
                  text-red-500
                  text-sm
                "
              />

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
                className="
                  text-gray-600
                  border
                  border-gray-300
                  w-full
                  p-2
                  rounded
                  mt-1
                  bg-transparent
                  focus:outline-none
                  focus:ring-2
                  focus:ring-green-500
                "
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
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
                className="
                  w-full
                  bg-black
                  text-white
                  py-2
                  px-4
                  rounded
                  mt-4
                  hover:bg-gray-800
                  font-semibold
                  cursor-pointer
                "
                type="submit"
                disabled={isSubmitting}
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