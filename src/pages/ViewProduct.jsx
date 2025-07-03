import React, { useEffect, useState } from 'react';
import './ViewProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import Currency from '../components/Currency';
import CurrencyExchange from '../components/CurrencyExchange';
import Button from '../components/Button';
import { removeSaveItem, setCartItem } from '../store/BagSlice';
import { useNavigate } from 'react-router-dom';
import LoginAlert from '../modal/LoginAlert';
import { setWarning } from '../store/LoginSlice';

const ViewProduct = () => {
	const cartItem = useSelector((state) => state.bag.cartItem);
	const productData = useSelector((state) => state.cart.cartData);
	const productID = useSelector((state) => state.cart.productID);
	const currencyStatus = useSelector((state) => state.cart.isCurrencyChange);
	const [currentProdObj, setCurrentProdObj] = useState(null);
	const [isItemInCart, setIsItemInCart] = useState(false);
	const dispatch = useDispatch();
	const removeFromSaveDispatch = useDispatch();
	const navTo = useNavigate();
	const [userDetails, setUserDetails] = useState();
	const user = useSelector(state => state.login.userDetails);
	const warning = useSelector(state => state.login.warningAlert);
	const warningDispatch = useDispatch();
	useEffect(() => {
		if (user) {
			setUserDetails(user);
		} else {
			warningDispatch(setWarning(true));
		}
	}, [user]);

	const handleAddToCart = () => {
		dispatch(setCartItem({ productObj: currentProdObj, productQty: 1 }));
		removeFromSaveDispatch(removeSaveItem(currentProdObj?.id));
	};
	const handleGoToCart = () => {
		navTo('/cart');
	};
	const handleShopping = () => {
		navTo('/products');
	};
	useEffect(() => {
		if (productData) {
			const getCurrentObj = productData?.find(ele => ele.id == productID);
			setCurrentProdObj(getCurrentObj);
		}
	}, [productData, productID]);
	useEffect(() => {
		const checkIsItemInCart = cartItem.some(ele => ele.productObj.id === productID);
		setIsItemInCart(checkIsItemInCart);
	}, [isItemInCart, productID, cartItem]);
	return (
		userDetails ? <div className='product-box'>
			<div className="product-image-box">
				<img src={currentProdObj?.image} alt="Image" />
			</div>
			<div className='product-information'>
				<div className='product-title'>{currentProdObj?.title}</div>
				<div className="product-description">
					<p>{currentProdObj?.description}</p>
				</div>
				<div className='rating'>
					<div className="rating-text">Rating:</div>
					<div className="star-box">
						<Rating rate={currentProdObj?.rating?.rate} />
					</div>
					<div className='rating-no'>{currentProdObj?.rating?.rate}</div>
					<div className='rating-no' style={{ marginLeft: '5px' }}>({currentProdObj?.rating?.count})</div>
				</div>
				<div className='price-rating-box'>
					<div className="price-txt">Price:</div>
					<Currency status={currencyStatus} />
					<div className="price"><CurrencyExchange status={currencyStatus} rate={currentProdObj?.price} /></div>
				</div>
				<div className="button-box">
					{isItemInCart ? <Button isLabel={false} label={productID} buttonType='go-to-cart' onButtonClick={handleGoToCart}><span>Go To Cart</span></Button> : <Button isLabel={false} label={productID} buttonType='add-to-cart' onButtonClick={handleAddToCart}><span>Add To Cart</span></Button>}
					<Button isLabel={false} label='shopping' buttonType='cont-shopping' onButtonClick={handleShopping}><span>Continue Shopping</span></Button>
				</div>
			</div>
		</div> : <LoginAlert show={warning} />
	);
};

export default ViewProduct;
