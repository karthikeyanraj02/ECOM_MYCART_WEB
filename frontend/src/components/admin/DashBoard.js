import { useEffect } from "react";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminGetProduct } from "../../actions/productsAction";
import { getUsers } from "../../actions/userActions";
import { adminOrder as adminOrderAction } from "../../actions/orderAction";

export default function DashBoard() {
  const dispatch = useDispatch();
  const { product = [] } = useSelector((state) => state.productsState);
  const { adminOrders } = useSelector((state) => state.orderState);
  const { users = [] } = useSelector((state) => state.userState);
  let outOfStock = 0;

  if (product.length > 0) {
    product.forEach((products) => {
      if (products.stock === 0) {
        outOfStock = outOfStock + 1;
      }
    });
  }

  let totalAmount = 0;
  if (adminOrders.length > 0) {
    adminOrders.forEach((order) => {
      totalAmount = totalAmount + order.totalPrice;
    });
  }

  useEffect(() => {
    dispatch(adminGetProduct);
    dispatch(getUsers);
    dispatch(adminOrderAction);
  }, [dispatch, getUsers, adminOrderAction]);
  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <SideBar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Dashboard</h1>
        <div className="row pr-4">
          <div className="col-xl-12 col-sm-12 mb-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Total Amount
                  <br /> <b>${totalAmount}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pr-4">
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-success o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Products
                  <br /> <b>{product.length} </b>
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1"
                to="/admin/products"
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-danger o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Orders
                  <br /> <b>{adminOrders.length} </b>
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1"
                to="/admin/orders"
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-info o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Users
                  <br /> <b>{users.length} </b>
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1"
                to="/admin/users"
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-warning o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Out of Stock
                  <br /> <b>{outOfStock}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
