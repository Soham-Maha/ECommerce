import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StripeCancel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector((state)=>state?.users);

  useEffect(() => {
    if(!user || user === null){
      navigate("/login")
    }else{
      navigate("/")
    }
  }, [])
  

  return <div></div>;
};

export default StripeCancel;
