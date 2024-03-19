import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  logoutAction,
  userDetailsAction,
} from "../../redux/slices/users/usersSlices";
import Cookies from "js-cookie";

const Homepage = () => {
  //configure dispatch and navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get the store data
  const storeData = useSelector((state) => state?.users);
  const { loading, appErr, serverErr, redirectLogout, user } = storeData;

  // if (redirectLogout) {
  //   navigate("/login");
  // }

  //logout function
  const logoutNavigate = () => {
    dispatch(logoutAction());
    Cookies.remove("token");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <h1 className="text-2xl text-yellow-500 font font-poppins">Homepage</h1>
      {user ? (
        <>
          {" "}
          <button
            onClick={() => logoutNavigate()}
            className="rounded py-2 bg-red-500 px-4 font-poppins text-white"
          >
            logout
          </button>
        </>
      ) : (
        <Link
          to={"/login"}
          className="rounded py-2 bg-blue-500 px-4 font-poppins text-white"
        >
          Login
        </Link>
      )}
      <button
        onClick={() => dispatch(userDetailsAction())}
        className="rounded py-2 mx-2 bg-emerald-500 px-4 font-poppins text-white"
      >
        Get details
      </button>
    </div>
  );
};

export default Homepage;
