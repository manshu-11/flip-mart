import React, { useEffect, useRef, useState } from "react";
import "./FilterBar.css";
import Button from "../components/Button";
import { Category, Price, Rating } from "../Popup/Popup";
import { getAllButtonElement } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { setProductID } from "../store/CartSlice";
import { useNavigate } from "react-router-dom";
const FilterBar = () => {
  const [popupName, setPopupName] = useState("");
  const productData = useSelector((state) => state.cart.cartData);
  const [showHidePopup, setShowHidePopup] = useState(false);
  const [filterList, setFilterList] = useState([]);
  const [searchBoxButtonList, setSearchBoxButtonList] = useState([]);
  const categories = useSelector((state) => state.filter.categories);
  const priceRange = useSelector((state) => state.filter.priceRange);
  const ratingRange = useSelector((state) => state.filter.ratingRange);
  const popup = useRef();
  const searchBox = useRef();
  const searchList = useRef();
  const dispatch = useDispatch();
  const navTo = useNavigate();
  const handleSearchButton = (e) => {
    clearActiveClass();
    e.currentTarget.classList.add("active");
    setPopupName(e.currentTarget.id);
    setShowHidePopup(true);
  };
  const handleClosePopup = (e) => {
    clearActiveClass();
    setPopupName("");
    setShowHidePopup(false);
  };
  const handleClearFilter = (e) => {};
  const handleSearch = (e) => {
    let text = e.target.value;
    getFilterList(text);
  };
  const getFilterList = (value) => {
    const getList =
      value &&
      productData.filter((ele) =>
        ele?.title?.toLowerCase().includes(value.toLowerCase())
      );
    setFilterList(getList);
  };
  const handleViewProduct = (e) => {
    const proButton = e.target.closest("button");
    if (proButton) {
      const productID = +proButton.id;
      dispatch(setProductID(productID));
      navTo("/view-products");
    }
  };
  useEffect(() => {
    if (filterList.length > 0) {
      searchList.current.classList.remove("hide");
      searchList.current.classList.add("show");
    } else {
      searchList.current.classList.remove("show");
      searchList.current.classList.add("hide");
    }
  }, [filterList]);
  function clearActiveClass() {
    if (searchBoxButtonList) {
      searchBoxButtonList.forEach((element) => {
        element.classList.remove("active");
      });
    }
  }
  useEffect(() => {
    const buttonList = getAllButtonElement(searchBox.current);
    setSearchBoxButtonList(Array.from(buttonList));
  }, [categories, priceRange, ratingRange]);
  return (
    <div className="filter-box-container">
      <div className="filter-bar">
        <div className="search-box">
          <span className="icon material-symbols-outlined">search</span>
          <input type="text" onChange={handleSearch} />
        </div>
        <div ref={searchBox} className="search-button-box">
          <Button
            isLabel={false}
            label="category"
            buttonType="text"
            onButtonClick={handleSearchButton}
          >
            <span>Category</span>
          </Button>
          {categories.length > 0 ? (
            <Button
              isLabel={false}
              label="price"
              buttonType="text"
              onButtonClick={handleSearchButton}
            >
              <span>Price</span>
            </Button>
          ) : (
            ""
          )}
          {priceRange !== null ? (
            <Button
              isLabel={false}
              label="rating"
              buttonType="text"
              onButtonClick={handleSearchButton}
            >
              <span>Rating</span>
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div ref={searchList} className="drop-list" onClick={handleViewProduct}>
        {filterList &&
          filterList.map((ele, i) => {
            return (
              <Button
                key={ele.id}
                isLabel={false}
                label={ele.id}
                buttonType="search-list"
              >
                <span>{ele.title}</span>
              </Button>
            );
          })}
      </div>
      {showHidePopup && (
        <div ref={popup} className="popup">
          <Button
            isLabel={false}
            buttonType="icon"
            onButtonClick={handleClosePopup}
          >
            <span className="material-symbols-outlined">close</span>
          </Button>
          {popupName === "category" && <Category />}
          {popupName === "price" && <Price />}
          {popupName === "rating" && <Rating />}
        </div>
      )}
    </div>
  );
};
export default FilterBar;
