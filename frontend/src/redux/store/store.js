import { configureStore , getDefaultMiddleware} from "@reduxjs/toolkit";
import usersSlices from "../slices/users/usersSlices";


const store = configureStore({
  reducer: {
    users: usersSlices,
    products: "Product reducers",
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;