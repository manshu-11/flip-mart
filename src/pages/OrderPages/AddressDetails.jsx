import React from 'react';

const AddressDetails = ({ fn }) => {
	return (
		<div className='order-holder address-details'>
			<div className='order-heading'>
				<h1>Confirm Address:</h1>
			</div>
			<div className='details'>
				<div className="address">
					<label>
						<input type="radio" name="address" value="address2" onClick={() => fn(true)} />
						<span>
							<p>456 Elm Street</p>
							<p>Brookville, CA 90210</p>
							<p>USA</p>
						</span>
					</label>
				</div>
				<div className="address">
					<label>
						<input type="radio" name="address" value="address3" onClick={() => fn(true)} />
						<span>
							<p>789 Oak Avenue</p>
							<p>Greenville, TX 75001</p>
							<p>USA</p>
						</span>
					</label>
				</div>
				<div className="address">
					<label>
						<input type="radio" name="address" value="address4" onClick={() => fn(true)} />
						<span>
							<p>101 Pinecrest Boulevard</p>
							<p>Fairview, FL 33101</p>
							<p>USA</p>
						</span>
					</label>
				</div>
				<div className="address">
					<label>
						<input type="radio" name="address" value="address5" onClick={() => fn(true)} />
						<span>
							<p>202 Cedar Drive</p>
							<p>Westfield, IL 60501</p>
							<p>USA</p>
						</span>
					</label>
				</div>
			</div>
		</div>
	);
};

export default AddressDetails;
