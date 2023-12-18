import React, { useState } from "react";

import { createReview, getSingleProduct } from "../../actions/productsAction";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../layouts/Loder";
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { loading, product } = useSelector((state) => state.singleProductState);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [id, dispatch]);

  const [quantity, SetQuantity] = useState(1);

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (product.stock == 0 || count.valueAsNumber >= product.stock) {
      return;
    }
    const Qty = count.valueAsNumber + 1;

    SetQuantity(Qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber == 1) {
      return;
    }
    const Qty = count.valueAsNumber - 1;

    SetQuantity(Qty);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product.name} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              {product.images && product.images.length > 0 ? (
                <img
                  className="d-block w-100"
                  src={product.images[0].image}
                  alt="sdf"
                  height="500"
                  width="500"
                />
              ) : (
                <div>No product image available</div>
              )}
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{
                    width: `${(product.ratings / 5) * 100}%`,
                  }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={product.stock == 0 ? true : false}
                onClick={() => {
                  dispatch(addCartItem(product._id, quantity));

                  toast("item added in cart!", {
                    type: "success",
                    position: toast.POSITION.BOTTOM_CENTER,
                  });
                }}
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:
                <span id="stock_status">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>

              <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
                onClick={handleShow}
              >
                Submit Your Review
              </button>

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Submit Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <h5>Review's option will be update soon</h5>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
