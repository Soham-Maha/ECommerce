import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL, config } from "../../../utils/baseURL";

const redirectCreate = createAction("create/redirect");

const configCreate = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

//create a product
export const createProduct = createAsyncThunk(
  "create/product",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("category", payload?.category);
      formData.append("description1", payload?.description1);
      formData.append("description2", payload?.description2);
      formData.append("description3", payload?.description3);
      formData.append("addcopyFb1", payload?.addcopyFb1);
      formData.append("addcopyFb2", payload?.addcopyFb2);
      formData.append("addcopy1", payload?.addcopy1);
      formData.append("addcopy2", payload?.addcopy2);
      formData.append("addcopy3", payload?.addcopy3);
      formData.append("creative1", payload?.creative1);
      formData.append("creative2", payload?.creative2);
      formData.append("priceOfGoods", payload?.priceOfGoods);
      formData.append("sellPrice", payload?.sellPrice);
      formData.append("aliexpressLink", payload?.aliexpressLink);
      formData.append("cjdropshippingLink", payload?.cjdropshippingLink);
      formData.append("competitorShop", payload?.competitorShop);
      formData.append("ppopularity", payload?.ppopularity);
      formData.append("competitivness", payload?.competitivness);
      formData.append("bestPlatform", payload?.bestPlatform);
      formData.append("descriptionHero", payload?.descriptionHero);
      formData.append("keywords", payload?.keywords);
      formData.append("user", payload?.user);
      formData.append("images", payload?.image1);
      formData.append("images", payload?.image2);
      formData.append("images", payload?.image3);
      formData.append("images", payload?.image4);
      formData.append("images", payload?.image5);
      formData.append("images", payload?.image6);
      formData.append("images", payload?.image7);
      formData.append("images", payload?.image8);
      formData.append("images", payload?.image9);
      formData.append("images", payload?.image10);
      formData.append("free", payload?.free);

      const { data } = await axios.post(
        `${baseURL}/api/products/createProduct`,
        formData,
        configCreate
      );

      dispatch(redirectCreate());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//initialize slice
const productSlice = createSlice({
  name: "products",
  initialState: {},
  extraReducers: (builder) => {
    //create product
    builder.addCase(redirectCreate, (state, action) => {
      state.createRedirect = true;
    });
    builder.addCase(createProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.createRedirect = false;
      state.createdProduct = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
      state.loading = false;
    });
  },
});

export default productSlice.reducer;
