import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetail: {},
    userOrders: [],
    adminOrders: [],
    isOrderDeleted: false,
    isOrderUpdated: false,
    loading: false,
  },
  reducers: {
    createOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    createOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orderDetail: action.payload.orders,
      };
    },
    createOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearOrderError(action, state) {
      return {
        ...state,
        error: null,
      };
    },
    userOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    userOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        userOrders: action.payload.orders,
      };
    },
    userOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    orderDetailRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    orderDetailSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orderDetail: action.payload.order,
      };
    },
    orderDetailFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    adminOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    adminOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        adminOrders: action.payload.orders,
      };
    },
    adminOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isOrderDeleted: true,
      };
    },
    deleteOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updatedOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isOrderUpdated: true,
      };
    },
    updateOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearOrderDeleted(state, action) {
      return {
        ...state,
        isOrderDeleted: false,
      };
    },
    clearOrderUpdated(state, action) {
      return {
        ...state,
        isOrderUpdated: false,
      };
    },
  },
});

const { actions, reducer } = orderSlice;

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  userOrderRequest,
  userOrderSuccess,
  userOrderFail,
  clearOrderError,
  orderDetailRequest,
  orderDetailSuccess,
  orderDetailFail,
  adminOrderRequest,
  adminOrderSuccess,
  adminOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFail,
  updateOrderRequest,
  updatedOrderSuccess,
  updateOrderFail,
  clearOrderDeleted,
  clearOrderUpdated,
} = actions;

export default reducer;
