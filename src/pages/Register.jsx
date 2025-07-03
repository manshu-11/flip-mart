import React from 'react';
import './Login.css';
import login from '../assets/login.png';
import { useFormik } from "formik";
import { SchemaReg } from './../Schema/Schema.Reg';
import { app } from '../firebase/firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const auth = getAuth(app);

const Register = () => {
	const navTo = useNavigate();
	const initialFormValues = {
		name: "",
		email: "",
		city: "",
		password: "",
		confirmPassword: ""
	};
	const signUpUser = async (email, password, displayName) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			await updateProfile(user, { displayName });
			console.log("User created with display name:", displayName);
			console.log("User details:", user);
		} catch (error) {
			console.error("Error creating user:", error.message);
		}
	};
	const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: initialFormValues,
		validationSchema: SchemaReg,
		onSubmit: (values) => {
			const register_Data = values;
			console.log(register_Data);
			signUpUser(register_Data.email, register_Data.confirmPassword, register_Data.name,);
			navTo('/login');
		}
	});
	return (
		<div className="login-main">
			<div className='login-box'>
				<div className="left-side">
					<h1 className='login-text-1'>Looks like you're new here!</h1>
					<h4 className='login-text-2'>Sign up with your details to get started.</h4>
					<div className="image-box">
						<img src={login} alt="login" />
					</div>
				</div>
				<div className="right-side">
					<form onSubmit={handleSubmit}>
						<div className="input-box">
							<input type="text" name="name" placeholder='Display Name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
							{errors.name && touched.name ? <p className='error'>{errors.name}</p> : ""}
						</div>
						<div className="input-box">
							<input type="email" name="email" placeholder='Email ID' value={values.email} onChange={handleChange} onBlur={handleBlur} />
							{errors.email && touched.email ? <p className='error'>{errors.email}</p> : ""}
						</div>
						<div className="input-box">
							<input type="text" name="city" placeholder='Enter City' value={values.city} onChange={handleChange} onBlur={handleBlur} />
							{errors.city && touched.city ? <p className='error'>{errors.city}</p> : ""}
						</div>
						<div className="input-box">
							<input type="password" name="password" placeholder='Set Password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
							{errors.password && touched.password ? <p className='error'>{errors.password}</p> : ""}
						</div>
						<div className="input-box">
							<input type="password" name="confirmPassword" placeholder='Confirm Password' value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
							{errors.confirmPassword && touched.confirmPassword ? <p className='error'>{errors.confirmPassword}</p> : ""}
						</div>
						<button type="submit"><span>Register</span></button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
