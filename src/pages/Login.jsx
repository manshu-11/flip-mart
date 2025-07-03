import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import login from '../assets/login.png';
import Button from '../components/Button';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetail } from '../store/LoginSlice';
import { setEmptyCart } from '../store/BagSlice';
const Login = () => {
	const auth = getAuth(app);
	const navTo = useNavigate();
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [error, setError] = useState("");
	const [userData, setUserData] = useState(null);
	const userDetailDispatch = useDispatch();
	const emptyCartDispatch = useDispatch();
	const user = useSelector(state => state.login.userDetails);

	const handleLogin = () => {
		signInWithEmailAndPassword(auth, userEmail, userPassword)
			.then((userCredential) => {
				const userDetails = {
					name: userCredential._tokenResponse.displayName,
					email: userCredential._tokenResponse.email
				};
				setUserData(userDetails);
				userDetailDispatch(setUserDetail(userDetails));
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorText = errorCode.split('/')[1].split('-').join(' ');
				setError(errorText.charAt(0).toUpperCase() + errorText.slice(1));
				console.log(errorText);
			});
	};
	useEffect(() => {
		setUserData(user);
	}, [user]);
	const handleEmailChange = (value) => {
		setUserEmail(value);
	};
	const handlePasswordChange = (value) => {
		setUserPassword(value);
	};
	const handleRegister = () => {
		navTo('/register');
	};
	const handleLogout = () => {
		userDetailDispatch(setUserDetail(null));
		emptyCartDispatch(setEmptyCart([]));
	};
	const handleShopIt = () => {
		navTo('/products');
	};
	return (
		<div className="login-main">
			{!userData ?
				<div className='login-box'>
					<div className="left-side">
						<h1 className='login-text-1'>Login</h1>
						<h4 className='login-text-2'>Get access to your Order, Wishlist and Recommendations</h4>
						<div className="image-box">
							<img src={login} alt="login" />
						</div>
					</div>
					<div className="right-side">
						<input id='fname' name='fname' type="text" placeholder='Email' onChange={(e) => handleEmailChange(e.target.value)} value={userEmail} />
						<input id='password' name='password' type="password" placeholder='Password' onChange={(e) => handlePasswordChange(e.target.value)} value={userPassword} />
						<span className='error'>{error}</span>
						<div className="button-box">
							<Button isLabel={false} buttonType='text' onButtonClick={handleLogin} ><span>Login</span></Button>
						</div>
						<Button isLabel={false} buttonType='register' onButtonClick={handleRegister} ><span>New to Flipmart? Crate an Account</span></Button>
					</div>
				</div>
				: <div className='login-box logout'>
					<div className="left-side">
						<h1 className='login-text-1'>Login out</h1>
						<h4 className='login-text-2'>See you again soon! Come back to access your Orders, Wishlist, and Recommendations.</h4>
						<div className="image-box">
							<img src={login} alt="login" />
						</div>
					</div>
					<div className="right-side">
						<h1 className='login-text-1'>{userData.name}</h1>
						<h4 className='login-text-2'>{userData.email}</h4>
						<div className="button-box">
							<Button isLabel={false} buttonType='text' onButtonClick={handleLogout} ><span>Logout</span></Button>
							<Button isLabel={false} buttonType='text' onButtonClick={handleShopIt} ><span>Continue Shopping</span></Button>
						</div>
					</div>
				</div>
			}
		</div>
	);
};

export default Login;
