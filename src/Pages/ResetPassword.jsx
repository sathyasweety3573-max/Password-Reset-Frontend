import React from "react";

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

  const initialValues = {

    newPassword: "",

    confirmPassword: "",
  };

  const validationSchema =
    Yup.object({

      newPassword:
        Yup.string()
          .min(
            6,
            "Minimum 6 characters"
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

  const onSubmit = async (
    values,
    {
      setSubmitting,
      resetForm,
    }
  ) => {

    try {

      setSubmitting(true);

      const response =
        await axios.post(

          `https://password-reset-backend-1-e0hb.onrender.com/api/auth/reset-password/${token}`,

          {

            newPassword:
              values.newPassword,

            confirmPassword:
              values.confirmPassword,

          }

        );

      alert(
        response.data.message
      );

      resetForm();

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data?.error ||

        "Password reset failed"

      );

    } finally {

      setSubmitting(false);

    }

  };

  return (

    <div className="max-w-4xl mx-auto p-8 min-h-screen">

      <Logo />

      <h1 className="text-3xl font-bold text-center">
        Reset Password
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >

        {({
          isSubmitting,
        }) => (

          <div className="mt-2 max-w-xl mx-auto bg-white p-4">

            <Form>

              <label className="block font-semibold mt-4">
                New Password
              </label>

              <Field
                type="password"
                name="newPassword"
                className="border w-full p-2 mt-1"
              />

              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500"
              />

              <label className="block font-semibold mt-4">
                Confirm Password
              </label>

              <Field
                type="password"
                name="confirmPassword"
                className="border w-full p-2 mt-1"
              />

              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white p-2 mt-4"
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