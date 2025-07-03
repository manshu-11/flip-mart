import React, { lazy, Suspense } from 'react';
import './Home.css';
import product_1 from '../assets/product_1.png';
import product_2 from '../assets/product_2.png';
import product_3 from '../assets/product_3.png';
import product_4 from '../assets/product_4.png';
import product_5 from '../assets/product_5.png';
import product_6 from '../assets/product_6.png';
import product_7 from '../assets/product_7.png';
import product_8 from '../assets/product_8.png';
const ProductNameList = lazy(() => import('../components/ProductNameList'));
const AdvertisingSlider = lazy(() => import('./AdvertisingSlider'));
import ProductNameListSkeleton from '../skeleton/ProductNameListSkeleton';
const productList = [
	{ 'prod': product_1, 'prodName': 'Fashion' },
	{ 'prod': product_2, 'prodName': 'Mobiles' },
	{ 'prod': product_3, 'prodName': 'Appliances' },
	{ 'prod': product_4, 'prodName': 'Jewelry' },
	{ 'prod': product_5, 'prodName': 'Sport' },
	{ 'prod': product_6, 'prodName': 'Beauty' },
	{ 'prod': product_7, 'prodName': 'Furniture' },
	{ 'prod': product_8, 'prodName': 'Food' }
];
const Home = () => {
	return (
		<>

			<div className='shopping-cart-home'><Suspense fallback={<h1>Loading...</h1>}><AdvertisingSlider /></Suspense>
				<div className="product-name-list">
					{
						productList.map((ele, i) =>
							<div key={ele.prodName}>
								<Suspense fallback={<ProductNameListSkeleton />}>
									<ProductNameList productObj={ele} />
								</Suspense>
							</div>
						)
					}

				</div>
			</div>
		</>
	);
};

export default Home;
