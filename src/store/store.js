import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data-slice";

export default configureStore({
  reducer: { data: dataReducer },
});
