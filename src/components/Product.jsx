import './Product.css';
import Currency from './Currency';
import Button from './Button';
import Rating from './Rating';
import CurrencyExchange from './CurrencyExchange';
import { useEffect, useState } from 'react';
import ProductSkeleton from '../skeleton/ProductSkeleton';
const Product = ({ productData, currencyStatus }) => {
	const [imgLoad, setImageLoad] = useState(false);
	useEffect(() => {
		function loadImage() {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.src = productData?.image;
				img.onload = resolve;
			});
		}
		const imgStatus = loadImage();
		imgStatus.then(() => {
			setImageLoad(true);
		});

	}, []);
	return (
		<>
			{
				imgLoad ?
					<div className='product'>
						<div className="img-box">
							<img src={productData?.image} alt={productData?.title} />
						</div>
						<div className='product-name'><p>{productData?.title}</p></div>
						<div className='rating'>
							<div className="star-box">
								<Rating rate={productData?.rating?.rate} />
							</div>
							<div className='rating-no'>{productData?.rating?.rate}</div>
						</div>
						<div className='price-rating-box'>
							<Currency status={currencyStatus} />
							<div className="price"><CurrencyExchange status={currencyStatus} rate={productData?.price} /></div>
						</div>
						<div className="button-box">
							<Button isLabel={false} label={productData?.id} buttonType='text'><span>View Product</span></Button>
						</div>
					</div > :
					<ProductSkeleton />}
		</>
	);
};

export default Product;
