import React from 'react';
import bank_1 from '../../assets/bank_1.png';
import bank_2 from '../../assets/bank_2.png';
import bank_3 from '../../assets/bank_3.png';
import bank_4 from '../../assets/bank_4.png';
import bank_5 from '../../assets/bank_5.png';
import bank_6 from '../../assets/bank_6.png';
import bank_7 from '../../assets/bank_7.png';
const PaymentOption = ({ fn }) => {
	return (
		<div className='order-holder payment-details'>
			<div className='order-heading'>
				<h1>Payment Details:</h1>
			</div>
			<div className='details'>
				<div className="payment">
					<label>
						<input type="radio" name="address" value="payment1" onClick={() => fn(true)} />
						<img className='image' src={bank_1} alt="Bank Name" />
					</label>
				</div>
				<div className="payment">
					<label>
						<input type="radio" name="address" value="payment2" onClick={() => fn(true)} />
						<img className='image' src={bank_2} alt="Bank Name" />
					</label>
				</div>
				<div className="payment">
					<label>
						<input type="radio" name="address" value="payment3" onClick={() => fn(true)} />
						<img className='image' src={bank_3} alt="Bank Name" />
					</label>
				</div>
				<div className="payment">
					<label>
						<input type="radio" name="address" value="payment4" onClick={() => fn(true)} />
						<img className='image' src={bank_4} alt="Bank Name" />
					</label>
				</div>
				<div className="payment">
					<label>
						<input type="radio" name="address" value="payment5" onClick={() => fn(true)} />
						<img className='image' src={bank_5} alt="Bank Name" />
					</label>
				</div>
				<div className="payment">
					<label>
						<input type="radio" name="address" value="payment6" onClick={() => fn(true)} />
						<img className='image' src={bank_6} alt="Bank Name" />
					</label>
				</div>
				<div className="payment">
					<label>
						<input type="radio" name="address" value="payment7" onClick={() => fn(true)} />
						<img className='image' src={bank_7} alt="Bank Name" />
					</label>
				</div>

			</div>
		</div>
	);
};

export default PaymentOption;
