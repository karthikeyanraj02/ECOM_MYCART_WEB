import "./App.css";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import SearchProduct from "./components/product/SearchProduct";
import ProductDetail from "./components/product/ProductDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import store from "./Store";
import { loadUser } from "./actions/userActions";
import { useEffect, useState } from "react";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import Payment from "./components/cart/Payment";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "./axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess";
import UserOrder from "./components/orders/UserOrder";
import OrderDetail from "./components/orders/OrderDetail";
import DashBoard from "./components/admin/DashBoard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import OrderUpdate from "./components/admin/OrderUpdate";
import UserList from "./components/admin/UserList";
import UserUpdate from "./components/admin/UserUpdate";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser);

    async function getStripeKey() {
      const { data } = await axios.get("/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeKey();
  }, []);

  return (
    <Router>
      <div>
        <HelmetProvider>
          <Header />
          <ToastContainer theme="dark" />
          <div className="container container-fluid">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:keyword" element={<SearchProduct />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/updateprofile" element={<UpdateProfile />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myorders"
                element={
                  <ProtectedRoute>
                    <UserOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/success"
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />
                    </Elements>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/confirm"
                element={
                  <ProtectedRoute>
                    <ConfirmOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route
                path="/updatepassword"
                element={
                  <ProtectedRoute>
                    <UpdatePassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myprofile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>

          {/* Admin routes ------------------------------------------*/}

          <Routes>
            <Route
              path="admin/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  <DashBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/products"
              element={
                <ProtectedRoute isAdmin={true}>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/create"
              element={
                <ProtectedRoute isAdmin={true}>
                  <NewProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/product/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute isAdmin={true}>
                  <OrderList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/order/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <OrderUpdate />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/user/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UserUpdate />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
