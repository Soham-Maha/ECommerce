import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const Homepage = () => {
  //configure dispatch and navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get the store data
  const storeData = useSelector((state) => state?.users);
  const { loading, appErr, serverErr, user } = storeData;

  return (
    <div>
      <h1>Homepage</h1>
    </div>
  );
};

export default Homepage;
