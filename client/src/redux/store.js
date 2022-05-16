import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import CollReducer from "./features/collSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    coll: CollReducer,
  },
});
