import React, { useEffect, useState } from 'react';
import CurrencyExchange from './CurrencyExchange';
import Currency from './Currency';
import { useSelector } from 'react-redux';
import './TotalPriceComp.css';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const TotalPriceComp = ({ cartItem }) => {
	const currencyStatus = useSelector((state) => state.cart.isCurrencyChange);
	const [totalAmount, setUpdateTotalAmount] = useState(0);
	const navTo = useNavigate();
	useEffect(() => {
		if (cartItem) {
			if (cartItem.length > 0) {
				const total = cartItem.map((ele) => {
					return ele.productObj.price * ele.productQty;
				}).reduce((acc, cur) => acc += cur);
				setUpdateTotalAmount(Math.ceil(total));
			}
		}
	}, [cartItem]);
	const handlePlaceOrder = () => {
		navTo('/purchase');
	};
	return (
		<>
			<div className="total-price-box">
				<div className="text-box">
					<span>Price ({cartItem.length} Item)</span>
					<div className='changes-box'>
						<Currency status={currencyStatus} />
						<div className="price"><CurrencyExchange status={currencyStatus} rate={totalAmount} /></div>
					</div>
				</div>
				<div className="text-box">
					<span>Discount</span>
					<div className='changes-box'>
						<Currency status={currencyStatus} />
						<div className="price"><CurrencyExchange status={currencyStatus} rate={0} /></div>
					</div>
				</div>
				<div className="text-box">
					<span>Delivery Charges</span>
					<div className='changes-box'>
						<Currency status={currencyStatus} />
						<div className="price"><CurrencyExchange status={currencyStatus} rate={0} /></div>
					</div>
				</div>
				<div className="line"></div>
				<div className="text-box total-amount">
					<span>Total Amount</span>
					<div className='changes-box'>
						<Currency status={currencyStatus} />
						<div className="price"><CurrencyExchange status={currencyStatus} rate={totalAmount} /></div>
					</div>
				</div>
				<div className="text-box">
					<Button isLabel={false} label='save' buttonType='text' onButtonClick={handlePlaceOrder}><span>PLACE ORDER</span></Button>
				</div>
			</div>
		</>
	);
};

export default TotalPriceComp;
