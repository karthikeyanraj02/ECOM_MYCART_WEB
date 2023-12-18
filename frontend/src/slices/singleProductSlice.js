import { createSlice } from "@reduxjs/toolkit";

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: {
    loading: false,
    product: {},
    isReviewSubmitted: false,
    isProductCreated: false,
    isProductDeleted: false,
    isProductUpdated: false,
  },

  reducers: {
    singleProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },

    singleProductSucess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    },
    singleProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    createReviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    createReviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isReviewSubmitted: true,
      };
    },
    createReviewFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    clearReviewSubmitted(state, action) {
      return {
        ...state,
        isReviewSubmitted: false,
      };
    },

    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    clearProduct(state, action) {
      return {
        ...state,
        product: {},
      };
    },
    newProductCreatingRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },

    newProductCreatingSucess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
        isProductCreated: true,
      };
    },
    newProductCreatingFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isProductCreated: false,
      };
    },
    clearProductCreating(state, action) {
      return {
        ...state,
        isProductCreated: false,
      };
    },
    ProductDeletedRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },

    ProductDeletedSucess(state, action) {
      return {
        ...state,
        loading: false,

        isProductDeleted: true,
      };
    },
    ProductDeletedFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearProductDeleted(state, action) {
      return {
        ...state,
        isProductDeleted: false,
      };
    },
    updateProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
        isProductUpdated: true,
      };
    },
    updateProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearProductUpdated(state, action) {
      return {
        ...state,
        isProductUpdated: false,
      };
    },
  },
});

const { actions, reducer } = singleProductSlice;

export const {
  singleProductRequest,
  singleProductSucess,
  singleProductFail,
  createReviewRequest,
  createReviewSuccess,
  createReviewFail,
  clearReviewSubmitted,
  clearError,
  clearProduct,
  newProductCreatingRequest,
  newProductCreatingSucess,
  newProductCreatingFail,
  clearProductCreating,
  ProductDeletedRequest,
  ProductDeletedSucess,
  ProductDeletedFail,
  clearProductDeleted,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  clearProductUpdated,
} = actions;

export default reducer;
