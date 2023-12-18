import React, { useEffect, useState } from "react";
import MetaData from ".././layouts/MetaData";
import { getProduct } from "../../actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import Loder from ".././layouts/Loder";
import Product from ".././product/Product";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paginate from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

export default function SearchProduct() {
  const dispatch = useDispatch();
  const { product, loading, error, count, resperpage } = useSelector(
    (state) => state.productsState
  );
  // category
  const [category, setCategory] = useState(null);
  const Categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  // ratings filter
  const [ratings, setRatings] = useState(0);

  const { keyword } = useParams(); // get url query for using this hook

  // pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [priceChanged, setPriceChanged] = useState(price);

  const setCurrentPageNo = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(getProduct(keyword, priceChanged, category, ratings, currentPage));
  }, [error, dispatch, currentPage, priceChanged, keyword, ratings, category]);

  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <>
          <MetaData title={"best Product "} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <h3>Filter</h3>
            <div className="row">
              <div className="col-6 col-md-3 mb-5 mt-5">
                {/* {price filter} */}
                <div className="px-5" onMouseUp={() => setPriceChanged(price)}>
                  <Slider
                    range={true}
                    marks={{
                      1: "$1",
                      1000: "$1000",
                    }}
                    min={1}
                    max={1000}
                    defaultValue={price}
                    onChange={(price) => {
                      setPrice(price);
                    }}
                    handleRender={(renderProps) => {
                      return (
                        <Tooltip
                          overlay={`$${renderProps.props["aria-valuenow"]}`}
                        >
                          <div {...renderProps.props}> </div>
                        </Tooltip>
                      );
                    }}
                  />
                </div>

                <hr className="my-5" />
                {/* {category filter} */}
                <div className="mt-5">
                  <h3 className="mb-3">Categories</h3>
                  <ul className="pl-0">
                    {Categories.map((category) => (
                      <li
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                        }}
                        key={category}
                        onClick={() => {
                          setCategory(category);
                        }}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="my-5" />
                {/* {Ratings filter} */}

                <div className="mt-5">
                  <h4 className="mb-3">Ratings</h4>
                  <ul className="pl-0">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <li
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                        }}
                        key={star}
                        onClick={() => {
                          setRatings(star);
                        }}
                      >
                        <div className="rating-outer">
                          <div
                            className="rating-inner"
                            style={{ width: `${star * 20}%` }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-6 col-md-9  ">
                <div className="row">
                  {product &&
                    product.map((product) => (
                      <Product col={4} key={product.id} product={product} />
                    ))}
                </div>
              </div>
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
