import React from 'react';
import './NotFound.css';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
	const navTo = useNavigate();
	const handleGoHome = () => {
		navTo('/');
	};
	return (
		<div className='page-not-found'>
			<span className="icon material-symbols-outlined">sentiment_dissatisfied</span>
			<p className='big-text'>404</p>
			<p className='med-text'>OOPS!... PAGE NOT FOUND</p>
			<p className='text'>Sorry, the page you're looking for doesn't exit. Select <b>RETURN HOME</b> to continue</p>
			<Button isLabel={false} label='go-home' buttonType='text' onButtonClick={handleGoHome} children><span>BACK TO HOME</span></Button>
		</div>
	);
};

export default NotFound;
