import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL, config } from "../../../utils/baseURL";

//redirect actions
const redirectRegister = createAction("redirect/register")

export const registerUserAction = createAsyncThunk(
  "register/user",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const sendData = {
        firstName:user.name,
        lastName:user.surname,
        email:user.email,
        password:user.password
      }
      const {data} = await axios.post(`${baseURL}/api/users/register`, sendData, config);

      //after user registers store him to local store
      localStorage.setItem("userInfo",JSON.stringify(data.createdUser));
      localStorage.setItem("token",JSON.stringify(data.token));

      return data;

    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//login user action


//get user from local state and put him in the store 
let userAuth;

const userInfoToStr = localStorage.getItem("userInfo");

if(userInfoToStr && userInfoToStr !==undefined) {
  try {
    userAuth = JSON.parse(userInfoToStr)
  } catch (error) {
    console.log("Failed to parse userInfor from localStorage",error);
    userAuth= null;
  }
}else{
  userAuth = null
}

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: userAuth,
  },
  extraReducers: (builder) => {
    builder.addCase(redirectRegister,(state,action)=>{
      state.redirectRegister = true; 
    })
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.redirectRegister = false; 
      state.user = action?.payload?.createdUser;
      state.serverError = undefined;
      state.appErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.serverError = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
  },
});

export default userSlice.reducer;