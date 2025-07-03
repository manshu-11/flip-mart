import React from 'react';
import ReactDom from 'react-dom';
import './DeleteConfirm.css';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { setWarning } from '../store/LoginSlice';
const LoginAlert = ({ show }) => {
	const htmlElement = document.querySelector('html');
	const navTo = useNavigate();
	const warningDispatch = useDispatch();
	const handleWarningBtn = (e) => {
		const warnButton = e.target.closest('button');
		if (warnButton) {
			if (e.target.closest('button').id === "ok") {
				warningDispatch(setWarning(false));
				htmlElement.style.overflow = "auto";

				navTo("/login");
			}
			if (e.target.closest('button').id === "cancel") {
				warningDispatch(setWarning(false));
				htmlElement.style.overflow = "auto";
			}
		}
	};
	return ReactDom.createPortal(
		<>
			{
				show && <div className="modal-shin">
					<div className='popup-box' onClick={handleWarningBtn}>
						<p style={{ fontWeight: 'bold' }}>Login Alert</p>
						<p>Please log in to proceed.</p>
						<div className="button-box">
							<Button isLabel={false} label='ok' buttonType='text'>OK</Button>
							<Button isLabel={false} label='cancel' buttonType='text'>Cancel</Button>
						</div>
					</div>
				</div>
			}
		</>, document.querySelector("#modal")
	);
};
export default LoginAlert;