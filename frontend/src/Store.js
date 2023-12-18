import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productReducer from "./slices/productsSlices"; // reducer as a productReducer
import singleProductReducer from "./slices/singleProductSlice"; // reducer as a singleProductReducer
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice";

const reducer = combineReducers({
  productsState: productReducer,
  singleProductState: singleProductReducer,
  authState: authReducer,
  cartState: cartReducer,
  orderState: orderReducer,
  userState: userReducer,
});

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;
