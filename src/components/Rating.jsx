import './Rating.css';
const Rating = ({ rate }) => {
	return (
		<div className='rating-box'>
			{
				[...Array(5)].map((_, i) => {
					let num = i + 0.5;
					return rate >= (i + 1) ? <span key={i} className="material-symbols-outlined fill" > star</span> : rate >= num ? <span key={i} className="material-symbols-outlined">star_half</span> : <span key={i} className="material-symbols-outlined">star</span>;
				})
			}
		</div>
	);
};

export default Rating;
