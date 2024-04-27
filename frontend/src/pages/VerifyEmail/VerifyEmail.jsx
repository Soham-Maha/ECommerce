import React,{useEffect, useState} from "react";
import {useParams,useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {verifyAccountClick} from '../../redux/slices/users/usersSlices.js'

const VerifyEmail = () => {
  const {token} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, verifyAccountClick: verifyClick} = useSelector((state)=>state?.users);

  useEffect(() => {
    dispatch(verifyAccountClick(token))
  }, [])
  
  if(verifyClick){
    navigate(`/profile/${user?._id}`);
  }

  


  return <div>VerifyEmail</div>;
};

export default VerifyEmail;
