import React, { useEffect, useRef, useState } from 'react';
import "./AdvertisingSlider.css";
import slide_1 from '../assets/01.jpg';
import slide_2 from '../assets/02.jpg';
import slide_3 from '../assets/03.jpg';
import slide_4 from '../assets/04.jpg';
import slide_5 from '../assets/05.jpg';
import slide_6 from '../assets/06.jpg';
import slide_7 from '../assets/07.jpg';
import slide_8 from '../assets/08.jpg';
const sliderImages = [slide_1, slide_2, slide_3, slide_4, slide_5, slide_6, slide_7, slide_8];
const AdvertisingSlider = () => {
	const [count, setCount] = useState(0);
	const [slideImg, setSlideImg] = useState(null);
	const [dot, setDot] = useState(null);
	const sliderBox = useRef();
	const [allLoadImg, setAllLoadImg] = useState(false);
	useEffect(() => {
		const slideImgs = document.querySelectorAll('.slider');
		const dots = document.querySelectorAll('.dot');
		setSlideImg(slideImgs);
		setDot(dots);
	}, []);
	useEffect(() => {
		const loadImg = (num) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.src = sliderImages[num];
				img.onload = resolve;
			});
		};
		const result = async () => {
			await Promise.all(sliderImages.map((_, i) => loadImg(i)));
			setAllLoadImg(true);
		};
		result();
	}, []);
	useEffect(() => {
		if (dot) {
			dot.forEach(element => {
				element.classList.remove('current');
			});
			dot[count].classList.add('current');
		}
		function handleAnimationEnd() {
			sliderBox.current.appendChild(slideImg[count]);
			slideImg[count].classList.remove('moveNext');
			slideImg[count]?.removeEventListener('animationend', handleAnimationEnd);
		}
		const slideInterval = setInterval(() => {
			slideImg[count].classList.add('moveNext');
			slideImg[count].addEventListener('animationend', handleAnimationEnd);
			setCount((pre) => {
				if (pre === slideImg.length - 1) return 0;
				return pre + 1;
			});
		}, 2000);
		return () => {
			clearInterval(slideInterval);
		};
	}, [count, slideImg]);
	return (
		<>
			<div ref={sliderBox} className='add-slider-holder'>
				{sliderImages.map((ele, i) => <img key={`slide${i}`} className={`slider slider_${i}`} src={ele} alt='Advertising' />)}
				<div className="indictor">
					{sliderImages.map((ele, i) => <div key={`dot${i}`} className={`dot dot${i}`} ></div>)}
				</div>
			</div>
		</>
	);
};
export default AdvertisingSlider;