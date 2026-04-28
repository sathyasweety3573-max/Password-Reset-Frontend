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

  // USE CORRECT BACKEND URL
  const API_URL =
    "https://password-reset-backend-1-e0hb.onrender.com";

  // initial values
  const initialValues = {

    email: "",
  };

  // validation schema
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

  // form submit
  const onSubmit = async (

    values,

    {
      setSubmitting,
      resetForm,
    }

  ) => {

    try {

      console.log(
        "FORM VALUES:",
        values
      );

      // loading start
      setSubmitting(true);

      // api call
      const response =
        await axios.post(

          `${API_URL}/api/auth/forgot-password`,

          values
        );

      console.log(
        "FORGOT PASSWORD RESPONSE:",
        response.data
      );

      // get token
      const token =
        response.data.token;

      console.log(
        "TOKEN:",
        token
      );

      // check token
      if (!token) {

        alert(
          "Token not received from backend"
        );

        return;
      }

      // reset link
      const resetLink =
        `https://e-mart-web.netlify.app/reset-password/${token}`;

      console.log(
        "RESET LINK:",
        resetLink
      );

      // open reset page
      window.location.href =
        resetLink;

      // reset form
      resetForm();

    } catch (error) {

      console.log(
        "FORGOT PASSWORD ERROR:",
        error.response?.data
      );

      // error alert
      alert(

        error.response?.data?.error ||

        error.response?.data?.message ||

        "Failed to send reset email. Please try again."
      );

    } finally {

      // loading stop
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
        No worries!

        Enter your email
        address below and
        we will send you a
        link to reset your
        password.
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

                name="email"

                type="email"

                placeholder="
                  Enter your email
                  address
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
                  px-4
                  rounded
                  mt-4
                  hover:bg-gray-800
                  font-semibold
                  cursor-pointer
                "
              >

                {isSubmitting

                  ? "Submitting..."

                  : "Submit"}

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