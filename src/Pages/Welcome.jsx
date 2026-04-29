import React from "react";

import Logo from "../components/Logo";

import Footer from "../components/FooterContent";

function WelcomeBlog() {

  return (

    <section
      className="
        w-full
        bg-white
        min-h-screen
      "
    >

      {/* HEADER */}

      <header
        className="
          max-w-4xl
          mx-auto
          border-b
          border-gray-200
          flex
          items-center
          gap-3
          px-4
        "
      >

        <div className="py-4">

          <Logo />

        </div>

        <span
          className="
            text-xl
            font-bold
            text-gray-800
          "
        >

          E-Mart

        </span>

      </header>

      {/* MAIN */}

      <main
        className="
          max-w-4xl
          mx-auto
          px-6
          py-10
        "
      >

        {/* TITLE */}

        <h1
          className="
            text-4xl
            font-bold
            text-gray-900
            leading-tight
          "
        >

          Welcome To E-Mart

        </h1>

        {/* SUBTITLE */}

        <p
          className="
            mt-4
            text-lg
            text-gray-600
          "
        >

          Your trusted online shopping destination
          for premium products and secure shopping.

        </p>

        {/* CONTENT */}

        <div
          className="
            mt-10
            space-y-6
            text-gray-700
            leading-relaxed
          "
        >

          <p>

            <strong>
              E-Mart
            </strong>

            {" "}
            provides a modern and secure
            shopping experience built using
            the latest web technologies.

          </p>

          <p>

            Customers can explore products,
            create accounts, securely login,
            and reset passwords easily using
            our password recovery system.

          </p>

          <p>

            The platform is fully responsive
            and works smoothly across desktop,
            tablet, and mobile devices.

          </p>

          <p>

            Security and user experience are
            our top priorities. All passwords
            are encrypted and protected.

          </p>

        </div>

        {/* FEATURES */}

        <section
          className="
            mt-12
            bg-gray-50
            border
            border-gray-200
            rounded-xl
            p-6
          "
        >

          <h2
            className="
              text-2xl
              font-semibold
              mb-4
            "
          >

            Features

          </h2>

          <ul
            className="
              space-y-3
              text-gray-700
            "
          >

            <li>
              ✔ User Signup & Login
            </li>

            <li>
              ✔ Forgot Password System
            </li>

            <li>
              ✔ Secure Password Reset
            </li>

            <li>
              ✔ Responsive UI Design
            </li>

            <li>
              ✔ Fast & Secure Backend
            </li>

          </ul>

        </section>

        {/* STATS */}

        <section
          className="
            mt-12
            grid
            grid-cols-2
            md:grid-cols-4
            gap-6
            text-center
          "
        >

          <div>

            <h3
              className="
                text-2xl
                font-bold
              "
            >

              10K+

            </h3>

            <p
              className="
                text-gray-500
                mt-2
              "
            >

              Users

            </p>

          </div>

          <div>

            <h3
              className="
                text-2xl
                font-bold
              "
            >

              500+

            </h3>

            <p
              className="
                text-gray-500
                mt-2
              "
            >

              Products

            </p>

          </div>

          <div>

            <h3
              className="
                text-2xl
                font-bold
              "
            >

              24/7

            </h3>

            <p
              className="
                text-gray-500
                mt-2
              "
            >

              Support

            </p>

          </div>

          <div>

            <h3
              className="
                text-2xl
                font-bold
              "
            >

              100%

            </h3>

            <p
              className="
                text-gray-500
                mt-2
              "
            >

              Secure

            </p>

          </div>

        </section>

        {/* FOOTER */}

        <div className="mt-12">

          <Footer />

        </div>

      </main>

    </section>

  );

}

export default WelcomeBlog;