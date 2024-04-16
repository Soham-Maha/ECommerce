import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "../../redux/slices/users/usersSlices.js";

//schema
const formSchema = Yup.object({
  recipientEmail: Yup.string().required("Recipient Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { redirectEmail } = useSelector((state) => state?.users);

  //formik
  const formik = useFormik({
    initialValues: {
      recipientEmail: "",
      subject: "",
      message: "",
    },
    onSubmit: (values) => {
      dispatch(sendEmail(values));
    },
    validationSchema: formSchema,
  });

  if (redirectEmail) {
    navigate("/");
    navigate(0);
  }

  return (
    <div className="w-full overflow-hidden font-poppins ">
      <section className="py-6 dark:bg-gray-800 dark:text-gray-50 h-screen pt-96">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <h1 className="text-4xl font-bold">Get in touch</h1>
            <p className="pt-2 pb-4">
              If you have any questions or wana know more about our services
              please send us an E-Mail on the shown E-Mail below or use the form
              on the right, Thank you. SGP Ecommerce Support Team.
            </p>
            <div className="space-y-4">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Based: Luzern , Switzerland</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>Support E-Mail: sohammaha15@gmail.com</span>
              </p>
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            novalidate=""
            className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
          >
            <label className="block">
              <span className="mb-1">Subject</span>
              <input
                value={formik.values.subject}
                onChange={formik.handleChange("subject")}
                onBlur={formik.handleBlur("subject")}
                type="text"
                placeholder="Subject"
                className="border border-md border-gray-100 py-2 px-4 mt-2 block w-full rounded-md shadow-sm dark:bg-gray-800"
              />
            </label>
            <label className="block">
              <span className="mb-1">Your E-Mail</span>
              <input
                value={formik.values.recipientEmail}
                onChange={formik.handleChange("recipientEmail")}
                onBlur={formik.handleBlur("recipientEmail")}
                type="email"
                placeholder="leroy@jenkins.com"
                className="border border-md border-gray-100 py-2 px-4 mt-2 block w-full rounded-md shadow-sm dark:bg-gray-800"
              />
            </label>
            <label className="block">
              <span className="mb-1">Message</span>
              <textarea
                value={formik.values.message}
                onChange={formik.handleChange("message")}
                onBlur={formik.handleBlur("message")}
                rows="3"
                className="border border-md border-gray-100 py-2 px-4 mt-2 block w-full rounded-md dark:bg-gray-800"
              ></textarea>
            </label>
            <button
              type="submit"
              className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ri dark:bg-sky-400 dark:text-gray-900 focus:ri hover:ri"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
