import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    product: [],
  },

  reducers: {
    productsRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    productsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
        productCount: action.payload.count,
        resPerPage: action.payload.resPerPage,
      };
    },
    productsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    adminProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    adminProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    },
    adminProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

const { actions, reducer } = productSlice;

export const {
  productsRequest,
  productsSuccess,
  productsFail,
  adminProductRequest,
  adminProductSuccess,
  adminProductFail,
  clearError,
} = actions;

export default reducer;
