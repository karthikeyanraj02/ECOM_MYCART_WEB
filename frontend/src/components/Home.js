import React, { useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { getProduct } from "../actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import Loder from "./layouts/Loder";
import Product from "./product/Product";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paginate from "react-js-pagination";

export default function Home() {
  const dispatch = useDispatch();
  const { product, loading, error, count, resperpage } = useSelector(
    (state) => state.productsState
  );

  // pagination

  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(getProduct(null, null, null, null, currentPage));
  }, [error, dispatch, currentPage]);

  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <>
          <MetaData title={"best Product "} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {product &&
                product.map((product) => (
                  <Product col={3} key={product.id} product={product} />
                ))}
            </div>
          </section>
          {count > 0 && count > resperpage ? (
            <div className="d-flex justify-content-center mt-5">
              <Paginate
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={count}
                itemsCountPerPage={resperpage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
