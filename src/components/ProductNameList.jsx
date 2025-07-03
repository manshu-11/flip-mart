import React from 'react';
import './ProductNameList.css';
const ProductNameList = ({ productObj }) => {
	return (
		<div className='prod-img-box'>
			<div className="img-box">
				<img src={productObj.prod} alt={productObj.prodName} />
			</div>
			<div className="prod-name">
				<p>{productObj.prodName}</p>
			</div>
		</div>
	);
};

export default ProductNameList;
