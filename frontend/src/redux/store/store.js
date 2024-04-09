import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import usersSlices from "../slices/users/usersSlices";
import productsSlices from "../slices/products/productsSlices";

const store = configureStore({
  reducer: {
    users: usersSlices,
    products: productsSlices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
