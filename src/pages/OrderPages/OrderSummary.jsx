import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BagProduct from "../../components/BagProduct";
import CurrencyExchange from "../../components/CurrencyExchange";
import Currency from "../../components/Currency";

const OrderSummary = () => {
  const cartItem = useSelector((state) => state.bag.cartItem);
  const [itemFromCart, setItemFromCart] = useState(null);
  const currencyStatus = useSelector((state) => state.cart.isCurrencyChange);
  const [totalAmount, setUpdateTotalAmount] = useState(0);
  useEffect(() => {
    setItemFromCart(cartItem);
  }, [cartItem]);
  useEffect(() => {
    if (cartItem) {
      if (cartItem.length > 0) {
        const total = cartItem
          .map((ele) => {
            return ele.productObj.price * ele.productQty;
          })
          .reduce((acc, cur) => (acc += cur));
        setUpdateTotalAmount(Math.ceil(total));
      }
    }
  }, [cartItem]);
  return (
    <div>
      <div className="order-holder order-details">
        <div className="order-heading">
          <h1>Order Summary:</h1>
        </div>
        <div className="order-info">
          <table>
            <thead>
              <th className="image">Product</th>
              <th className="title">Product Name</th>
              <th className="price">Product Amount</th>
              <th className="qty">Product Quantity</th>
              <th className="total-price">Product Cost</th>
            </thead>
            {itemFromCart && (
              <tbody>
                {itemFromCart.map((product) => {
                  return (
                    <tr key={product?.productObj?.id}>
                      <td className="image">
                        <img
                          src={product?.productObj?.image}
                          alt="Product Image"
                        />
                      </td>
                      <td className="title">{product?.productObj?.title}</td>
                      <td className="price">
                        <Currency status={currencyStatus} />
                        <span>
                          <CurrencyExchange
                            status={currencyStatus}
                            rate={product?.productObj?.price}
                          />
                        </span>
                      </td>
                      <td className="qty">{product?.productQty}</td>
                      <td className="total-price">
                        <Currency status={currencyStatus} />
                        <span>
                          <CurrencyExchange
                            status={currencyStatus}
                            rate={
                              product?.productObj?.price * product?.productQty
                            }
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="total-text" colspan="4">
                    <h1>Total Amount</h1>
                  </td>
                  <td className="product-total-amount">
                    <Currency status={currencyStatus} />
                    <span>
                      <CurrencyExchange
                        status={currencyStatus}
                        rate={totalAmount}
                      />
                    </span>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
