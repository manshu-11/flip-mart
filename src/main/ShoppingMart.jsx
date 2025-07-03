import React, { useEffect, useState } from 'react';
import './ShoppingMart.css';
import Header from '../pages/Header';
import AdvertisingSlider from '../pages/AdvertisingSlider';
import Login from '../pages/Login';
import FilterBar from '../pages/FilterBar';
import { Route, Routes } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import Home from '../pages/Home';
import ViewProduct from '../pages/ViewProduct';
import ProductCart from '../pages/ProductCart';
import Register from '../pages/Register';
import PurchaseOrder from '../pages/PurchaseOrder';
import NotFound from '../pages/NotFound';
const ShoppingMart = () => {
	/* 	useEffect(() => {
			const parent = document.querySelector('.add-slider-holder');
			console.log(parent);
			const handleResize = () => {
				if (window.innerWidth < 1200) {
					const scaleX = window.innerWidth / parent.offsetWidth;
					console.log(scaleX);
					parent.style.transform = `scale(${scaleX})`;
				}
			};
			handleResize();
			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}, []); */
	const [modalShow, setModalShow] = useState(false);
	return (
		<div id="cart-holder" className='shopping-cart-holder'>
			<Header />
			<section className='cart-component'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/products' element={<ProductList />} />
					<Route path='/view-products' element={<ViewProduct />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/cart' element={<ProductCart />} />
					<Route path='/purchase' element={<PurchaseOrder />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</section>
		</div>
	);
};
export default ShoppingMart;
