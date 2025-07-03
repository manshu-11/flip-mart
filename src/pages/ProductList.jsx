import React, { useEffect, useState, lazy, Suspense } from 'react';

const Product = lazy(() => import('../components/Product'));
import noProduct from '../assets/no-product.png';
import { useDispatch, useSelector } from 'react-redux';
import './ProductList.css';
import FilterBar from './FilterBar';
import { setProductID } from '../store/CartSlice';
import { useNavigate } from 'react-router-dom';
import ProductSkeleton from '../skeleton/ProductSkeleton';
const ProductList = () => {
	const productData = useSelector((state) => state.cart.cartData);
	const currencyStatus = useSelector((state) => state.cart.isCurrencyChange);
	const exchangeRate = useSelector((state) => state.cart.exchangeRate);
	const categories = useSelector((state) => state.filter.categories);
	const priceRange = useSelector((state) => state.filter.priceRange);
	const ratingRange = useSelector((state) => state.filter.ratingRange);

	const dispatch = useDispatch();
	const navTo = useNavigate();

	const [filterData, setFilterData] = useState();
	function checkFilterStatus() {
		return categories.length == 0;
	}
	const handleViewProduct = (e) => {
		const proButton = e.target.closest('button');
		if (proButton) {
			const productID = +proButton.id;
			dispatch(setProductID(productID));
			navTo('/view-products');
		}
	};
	useEffect(() => {
		const filterPriceRange = priceRange ? priceRange.split('-') : null;
		const filterRatingRange = ratingRange ? ratingRange : null;
		const filterCategory = categories;
		let filterData = productData.filter((ele) => {
			let matchingCategory = true;
			let matchesPrice = true;
			let matchesRating = true;
			if (filterCategory) {
				matchingCategory = filterCategory.includes(ele.category);
			}
			if (filterPriceRange) {
				let getCurrencyPrice = currencyStatus ? Math.ceil(ele.price) : Math.ceil(ele.price) * Math.ceil(exchangeRate);
				matchesPrice = getCurrencyPrice >= +filterPriceRange[0] && getCurrencyPrice <= +filterPriceRange[1];
			}
			if (filterRatingRange) {
				console.log(ele.rating.rate >= +filterRatingRange);
				matchesRating = ele.rating.rate >= +filterRatingRange;
			}
			return matchingCategory && matchesPrice && matchesRating;
		});
		setFilterData(filterData);
	}, [categories, priceRange, ratingRange]);

	return (
		<div className='product-comp'>
			<div className='filter-box'>
				<FilterBar />
			</div>
			<div className='product-list' onClick={handleViewProduct}>
				{
					checkFilterStatus() ? productData?.map((prod) => {
						return <div key={prod.id}>
							<Suspense fallback={<ProductSkeleton />}><Product productData={prod} currencyStatus={currencyStatus} /></Suspense>
						</div>;
					}) : filterData && filterData.length > 0 ?
						filterData?.map((prod) => {
							return <div key={prod.id}>
								<Suspense fallback={<ProductSkeleton />}><Product productData={prod} currencyStatus={currencyStatus} /></Suspense>
							</div>;
						})
						: <div className='no-product'>
							<div className="img-box">
								<img src={noProduct} alt="no-product" />
							</div>
							<div className="message-txt"><p>Sorry, No Product Found!</p></div>
						</div>
				}
			</div>
		</div>
	);
};

export default ProductList;
