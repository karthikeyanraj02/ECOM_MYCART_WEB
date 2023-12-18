import axios from ".././axios";
import {
  adminOrderFail,
  adminOrderRequest,
  adminOrderSuccess,
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  orderDetailFail,
  orderDetailRequest,
  orderDetailSuccess,
  updateOrderFail,
  updateOrderRequest,
  updatedOrderSuccess,
  userOrderFail,
  userOrderRequest,
  userOrderSuccess,
} from "../slices/orderSlice";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const { data } = await axios.post("/order/new", order);

    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFail(error.response.error.message));
  }
};

export const userOrder = async (dispatch) => {
  try {
    dispatch(userOrderRequest());
    const { data } = await axios.get("/myorders");
    dispatch(userOrderSuccess(data));
  } catch (error) {
    dispatch(userOrderFail(error.response.error.message));
  }
};

export const orderDetail = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailRequest());
    const { data } = await axios.get(`/order/${id}`);

    dispatch(orderDetailSuccess(data));
  } catch (error) {
    dispatch(orderDetailFail(error.response.error.message));
  }
};

export const adminOrder = async (dispatch) => {
  try {
    dispatch(adminOrderRequest());
    const { data } = await axios.get("/allorders/admin");
    dispatch(adminOrderSuccess(data));
  } catch (error) {
    dispatch(adminOrderFail(error.response.error.message));
  }
};

export const adminDeleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());
    const { data } = await axios.delete(`/order/admin/${id}`);
    dispatch(deleteOrderSuccess(data));
  } catch (error) {
    dispatch(deleteOrderFail(error.response.error.message));
  }
};

export const adminUpdateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());
    const { data } = await axios.put(`/order/admin/${id}`, orderData);
    dispatch(updatedOrderSuccess(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "An error occurred";
    dispatch(updateOrderFail(errorMessage));
  }
};
