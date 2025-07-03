import React, { useEffect, useState } from "react";
import "./PurchaseOrder.css";
import { useSelector } from "react-redux";
import UserDetails from "./OrderPages/UserDetails";
import AddressDetails from "./OrderPages/AddressDetails";
import OrderSummary from "./OrderPages/OrderSummary";
import PaymentOption from "./OrderPages/PaymentOption";
import { useDispatch } from "react-redux";
import { setEmptyCart } from "../store/BagSlice";
import Button from "../components/Button";
import orderConf from "../assets/order-conf.png";
import { useNavigate } from "react-router-dom";
import LoginAlert from "../modal/LoginAlert";
import { setWarning } from "../store/LoginSlice";
const PurchaseOrder = () => {
  const stepperData = [
    { stepInfo: "USER DETAILS" },
    { stepInfo: "DELIVERY ADDRESS" },
    { stepInfo: "ORDER SUMMARY" },
    { stepInfo: "PAYMENT OPTION" },
  ];
  const [current, setCurrent] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [addressChecked, setAddressChecked] = useState(false);
  const [paymentChecked, setPaymentChecked] = useState(false);
  const user = useSelector((state) => state.login.userDetails);
  const emptyCartDispatch = useDispatch();
  const warningDispatch = useDispatch();
  const warning = useSelector((state) => state.login.warningAlert);
  const navTo = useNavigate();
  useEffect(() => {
    if (user) {
      setUserDetails(user);
    } else {
      warningDispatch(setWarning(true));
    }
  }, [user]);
  const fnNextActivity = () => {
    setCurrent((current) => {
      if (stepperData[current - 1].stepInfo === "DELIVERY ADDRESS") {
        if (addressChecked) {
          return current + 1;
        } else {
          return current;
        }
      } else if (stepperData[current - 1].stepInfo === "PAYMENT OPTION") {
        if (paymentChecked) {
          setIsComplete(true);
          emptyCartDispatch(setEmptyCart([]));
        } else {
          return current;
        }
      } else {
        return current + 1;
      }
    });
  };
  const fnProgress = () => {
    return ((current - 1) / (stepperData.length - 1)) * 100;
  };
  function getAddressChecked(checked) {
    setAddressChecked(checked);
  }
  function getPaymentChecked(checked) {
    setPaymentChecked(checked);
  }
  const renderContent = (step) => {
    switch (step) {
      case 1:
        return <UserDetails />;
      case 2:
        return <AddressDetails fn={getAddressChecked} />;
      case 3:
        return <OrderSummary />;
      case 4:
        return <PaymentOption fn={getPaymentChecked} />;
    }
  };
  return userDetails ? (
    <div className="purchase-order">
      <div className="stepper-box">
        <dir className="progress-bar">
          <div className="bg"></div>
          <div className="progress" style={{ width: `${fnProgress()}%` }}></div>
        </dir>
        <div className="steps">
          {stepperData.map(function (stepper, index) {
            return (
              <div className="step-box" key={stepper.stepInfo}>
                <div
                  className={`step-no  ${
                    current === index + 1 && !isComplete ? "active" : ""
                  } ${current > index + 1 || isComplete ? "complete" : ""}`}
                >
                  {current > index + 1 || isComplete ? (
                    <span>&#10004;</span>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="step-info">{stepper.stepInfo}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="show-comp">{renderContent(current)}</div>
      <div className="button-box">
        {!isComplete && (
          <Button
            isLabel={false}
            label="confirm"
            buttonType="text"
            onButtonClick={fnNextActivity}
          >
            {current === stepperData.length ? (
              <span>Order Confirm</span>
            ) : (
              <span>Confirm</span>
            )}
          </Button>
        )}
      </div>
      {isComplete && (
        <div className="order-placed">
          <img src={orderConf} alt="Order Confirm" />
        </div>
      )}
    </div>
  ) : (
    <LoginAlert show={warning} />
  );
};

export default PurchaseOrder;
