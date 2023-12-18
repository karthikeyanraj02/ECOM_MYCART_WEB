import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    loading: false,
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },

  reducers: {
    addCartItemRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    addCartItemSuccess(state, action) {
      const item = action.payload;

      const isItemExit = state.items.find((i) => i.product == item.product); // to find alread added in caart

      if (isItemExit) {
        state = {
          ...state,
          loading: false,
        };
      } else {
        state = {
          items: [...state.items, item],
          loading: false,
        };
        localStorage.setItem("cartItems", JSON.stringify(state.items)); // adding new cart items
      }
      return state;
    },
    increaseCartItem(state, action) {
      state.items = state.items.map((item) => {
        if (item.product == action.payload) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // adding new cart items
    },
    decreaseCartItem(state, action) {
      state.items = state.items.map((item) => {
        if (item.product == action.payload) {
          item.quantity = item.quantity - 1;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // adding new cart items
    },

    removeItemsInCart(state, action) {
      const filterItem = state.items.filter((item) => {
        return item.product !== action.payload;
      });
      localStorage.setItem("cartItems", JSON.stringify(filterItem)); //  deleting   cart items
      return {
        ...state,
        items: filterItem,
      };
    },
    saveShippingInfo(state, action) {
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
      return {
        ...state,
        shippingInfo: action.payload,
      };
    },
    orderCompleted(state, action) {
      //  once compledete it will work
      localStorage.removeItem("shippingInfo");
      localStorage.removeItem("cartItems");
      sessionStorage.removeItem("orderInfo");
      return {
        items: [],
        loading: false,
        shippingInfo: {},
      };
    },
  },
});

const { actions, reducer } = cartSlice;

export const {
  addCartItemRequest,
  addCartItemSuccess,
  increaseCartItem,
  decreaseCartItem,
  removeItemsInCart,
  saveShippingInfo,
  orderCompleted,
} = actions;

export default reducer;
