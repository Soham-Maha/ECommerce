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
      formData.append("description", payload?.description);
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
      formData.append("popullarity", payload?.popullarity);
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

//fetch all data
export const fetchAllProducts = createAsyncThunk(
  "fetchAll/products",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/products/fetchAllProducts`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all free products
export const fetchFreeProd = createAsyncThunk(
  "fetchFree/products",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/products/fetchFreeProducts`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all paid products
export const fetchPaidProd = createAsyncThunk(
  "fetchPaid/products",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/products/fetchPaidProducts`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch tiktok products
export const fetchTiktok = createAsyncThunk(
  "products/tiktok",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/products/fetchTiktokProducts`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch facebook products
export const fetchFacebook = createAsyncThunk(
  "products/facebook",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/products/fetchFacebookProducts`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch google
export const fetchGoogle = createAsyncThunk(
  "products/google",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/products/fetchGoogleProducts`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch single product
export const fetchSingleProd = createAsyncThunk(
  "fetchSingle/product",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/products/fetchSingleProduct/${payload}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch single free product
export const singleProdFree = createAsyncThunk(
  "single/free",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/products/fetchSingleProductFree/${payload}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update product
export const updateProduct = createAsyncThunk(
  "update/product",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const id = payload?.id;
    const sendData = {
      title: payload?.title,
      description: payload?.description,
      description2: payload?.description2,
      description3: payload?.description3,
      competitivness: payload?.competitivness,
      descriptionHero: payload?.descriptionHero,
      adCopyFb1: payload?.adCopyFb1,
      adCopyFb2: payload?.adCopyFb2,
      adCopy1: payload?.adCopy1,
      adCopy2: payload?.adCopy2,
      adCopy3: payload?.adCopy3,
      creative1: payload?.creative1,
      creative2: payload?.creative2,
      free: payload?.free,
      priceOfGoods: payload?.priceOfGoods,
      sellPrice: payload?.sellPrice,
      competitorShop: payload?.competitorShop,
      productAge: payload?.productAge,
      ppopularity: payload?.ppopularity,
    };
    try {
      const { data } = await axios.put(
        `${baseURL}/api/products/updateProduct/${id}`,
        sendData,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//delete single product
export const deleteSingleProd = createAsyncThunk(
  "deleteSingle/product",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const id = payload?.id;
    try {
      const { data } = await axios.delete(
        `${baseURL}/api/products/deleteProduct/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//delete all product
export const deleteAllProd = createAsyncThunk(
  "deleteAll/product",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const {data} = await axios.delete(`${baseURL}/api/products/deleteAllProducts`,config)
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
    //fetch all products
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.allProductsGot = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
      state.loading = false;
    });
    //fetch free products
    builder.addCase(fetchFreeProd.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchFreeProd.fulfilled, (state, action) => {
      state.loading = false;
      state.allFreeProductsGot = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(fetchFreeProd.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
      state.loading = false;
    });
    //fetch paid products
    builder.addCase(fetchPaidProd.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPaidProd.fulfilled, (state, action) => {
      state.loading = false;
      state.allPaidProductsGot = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(fetchPaidProd.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
      state.loading = false;
    });
    //fetch tiktok products
    builder.addCase(fetchTiktok.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTiktok.fulfilled, (state, action) => {
      state.loading = false;
      state.tiktokProducts = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(fetchTiktok.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
      state.loading = false;
    });
    //fetch facebook products
    builder.addCase(fetchFacebook.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchFacebook.fulfilled, (state, action) => {
      state.loading = false;
      state.facebookProducts = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(fetchFacebook.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
      state.loading = false;
    });
    //fetch google products
    builder.addCase(fetchGoogle.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.googleProducts = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(fetchGoogle.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
      state.loading = false;
    });
    //fetch single products
    builder.addCase(fetchSingleProd.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleProd.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProduct = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(fetchSingleProd.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
      state.loading = false;
    });
    //fetch single free products
    builder.addCase(singleProdFree.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(singleProdFree.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProductFree = action?.payload[0];
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(singleProdFree.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
      state.loading = false;
    });
    //update product
    builder.addCase(updateProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.updateProduct = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
      state.loading = false;
    });
    //delete single product
    builder.addCase(deleteSingleProd.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteSingleProd.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteSingleProduct = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(deleteSingleProd.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
      state.loading = false;
    });
    //delete all product
    builder.addCase(deleteAllProd.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteAllProd.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteAllProd = action?.payload;
      state.serverErr = undefined;
      state.appErr = undefined;
    });
    builder.addCase(deleteAllProd.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
      state.loading = false;
    });
  },
});

export default productSlice.reducer;
