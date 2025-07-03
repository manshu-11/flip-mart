import React from 'react';
import ReactDom from 'react-dom';
import './DeleteConfirm.css';
import { removeCartItem, setShowWarning } from '../store/BagSlice';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
const DeleteConfirm = ({ show, prodID }) => {
	const removeFromCartDispatch = useDispatch();
	const warningStatusDispatch = useDispatch();
	const htmlElement = document.querySelector('html');
	const handleWarningBtn = (e) => {
		const warnButton = e.target.closest('button');
		if (warnButton) {
			if (e.target.closest('button').id === "remove") {
				removeFromCartDispatch(removeCartItem(prodID));
				warningStatusDispatch(setShowWarning(null));
				htmlElement.style.overflow = "auto";
			}
			if (e.target.closest('button').id === "cancel") {
				warningStatusDispatch(setShowWarning(null));
				htmlElement.style.overflow = "auto";
			}
		}
	};
	return ReactDom.createPortal(
		<>
			{
				show && <div className="modal-shin">
					<div className='popup-box' onClick={handleWarningBtn}>
						<p style={{ fontWeight: 'bold' }}>Remove Item</p>
						<p>Are you sure you want to remove this item?</p>
						<div className="button-box">
							<Button isLabel={false} label='remove' buttonType='text'>Remove</Button>
							<Button isLabel={false} label='cancel' buttonType='text'>Cancel</Button>
						</div>
					</div>
				</div>
			}
		</>, document.querySelector("#modal")
	);
};
export default DeleteConfirm;