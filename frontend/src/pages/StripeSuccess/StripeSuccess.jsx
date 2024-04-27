import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {userDetailsAction, subStatusCtrl} from '../../redux/slices/users/usersSlices.js'

const StripeSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector((state)=>state?.users);

  const [hasFetchedUserDetails, setHasFetchedUserDetails] = useState(false);

  const customerId = {
    customerId: user?.stripe_customer_id
  };

  useEffect(() => {
    if(!user || user === null){
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if(user && !hasFetchedUserDetails){
      dispatch(subStatusCtrl(customerId)).then(()=>dispatch(userDetailsAction())).then((updatedUser)=>{
        setHasFetchedUserDetails(true);
        localStorage.setItem("userInfo", JSON.stringify(updatedUser?.payload?.user))
      }).catch((error)=>{
        console.log("Error in Dispatching actions in stripe success page", error);
      })
    }
  }, [user, hasFetchedUserDetails, dispatch, navigate, customerId])
  
  

  return (
    <div className="font-poppins w-full items-center justify-center pt-[20%] pb-[50%] bg-gray-900 h-[100%]">
      <div className="flex justify-center">
        <h1 className="block text-white text-2xl pb-10">Your Changes have been saved!</h1>
      </div>
      <div className="flex justify-center">
        <Link
          to={"/"}
          className="px-8 py-3 font-semibold rounded-full dark:bg-sky-400 dark:text-gray-900"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default StripeSuccess;

