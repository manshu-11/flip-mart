import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../assets/logo.png";
import Currency from "../components/Currency";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setChangeCurrency } from "../store/CartSlice";
import LoginAlert from "../modal/LoginAlert";
import { setWarning } from "../store/LoginSlice";
import { Icon } from "../utils/utils";
const Header = () => {
  const navTo = useNavigate();
  const dispatch = useDispatch();
  let currencyStatus = useSelector((state) => state.cart.isCurrencyChange);
  const cartItem = useSelector((state) => state.bag.cartItem);
  const [isRupee, setRupee] = useState(currencyStatus);
  const isLogin = useSelector((state) => state.cart.isLogin);
  const [cartTotalItem, setCartTotalItem] = useState(cartItem.length);
  const [userDetails, setUserDetails] = useState();
  const user = useSelector((state) => state.login.userDetails);
  const warning = useSelector((state) => state.login.warningAlert);
  const fontLoad = useSelector((state) => state.bag.fontLoad);
  const warningDispatch = useDispatch();
  const handleCurrencyChange = (e) => {
    setRupee((isRupee) => !isRupee);
  };
  useEffect(() => {
    dispatch(setChangeCurrency(isRupee));
  }, [isRupee]);
  useEffect(() => {
    setUserDetails(user);
  }, [user]);
  useEffect(() => {
    setCartTotalItem(cartItem.length);
  }, [cartItem]);
  const handleLogin = (e) => {
    navTo("/login");
  };
  const handleCart = (e) => {
    userDetails ? navTo("/cart") : warningDispatch(setWarning(true)); //navTo('/login');
    //setIsLogIn(true);
  };
  const handleShop = (e) => {
    userDetails ? navTo("/products") : warningDispatch(setWarning(true)); //navTo('/login');
  };
  const handleHome = (e) => {
    navTo("/");
  };
  return (
    <header>
      <LoginAlert show={warning} />
      <div className="logo">
        <img src={logo} alt="Flipmart" />
      </div>
      {fontLoad ? (
        <div className="header-button-box">
          <Button
            isLabel={true}
            label="Home"
            buttonType="icon"
            onButtonClick={handleHome}
          >
            <Icon name="e904" />
          </Button>
          <div className="line"></div>
          <Button
            isLabel={true}
            label="Currency"
            buttonType="icon"
            onButtonClick={handleCurrencyChange}
          >
            <Currency status={isRupee} />
          </Button>
          <div className="line"></div>
          <Button
            isLabel={true}
            label="Shop"
            buttonType="icon"
            onButtonClick={handleShop}
          >
            <Icon name="e90b" />
          </Button>
          <div className="line"></div>
          <Button
            isLabel={true}
            label={userDetails ? userDetails.name : "Login"}
            buttonType="icon"
            onButtonClick={handleLogin}
          >
            <Icon name="e90d" />
          </Button>
          <div className="line"></div>
          <Button
            isLabel={true}
            label="Cart"
            buttonType="icon"
            onButtonClick={handleCart}
          >
            <Icon name="e900" />
            <span className="cart-no">{cartTotalItem}</span>
          </Button>
        </div>
      ) : (
        <h1>loading</h1>
      )}
    </header>
  );
};
export default Header;
