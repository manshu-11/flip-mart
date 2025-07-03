import * as Yup from 'yup';
export const SchemaReg = Yup.object({
	name: Yup.string().trim().required('Name is Required').min(2, 'At least 2 characters required').max(50, 'Maximum 50 characters is valid').matches(/^[aA-zZ\s]+$/, 'Only alphabets Name Required'),
	email: Yup.string().trim().email('Invalid Email').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid Email').required('Email is Required'),
	city: Yup.string().trim().min(2, 'At least 2 characters required').max(25, 'Maximum 25 characters is valid').required('City name is Required').matches(/^[aA-zZ\s]+$/, 'Only alphabets Name Required'),
	/* loginID: Yup.string().trim().min(4, 'At least 4 characters required').max(16, 'Maximum 16 characters is valid').required('login ID Required').matches(/^[a-zA-Z0-9\-_]+$/, 'Only Alphabets, Numbers, Hyphen, Underscore are allowed').test('is-unique', 'Login ID already exists', function (value) {
		return debouncedCheckLoginID(value);
	}), */
	password: Yup.string().trim().min(6, 'At least 6 characters required').required('Password Required'),
	confirmPassword: Yup.string().trim().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password Required')
});