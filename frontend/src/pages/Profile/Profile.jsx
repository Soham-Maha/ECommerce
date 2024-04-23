import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { customerPortal , logoutAction, verifyAccountSend} from "../../redux/slices/users/usersSlices.js";
import {MdManageHistory, MdOutlineMarkEmailRead} from 'react-icons/md'
import {PiPasswordBold} from 'react-icons/pi'
import Cookies from 'js-cookie'
import {TbStatusChange} from 'react-icons/tb'
import moment from 'moment'

//buttons
const buttons = [
  {
    icon: <MdManageHistory className="w-6 h-6 ml-4 mr-2" />,
    options: "Manage Subscription",
    link: "/manage-subscription",
  },
  {
    icon: <TbStatusChange className="w-6 h-6 ml-4 mr-2" />,
    options: "Change Password",
    link: "/password-change",
  },
  {
    icon: <PiPasswordBold className="w-6 h-6 ml-4 mr-2" />,
    options: "Reset Password",
    link: "/password-reset",
  },
];

const Profile = () => {
  const {innerWidth: width, innerHeight: height} = window;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    user,
    customerPortalUrl: portalURL,
    userDetails,
    verificationUrl,
  } = useSelector((state) => state?.users);

  const userEmail = user?.email;

  const cookie = Cookies.get("token");

  const logoutNavigate = ()=> {
    dispatch(logoutAction());
    Cookies.remove("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    navigate("/login");
  }

  const checkSubStatus = Boolean(user?.subscriptions?.length > 0);

  const subPlanName = user?.subscriptions[0]?.plan?.nickname;

  const subPlanCost = user?.subscriptions[0]?.plan?.amount;

  const subPlanCurrency = user?.subscriptions[0]?.plan?.currency;

  const subPlanCurrencyConverted = subPlanCost ? (subPlanCost / 100).toLocaleString("en-US", {style: "currency", currency: subPlanCurrency}) : "";

  const expiresSubIn = moment(user?.subscriptions[0]?.current_period_end * 1000).format("dddd, MMMM Do YYYY, h:mm a");

  const customerId = user?.stripe_customer_id;

  if (portalURL) {
    window.location.href = portalURL;
  }

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [])
  
    return (
      <div className="font-poppins overflow-hidden h-screen">
        {width > 390 ? (
          <>
            <div className="flex justify-between">
              <div className="bg-gray-100 w-[27%] h-screen">
                <h1 className=" ml-10 mt-2 text-xl">User Profile</h1>
                <div className="bg-gray-800/30 w-[90%] h-[1px] mt-2"></div>
                <div className="flex ml-[5%] mt-[9%]">
                  <img
                    className="w-20  rounded-full cursor-pointer border-2 hover:border-green-600 border-white transition ease-in-out delay-150 duration-300 "
                    src={user?.profilePhoto}
                    alt="profilephoto"
                  />
                  <div>
                    <p className="ml-4 mt-4">
                      {user?.firstName + " " + user?.lastName}
                    </p>
                    <p className="ml-4 text-sm">{user?.email}</p>
                  </div>
                </div>
                <div className="mt-8 ">
                  <div className="block mb-4 ">
                    <div className="flex ">
                      <div className="">
                        <MdManageHistory className="w-6 h-6 ml-4 mr-2" />
                      </div>

                      <button
                        onClick={() => dispatch(customerPortal(customerId))}
                      >
                        Manage Subscriptions
                      </button>
                    </div>
                  </div>
                  <div className="block mb-4 ">
                    <div className="flex ">
                      <div className="">
                        <TbStatusChange className="w-6 h-6 ml-4 mr-2" />
                      </div>

                      <Link to="/password-change">Chnage Password</Link>
                    </div>
                  </div>
                  <div className="block mb-4 ">
                    <div className="flex ">
                      <div className="">
                        <PiPasswordBold className="w-6 h-6 ml-4 mr-2" />
                      </div>

                      <Link to="/password-reset">Recover Password</Link>
                    </div>
                  </div>
                  {!user?.isVerified ? (
                    <div className="block mb-4 ">
                      <div className="flex ">
                        <div className="">
                          <MdOutlineMarkEmailRead className="w-6 h-6 ml-4 mr-2" />
                        </div>

                        {verificationUrl ? (
                          <button className="text-green-600">
                            Verification E-Mail Send
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              dispatch(verifyAccountSend(userEmail))
                            }
                          >
                            Verify E-Mail
                          </button>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
                <button
                  onClick={() => logoutNavigate()}
                  className="px-4 py-2 bg-red-500 hover:bg-red-500/90 rounded-xl w-[40%] mt-6 ml-6 text-white "
                >
                  Logout
                </button>
              </div>
              <div className="bg-gray-100/50 w-[73%] h-12">
                <h1 className=" ml-10 mt-2 text-xl">User Details</h1>
                <div className="border rounded-xl h-[25rem] mt-12 px-10 mx-10">
                  <p className="mt-4 bg-sky-300 py-2 rounded-md px-4 w-[45%] text-center">
                    Membership Status:{" "}
                    <span className="bg-purple-100/30 rounded-md px-2 ">
                      {userDetails?.role === "Admin"
                        ? "Admin"
                        : userDetails?.role === "subscriber"
                        ? "Premium Plan"
                        : userDetails?.role === "freeuser"
                        ? "Free Plan"
                        : userDetails?.role === "influencer"
                        ? "Influencer"
                        : null}
                    </span>
                  </p>

                  {user?.isVerified ? (
                    <p className="mt-4 bg-emerald-300 py-2  rounded-md px-4 w-[40%] text-center">
                      Verified E-Mail: {user?.email}
                    </p>
                  ) : (
                    <button
                      onClick={() => dispatch(verifyAccountSend(userEmail))}
                      className="mt-4 bg-orange-300 rounded-md px-4"
                    >
                      Verify Email
                    </button>
                  )}
                  {checkSubStatus ? (
                    <div className="mt-20">
                      <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left">
                              Membership Details:
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2">
                              <span className="font-semibold antialiased">
                                Plan:{" "}
                              </span>
                              {subPlanName} {"-"} {subPlanCurrencyConverted}
                              /month
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">
                              <span className="font-semibold">
                                Pro Plan is :{" "}
                              </span>
                              <span className="border rounded-lg border-blue-400/50 px-4 py-[2px] ">
                                {" "}
                                {user?.subscriptions?.[0]?.status === "active"
                                  ? "Active "
                                  : "Expired"}{" "}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="block md:mt-[20%]">
                      <Link
                        className="hover:underline hover:text-blue-500 underline-offset-2 text-blue-400"
                        to={"/pricing"}
                      >
                        Check out Premium Plans
                      </Link>
                    </div>
                  )}
                </div>
                <p className="md:mt-6 md:ml-10 bg-red-400/90 hover:bg-red-400 py-2 rounded-md px-4 w-[25%] text-center">
                  <Link
                    className="text-white font-semobold antialiased"
                    to={"/savedProducts"}
                  >
                    To Saved Products
                  </Link>
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <div className="bg-gray-100 w-full h-[25rem]">
                <h1 className=" text-center pt-4 font-bold text-xl">
                  User Profile
                </h1>
                <div className="flex ml-[15%] mt-[9%]">
                  <img
                    className="w-20  rounded-full cursor-pointer border-2 hover:border-green-600 border-white transition ease-in-out delay-150 duration-300 "
                    src={user?.profilePhoto}
                    alt="profilephoto"
                  />
                  <div>
                    <p className="ml-4 mt-4">
                      {user?.firstName + " " + user?.lastName}
                    </p>
                    <p className="ml-4 text-sm">{user?.email}</p>
                  </div>
                </div>
                <div className="mt-8 ml-[10%]">
                  <div className="mt-8 ">
                    <div className="block mb-4 ">
                      <div className="flex ">
                        <div className="">
                          <MdManageHistory className="w-6 h-6 ml-4 mr-2" />
                        </div>

                        <button
                          onClick={() => dispatch(customerPortal(customerId))}
                        >
                          Manage Subscriptions
                        </button>
                      </div>
                    </div>
                    <div className="block mb-4 ">
                      <div className="flex ">
                        <div className="">
                          <TbStatusChange className="w-6 h-6 ml-4 mr-2" />
                        </div>

                        <Link to="/password-change">Chnage Password</Link>
                      </div>
                    </div>
                    <div className="block mb-4 ">
                      <div className="flex ">
                        <div className="">
                          <PiPasswordBold className="w-6 h-6 ml-4 mr-2" />
                        </div>

                        <Link to="/password-reset">Recover Password</Link>
                      </div>
                    </div>
                    {!user?.isVerified ? (
                      <div className="block mb-4 ">
                        <div className="flex ">
                          <div className="">
                            <MdOutlineMarkEmailRead className="w-6 h-6 ml-4 mr-2" />
                          </div>

                          {verificationUrl ? (
                            <button className="text-green-600">
                              Verification E-Mail Send
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                dispatch(verifyAccountSend(userEmail))
                              }
                            >
                              Verify E-Mail
                            </button>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <button
                    onClick={() => logoutNavigate()}
                    className="py-2 bg-red-500 hover:bg-red-500/90 rounded-xl w-[90%] mt-4 text-white "
                  >
                    Logout
                  </button>
                </div>
              </div>

              <div>
                <div className=" w-full text-center font-bold ">
                  <h1 className=" mt-6 text-xl">User Details</h1>
                  <div className="border rounded-xl h-[15rem] mt-8 px-10 mx-10">
                    <p className="mt-4 bg-sky-300 py-2 rounded-md px-4 text-center">
                      Membership Status:{" "}
                      <span className="bg-purple-100/30 rounded-md px-2 ">
                        {userDetails?.role === "Admin"
                          ? "Admin"
                          : userDetails?.role === "subscriber"
                          ? "Premium Plan"
                          : userDetails?.role === "freeuser"
                          ? "Free Plan"
                          : userDetails?.role === "influencer"
                          ? "Influencer"
                          : null}
                      </span>
                    </p>
                    <p className="mt-4 bg-red-400 py-2 rounded-md px-4 text-center">
                      <Link to={"/savedProducts"}>Saved Products</Link>
                    </p>

                    {user?.isVerified ? (
                      <p className="mt-4 bg-emerald-300 py-2  rounded-md px-4  text-center">
                        Verified E-Mail:{" "}
                        <span className="font-normal text-xs">
                          {user?.email}
                        </span>
                      </p>
                    ) : (
                      <button
                        onClick={() => dispatch(verifyAccountSend(userEmail))}
                        className="mt-4 bg-orange-300 rounded-md px-4"
                      >
                        Verify Email
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
};

export default Profile;
