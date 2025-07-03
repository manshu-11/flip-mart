import { useSelector } from "react-redux";

const CurrencyExchange = ({ status, rate }) => {
  const exchangeRate = useSelector((state) => state.cart.exchangeRate);

  const displayValue = status
    ? Math.ceil(rate).toLocaleString("en-US")
    : (Math.ceil(rate) * Math.ceil(exchangeRate)).toLocaleString("en-IN");

  return displayValue;
};

export default CurrencyExchange;
