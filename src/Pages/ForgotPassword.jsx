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

import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema =
    Yup.object({

      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

    });

  const onSubmit = async (
    values,
    { setSubmitting }
  ) => {

    try {

      setSubmitting(true);

      console.log(
        "SENDING REQUEST"
      );

      const response =
        await axios.post(

          "https://password-reset-backend-1-e0hb.onrender.com/api/auth/forgot-password",

          {
            email: values.email,
          }

        );

      console.log(
        response.data
      );

      alert(
        "Reset email sent successfully"
      );

      navigate(
        "/check-email"
      );

    } catch (error) {

      console.log(
        "FULL ERROR",
        error
      );

      console.log(
        "ERROR RESPONSE",
        error.response
      );

      alert(

        error.response?.data?.error ||

        "Failed to send reset email"

      );

    } finally {

      setSubmitting(false);

    }

  };

  return (

    <div className="max-w-4xl mx-auto p-8 min-h-screen">

      <Logo />

      <h1 className="text-3xl font-bold text-center">
        Forgot Password
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >

        {({ isSubmitting }) => (

          <div className="mt-2 max-w-xl mx-auto bg-white p-4">

            <Form>

              <label>
                Email
              </label>

              <Field
                type="email"
                name="email"
                className="border w-full p-2 mt-1"
              />

              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white p-2 mt-4"
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