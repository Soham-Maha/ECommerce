import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL, config } from "../../../utils/baseURL";

//redirect actions
const redirectRegister = createAction("redirect/register");
const redirectLogin = createAction("redirect/login");
const redirectLogout = createAction("redirect/logout");

export const registerUserAction = createAsyncThunk(
  "register/user",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const sendData = {
        firstName: user.name,
        lastName: user.surname,
        email: user.email,
        password: user.password,
      };
      const { data } = await axios.post(
        `${baseURL}/api/users/register`,
        sendData,
        config
      );

      //after user registers store him to local store
      localStorage.setItem("userInfo", JSON.stringify(data.createdUser));
      localStorage.setItem("token", JSON.stringify(data.token));

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
export const loginUserAction = createAsyncThunk(
  "login/user",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const userFromState = getState()?.users?.userAuth;

    try {
      const { data } = await axios.post(
        `${baseURL}/api/users/login`,
        user,
        config
      );

      //store user to the local state or browser memory
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));

      //return data to the frontend
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//logout action
export const logoutAction = createAsyncThunk(
  "logout/user",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //remove user from browser
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");

      //dispatch redirect action
      dispatch(redirectLogout());
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get all of the user details
export const userDetailsAction = createAsyncThunk(
  "user/details",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users?.userAuth;
    try {
      const { data } = await axios.get(
        `${baseURL}/api/users/userDetails`,
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data?.user));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//save a product
export const saveProductAction = createAsyncThunk(
  "save/product",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users.userAuth;

    //send back the id in proper format
    const sendId = {
      productId: payload,
    };

    try {
      const { data } = await axios.put(
        `${baseURL}/api/users/saveProduct`,
        sendId,
        config
      );

      //update the local storage and user
      localStorage.setItem("userInfo", JSON.stringify(data?.updatedUser));

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//unsave a product
export const unsaveProductAction = createAsyncThunk(
  "unsave/product",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //send back the id in proper format
    const sendId = {
      productId: payload,
    };
    try {
      const { data } = await axios.put(
        `${baseURL}/api/users/unSaveProduct`,
        sendId,
        config
      );

      //update the local storage and user
      localStorage.setItem("userInfo", JSON.stringify(data?.updatedUser));

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get subcription prices
export const subPricesAction = createAsyncThunk(
  "sub/prices",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //hit the endpoint
      const { data } = await axios.get(
        `${baseURL}/api/users/stripePrices`,
        config
      );
      //return the data
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//send email
export const sendEmailAction = createAsyncThunk(
  "send/email",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log("Working");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get user from local state and put him in the store
let userAuth;

const userInfoToStr = localStorage.getItem("userInfo");

if (userInfoToStr && userInfoToStr !== undefined) {
  try {
    userAuth = JSON.parse(userInfoToStr);
  } catch (error) {
    console.log("Failed to parse userInfor from localStorage", error);
    userAuth = null;
  }
} else {
  userAuth = null;
}

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: userAuth,
  },
  extraReducers: (builder) => {
    //register a user
    builder.addCase(redirectRegister, (state, action) => {
      state.redirectRegister = true;
    });
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
    //login a user
    builder.addCase(redirectLogin, (state, action) => {
      state.redirectLogin = true;
    });
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.redirectLogin = false;
      state.user = action?.payload?.user;
      state.serverError = undefined;
      state.appErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.serverError = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //logout a user
    builder.addCase(redirectLogout, (state, action) => {
      state.redirectLogout = true;
    });
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.loading = false;
      state.redirectLogout = false;
      state.user = null;
      state.serverError = undefined;
      state.appErr = undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.loading = false;
      state.serverError = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //get user details
    builder.addCase(userDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload?.user;
      state.userDetails = action?.payload?.user;
      state.serverError = undefined;
      state.appErr = undefined;
    });
    builder.addCase(userDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.serverError = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //save a product
    builder.addCase(saveProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(saveProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload?.updatedUser;
      state.serverError = undefined;
      state.appErr = undefined;
    });
    builder.addCase(saveProductAction.rejected, (state, action) => {
      state.loading = false;
      state.serverError = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //unsave a product
    builder.addCase(unsaveProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(unsaveProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload?.updatedUser;
      state.serverError = undefined;
      state.appErr = undefined;
    });
    builder.addCase(unsaveProductAction.rejected, (state, action) => {
      state.loading = false;
      state.serverError = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //get subcription prices and plans
    builder.addCase(subPricesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(subPricesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.subPrices = action?.payload;
      state.serverError = undefined;
      state.appErr = undefined;
    });
    builder.addCase(subPricesAction.rejected, (state, action) => {
      state.loading = false;
      state.serverError = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
    //send email
    builder.addCase(sendEmailAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendEmailAction.fulfilled, (state, action) => {
      state.loading = false;
      state.emailSend = action?.payload;
      state.serverError = undefined;
      state.appErr = undefined;
    });
    builder.addCase(sendEmailAction.rejected, (state, action) => {
      state.loading = false;
      state.serverError = action?.payload?.message;
      state.appErr = action?.payload?.message;
    });
  },
});

export default userSlice.reducer;
