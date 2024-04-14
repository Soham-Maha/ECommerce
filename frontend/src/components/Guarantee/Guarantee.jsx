import React from "react";
import { Link } from "react-router-dom";
import i1 from "../../images/Guarantee/g11.png";

const Guarantee = ({ User }) => {
  return (
    <div>
      <section className="bg-gradient-to-r -mt-20 sm:-mt-0 from-sky-950 to-blue-700 dark:bg-gray-700 dark:text-gray-100">
        <div className="container flex flex-col mx-auto lg:flex-row">
          <div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-10 h-10 mb-6 dark:text-sky-400"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <h2 className="text-3xl font-semibold leadi">
              We Guarantee Quality Images and Creatives!
            </h2>
            <p className="mt-4 mb-8 text-sm">
              We Guarantee High-Resolution Images for you to download and put
              into your store as well as High-Quality Creatives to give your ADS
              a Scroll Stopping Effect Capture the attention of your Potential
              Costumers and Convince them to take Action!
            </p>
            <Link
              to={User ? "/premiumProducts" : "/register"}
              className="self-start px-10 py-3 text-lg font-medium rounded-3xl dark:bg-sky-400 dark:text-gray-900"
            >
              {User ? "Premium Product's" : "Register Free"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guarantee;
