import React, { useEffect, useState } from "react";
import ShoppingMart from "./main/ShoppingMart";
import loader from "./assets/puff.svg";
import { useDispatch } from "react-redux";
import { setCartData } from "./store/CartSlice";
import { createCookieSessionStorage, useNavigate } from "react-router-dom";
import { setFontLoaded } from "./store/BagSlice";
const App = () => {
  const cartDatDispatch = useDispatch();
  const [data, setData] = useState(null);
  const [fLink, setFLink] = useState(null);
  const navTo = useNavigate();
  useEffect(() => {
    const loadData = async () => {
      try {
        const respond = await fetch("https://fakestoreapi.com/products/");
        const data = await respond.json();
        setData(data);
        cartDatDispatch(setCartData(data));
      } catch (error) {
        console.log(error.message);
      }
    };
    loadData();
  }, []);
  useEffect(() => {
    function loadFont() {
      return new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..300,0..1,-50..200";
        link.id = "google_font";
        link.onload = resolve(link);
      });
    }
    const fontPromise = loadFont();
    fontPromise
      .then((_link) => {
        document.head.appendChild(_link);
        cartDatDispatch(setFontLoaded(true));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return data ? (
    <ShoppingMart />
  ) : (
    <div className="loader">
      <div className="loader-box">
        <img className="loader" src={loader} alt="loader" />
        <div className="loading-txt">Loading...</div>
      </div>
    </div>
  );
};

export default App;
