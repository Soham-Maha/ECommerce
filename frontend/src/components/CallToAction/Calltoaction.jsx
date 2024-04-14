import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Calltoaction = () => {
  const { user } = useSelector((state) => state?.users);

  const isSub = Boolean(user?.subcriptions);
  return (
    <div className="w-full overflow-hidden font-poppins">
      <section className="pt-20 ">
        <div className="">
          <div
            className={`relative -mr-4 z-10 overflow-hidden rounded bg-blue-500 py-12 px-16`}
          >
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full px-4 lg:w-1/2">
                <span className="mb-2 text-base font-semibold text-white">
                  Stop wasting time Creating Listings
                </span>
                <h2 className="mb-6 text-3xl w-[60%] font-bold leading-tight text-white sm:mb-8 sm:text-[38px] lg:mb-0">
                  Start Finding your Winning Product Fast!
                </h2>
              </div>
              <div className="w-full px-4 lg:w-1/2">
                <div className="flex flex-wrap space-x-4 lg:justify-end">
                  {!isSub ? (
                    <Link
                      to="/pricing"
                      className={`my-1 cursor-pointer inline-block rounded bg-emerald-500 py-4 px-6 text-base font-medium text-white transition hover:bg-opacity-90 md:px-9 lg:px-6 xl:px-9`}
                    >
                      Go Pro
                    </Link>
                  ) : (
                    <Link
                      to="/premiumProducts"
                      className={`my-1 cursor-pointer inline-block rounded bg-emerald-500 py-4 px-6 text-base font-medium text-white transition hover:bg-opacity-90 md:px-9 lg:px-6 xl:px-9`}
                    >
                      To Premium Products
                    </Link>
                  )}
                  {user ? null : (
                    <Link
                      to={"/register"}
                      className={`my-1 cursor-pointer inline-block rounded bg-white py-4 px-6 text-base font-medium text-black transition hover:bg-opacity-90 md:px-9 lg:px-6 xl:px-9`}
                    >
                      Start Free Trial
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div>
              <span className="absolute top-0 left-0 z-[-1]">
                <svg
                  width={189}
                  height={162}
                  viewBox="0 0 189 162"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx={16}
                    cy="-16.5"
                    rx={173}
                    ry="178.5"
                    transform="rotate(180 16 -16.5)"
                    fill="url(#paint0_linear)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1={-157}
                      y1="-107.754"
                      x2="98.5011"
                      y2="-106.425"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" stopOpacity="0.07" />
                      <stop offset={1} stopColor="white" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="absolute bottom-0 right-0 z-[-1]">
                <svg
                  width={191}
                  height={208}
                  viewBox="0 0 191 208"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx={173}
                    cy="178.5"
                    rx={173}
                    ry="178.5"
                    fill="url(#paint0_linear)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="-3.27832e-05"
                      y1="87.2457"
                      x2="255.501"
                      y2="88.5747"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" stopOpacity="0.07" />
                      <stop offset={1} stopColor="white" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calltoaction;
