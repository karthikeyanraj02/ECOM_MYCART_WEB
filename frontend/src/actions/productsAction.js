import axios from "../axios";
import {
  productsFail,
  productsRequest,
  productsSuccess,
  adminProductRequest,
  adminProductSuccess,
  adminProductFail,
} from "../slices/productsSlices";

import {
  singleProductFail,
  singleProductSucess,
  singleProductRequest,
  createReviewFail,
  createReviewRequest,
  createReviewSuccess,
  newProductCreatingRequest,
  newProductCreatingSucess,
  newProductCreatingFail,
  ProductDeletedRequest,
  ProductDeletedSucess,
  ProductDeletedFail,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
} from "../slices/singleProductSlice";

export const getProduct =
  (keyword, price, category, ratings, currentPage) => async (dispatch) => {
    try {
      dispatch(productsRequest());

      let link = `/getproduct?page=${currentPage}`;
      if (keyword) {
        link += `&keyword=${keyword}`;
      }

      if (price) {
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }

      if (category) {
        link += `&category=${category}`;
      }

      if (ratings) {
        link += `&ratings=${ratings}`;
      }

      const { data } = await axios.get(link);
      dispatch(productsSuccess(data));
    } catch (error) {
      //handle error
      dispatch(productsFail(error.response.data.message));
    }
  };

//----------------------------------------------------

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch(singleProductRequest());
    const response = await axios.get(`/singleProduct/${id}`);
    if (response.data) {
      dispatch(singleProductSucess(response.data));
    } else {
      // Handle the case where the response doesn't contain data
      dispatch(singleProductFail("No product data found"));
    }
  } catch (error) {
    dispatch(singleProductFail(error.response.data.message));
  }
};

export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(createReviewRequest());
    const config = {
      headers: {
        "Content-type": "appliction/json",
      },
    };
    const { data } = await axios.put("/review", reviewData, config);
    dispatch(createReviewSuccess(data));
  } catch (error) {
    dispatch(createReviewFail(error.response.data.message));
  }
};

// admin actions

export const adminGetProduct = async (dispatch) => {
  try {
    dispatch(adminProductRequest());
    const { data } = await axios.get("/admin/products");
    dispatch(adminProductSuccess(data));
  } catch (error) {
    dispatch(adminProductFail(error.response.data.message));
  }
};

// productdata is a argument im go to send some information so i provide argu
export const newProductCreate = (productData) => async (dispatch) => {
  try {
    dispatch(newProductCreatingRequest());
    const { data } = await axios.post("/admin/newproduct", productData);

    dispatch(newProductCreatingSucess(data));
  } catch (error) {
    dispatch(newProductCreatingFail(error.response.data.message));
  }
};

export const productDeleted = (id) => async (dispatch) => {
  try {
    dispatch(ProductDeletedRequest());
    await axios.delete(`/admin/deleteproduct/${id}`);
    dispatch(ProductDeletedSucess());
  } catch (error) {
    dispatch(ProductDeletedFail(error.response.data.message));
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());
    const { data } = await axios.put(`/admin/updateProduct/${id}`, productData);
    dispatch(updateProductSuccess(data));
  } catch (error) {
    dispatch(updateProductFail(error.response.data.message));
  }
};
