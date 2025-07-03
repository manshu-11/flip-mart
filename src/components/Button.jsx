import './Button.css';
const Button = ({ isLabel, label, buttonType, onButtonClick, children }) => {
	return (
		<>
			{isLabel ? <label htmlFor={label}>{label}</label> : ""}
			<button id={isLabel ? "" : label} className={buttonType} onClick={onButtonClick}>{children}</button>
		</>
	);
};
export default Button;
