import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './OrderPages.css';

const UserDetails = () => {
	const [userDetails, setUserDetails] = useState();
	const user = useSelector(state => state.login.userDetails);
	useEffect(() => {
		setUserDetails(user);
	}, [user]);
	return (
		<>
			{
				userDetails && <div className='order-holder user-details'>
					<div className='order-heading heading'>
						<h1>User Details:</h1>
					</div>
					<div className='details'>
						<h1>{userDetails.name}</h1>
						<h1>{userDetails.email}</h1>
					</div>
				</div>
			}
		</>
	);
};

export default UserDetails;
