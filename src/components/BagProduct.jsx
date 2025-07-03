import React, { useEffect, useState } from "react";
import "./BagProduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItem,
  removeSaveItem,
  setItemMoveToCart,
  setItemSaveLater,
  setShowWarning,
  updateItemCount,
} from "../store/BagSlice";
import Button from "./Button";
import Currency from "./Currency";
import CurrencyExchange from "./CurrencyExchange";
import { Icon } from "../utils/utils";
const BagProduct = ({ currentProduct, currencyStatus, productIn }) => {
  const [updateTotalItem, setUpdateTotalItem] = useState(
    currentProduct.productQty
  );
  const itemCountDispatch = useDispatch();
  const itemSaveLaterDispatch = useDispatch();
  const removeFromSaveDispatch = useDispatch();
  const moveToCartDispatch = useDispatch();
  const warningStatusDispatch = useDispatch();
  const removeFromCartDispatch = useDispatch();
  useEffect(() => {
    itemCountDispatch(
      updateItemCount({
        id: currentProduct?.productObj?.id,
        quantity: updateTotalItem,
      })
    );
  }, [currentProduct?.productObj?.id, updateTotalItem, itemCountDispatch]);
  const handleCartButton = (e) => {
    const proButton = e.target.closest("button");
    if (proButton) {
      if (e.target.closest("button").id === "add") {
        setUpdateTotalItem((pre) => {
          if (pre <= 9) {
            return pre + 1;
          }
          return pre;
        });
      }
      if (e.target.closest("button").id === "minus") {
        setUpdateTotalItem((pre) => {
          if (pre > 1) {
            return pre - 1;
          }
          return pre;
        });
      }
      if (e.target.closest("button").id === "remove-from-cart") {
        const htmlElement = document.querySelector("html");
        htmlElement.style.overflow = "hidden";
        warningStatusDispatch(
          setShowWarning({
            waringStatus: true,
            deleteProdID: currentProduct?.productObj?.id,
          })
        );
      }
      if (e.target.closest("button").id === "remove-from-save") {
        removeFromSaveDispatch(removeSaveItem(currentProduct?.productObj?.id));
      }
      if (e.target.closest("button").id === "save-product") {
        itemSaveLaterDispatch(setItemSaveLater(currentProduct));
        removeFromCartDispatch(removeCartItem(currentProduct?.productObj?.id));
      }
      if (e.target.closest("button").id === "move-to-cart") {
        moveToCartDispatch(setItemMoveToCart(currentProduct));
        removeFromSaveDispatch(removeSaveItem(currentProduct?.productObj?.id));
      }
    }
  };
  return (
    <div className="cart-item" onClick={handleCartButton}>
      <div className="image-box">
        <div className="product-image">
          <img src={currentProduct?.productObj?.image} alt="Image" />
        </div>
        {productIn === "in-cart" ? (
          <div className="item-cart-counter">
            <div className="cart-counter-box">
              <Button isLabel={false} label="minus" buttonType="icon">
                <Icon name="e906" />
              </Button>
              <div className="total-item-no">
                {currentProduct && <p>{updateTotalItem}</p>}
              </div>
              <Button isLabel={false} label="add" buttonType="icon">
                <Icon name="e907" />
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="item-description-box">
        <div className="title-box">
          {currentProduct && <p>{currentProduct?.productObj?.title}</p>}
        </div>
        <div className="price-rating-box">
          <Currency status={currencyStatus} />
          <div className="price">
            <CurrencyExchange
              status={currencyStatus}
              rate={currentProduct?.productObj?.price * updateTotalItem}
            />
          </div>
        </div>
        <div className="item-description-button-box">
          <Button
            isLabel={false}
            label={productIn === "in-cart" ? "save-product" : "move-to-cart"}
            buttonType="icon"
          >
            {productIn === "in-cart" ? (
              <>
                <span className="material-symbols-outlined">download</span>
                <span>Save for later</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">upload</span>
                <span>Move To Cart</span>
              </>
            )}
          </Button>
          <Button
            isLabel={false}
            label={
              productIn === "in-cart" ? "remove-from-cart" : "remove-from-save"
            }
            buttonType="icon"
          >
            <span className="material-symbols-outlined">delete</span>
            <span>Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BagProduct;
