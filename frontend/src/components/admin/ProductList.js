import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminGetProduct, productDeleted } from "../../actions/productsAction";
import { clearError } from "../../slices/productsSlices";
import Loder from "../layouts/Loder";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import SideBar from "./SideBar";
import { clearProductDeleted } from "../../slices/singleProductSlice";

export default function ProductList() {
  const {
    product = [],
    loading = true,
    error,
  } = useSelector((state) => state.productsState);
  const { isProductDeleted, error: productError } = useSelector(
    (state) => state.singleProductState
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    product.forEach((products) => {
      data.rows.push({
        id: products._id,
        name: products.name,
        price: `$${products.price}`,
        stock: products.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${products._id}`}
              className="btn btn-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={(e) => deleteHandler(e, products._id)}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(productDeleted(id));
  };

  useEffect(() => {
    if (error || productError) {
      toast(error || productError, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isProductDeleted) {
      toast("Product Deleted Succesfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearProductDeleted()),
      });
      return;
    }
    dispatch(adminGetProduct);
  }, [dispatch, error, isProductDeleted]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <SideBar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Product List</h1>
        <Fragment>
          {loading ? (
            <Loder />
          ) : (
            <MDBDataTable
              data={setProducts()}
              bordered
              striped
              hover
              className="px-3"
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
