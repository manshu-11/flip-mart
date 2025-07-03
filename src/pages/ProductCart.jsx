import { useSelector } from "react-redux";
import { } from "./ProductCart.css";
import BagProduct from "../components/BagProduct";
import TotalPriceComp from "../components/TotalPriceComp";
import emptyCart from '../assets/empty_cart.png';
import { useEffect, useState } from "react";
import DeleteConfirm from "../modal/DeleteConfirm";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
const ProductCart = () => {
	const cartItem = useSelector((state) => state.bag.cartItem);
	const saveItem = useSelector(state => state.bag.saveItem);
	const deleteProID = useSelector(state => state.bag.deleteProdID);
	const [itemFromCart, setItemFromCart] = useState(null);
	const [itemFromSave, setItemFromSave] = useState(null);
	const showWarningObj = useSelector(state => state.bag.deleteProdStatus);
	const currencyStatus = useSelector((state) => state.cart.isCurrencyChange);
	const navTo = useNavigate();
	const handleShopNow = () => {
		navTo('/products');
	};
	useEffect(() => {
		setItemFromCart(cartItem);
		setItemFromSave(saveItem);
	}, [cartItem, saveItem, deleteProID]);
	return (
		<div className="cart-container">
			<DeleteConfirm show={showWarningObj?.waringStatus} prodID={showWarningObj?.deleteProdID} />
			<div className="cart-item-container">
				<div className="cart-item-list"><span className="material-symbols-outlined">shopping_cart</span><span>Cart {itemFromCart && itemFromCart.length > 1 ? 'Items' : 'item'}</span></div>
				{
					itemFromCart && itemFromCart.length > 0 ? itemFromCart.map(currentPro => <BagProduct key={currentPro.productObj.id} currentProduct={currentPro} currencyStatus={currencyStatus} productIn='in-cart' />) : <div className="empty-cart"><img src={emptyCart} alt="Empty Cart" /><h1 style={{ fontWight: 'bold' }}>Your cart is empty</h1><p>Looks like you have not added anything to you cart. Go ahead & explore top categories.</p><Button isLabel={false} label='shop-now' buttonType='cont-shopping' onButtonClick={handleShopNow}><span>Shop Now</span></Button></div>
				}
				{
					itemFromCart && itemFromSave.length > 0 ? <div className="cart-item-list"><span className="material-symbols-outlined">download</span><span>Saved For Later ({itemFromSave.length})</span></div> : ""
				}
				{
					itemFromSave && itemFromSave.length > 0 ? itemFromSave.map(currentPro => <BagProduct key={currentPro.productObj.id} currentProduct={currentPro} currencyStatus={currencyStatus} productIn='in-save' />) : ""
				}
			</div>
			{itemFromCart && itemFromCart.length > 0 ? <TotalPriceComp cartItem={cartItem} /> : ""}

		</div>
	);
};

export default ProductCart;
