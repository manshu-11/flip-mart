import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Currency from "../components/Currency";
import { getAllButtonElement } from "../utils/utils";
import { useEffect, useRef, useState } from "react";
import { removeCategory, removePriceRange, removeRatingRange, setCategory, setPriceRange, setRatingRange } from "../store/FilterSlice";
const Category = () => {
	const category = useRef();
	const [categoryBtn, SetCategoryBtn] = useState(null);
	const categoriesArray = useSelector((state) => state.filter.categories);
	const priceRange = useSelector((state) => state.filter.priceRange);
	const ratingRange = useSelector((state) => state.filter.ratingRange);
	const [categoryFilter, setCategoryFilter] = useState(null);
	const dispatch = useDispatch();
	const priceDispatch = useDispatch();
	const ratingDispatch = useDispatch();
	const handleCategoryBtn = (e) => {
		const cateButton = e.target.closest('button');
		if (cateButton) {
			const categoryName = cateButton.id;
			if (cateButton.classList.contains('active')) {
				cateButton.classList.remove('active');
				dispatch(removeCategory(categoryName));
			} else {
				cateButton.classList.add('active');
				dispatch(setCategory(categoryName));
			}
		}
	};
	useEffect(() => {
		const cateButtonList = getAllButtonElement(category.current);
		SetCategoryBtn(Array.from(cateButtonList));
	}, []);
	useEffect(() => {
		setCategoryFilter(categoriesArray);
		if (categoryBtn) {
			const activeBtn = categoryBtn.filter(ele => categoryFilter.includes(ele.id));
			if (activeBtn) {
				activeBtn.forEach(element => {
					element.classList.add('active');
				});
			}
		}
	}, [categoryFilter]);
	useEffect(() => {
		if (categoriesArray.length === 0) {
			priceDispatch(removePriceRange(null));
			ratingDispatch(removeRatingRange(null));
		}
	}, [categoriesArray]);
	return (
		<div ref={category} onClick={handleCategoryBtn}>
			<Button isLabel={false} label="men's clothing" buttonType='filterButton'>
				<span>Men's clothing</span>
			</Button>

			<Button isLabel={false} label='jewelery' buttonType='filterButton'>
				<span>jewelery</span>
			</Button>
			<Button isLabel={false} label='electronics' buttonType='filterButton'>
				<span>Electronics</span>
			</Button>
			<Button isLabel={false} label="women's clothing" buttonType='filterButton'>
				<span>Women's clothing</span>
			</Button>
			{/* <Button isLabel={false} label="all product" buttonType='filterButton'>
				<span>All Products</span>
			</Button> */}
		</div>
	);
};
const Price = () => {
	const currencyStatus = useSelector((state) => state.cart.isCurrencyChange);
	const price = useRef();
	const dispatch = useDispatch();
	const [priceBtn, SetPriceBtn] = useState(null);
	const priceRange = useSelector((state) => state.filter.priceRange);
	const categories = useSelector((state) => state.filter.categories);
	const handlePriceBtn = (e) => {
		const priceButton = e.target.closest('button');
		if (priceButton) {
			const priceRange = priceButton.id;
			if (priceButton.classList.contains('active')) {
				priceButton.classList.remove('active');
				dispatch(removePriceRange(null));
			} else {
				clearActiveClass();
				priceButton.classList.add('active');
				dispatch(setPriceRange(priceRange));
			}
		}
	};
	function clearActiveClass() {
		if (priceBtn) {
			priceBtn.forEach(element => {
				element.classList.remove('active');
			});
		}
	}
	useEffect(() => {
		const priceButtonList = getAllButtonElement(price.current);
		SetPriceBtn(Array.from(priceButtonList));
	}, []);
	useEffect(() => {
		if (priceBtn && priceRange !== null) {
			const activeBtn = priceBtn.filter(ele => ele.id === priceRange.toString());
			if (activeBtn) {
				activeBtn[0].classList.add('active');
			}
		}
	}, [priceBtn]);
	useEffect(() => {
		console.log(categories);
		if (categories.length === 0) {
			clearActiveClass();
		}
	}, []);
	return (
		<div ref={price} onClick={handlePriceBtn}>
			<Button isLabel={false} label={currencyStatus ? '1-100' : '500-1000'} buttonType='filterButton'>
				<Currency status={currencyStatus} />
				<span>{currencyStatus ? '1 - 100' : '500 - 1000'}</span>
			</Button>
			<Button isLabel={false} label={currencyStatus ? '100-200' : '2000-3000'} buttonType='filterButton'>
				<Currency status={currencyStatus} />
				<span>{currencyStatus ? '100 - 200' : '2000 - 3000'}</span>
			</Button>
			<Button isLabel={false} label={currencyStatus ? '200-500' : '3000-5000'} buttonType='filterButton'>
				<Currency status={currencyStatus} />
				<span>{currencyStatus ? '200 - 500' : '3000 - 5000'}</span>
			</Button>
			<Button isLabel={false} label={currencyStatus ? '500-1000' : '5000-10000'} buttonType='filterButton'>
				<Currency status={currencyStatus} />
				<span>{currencyStatus ? '500 - 1000' : '5000 - 10000'}</span>
			</Button>
			<Button isLabel={false} label={currencyStatus ? '1000' : '10000'} buttonType='filterButton'>
				<Currency status={currencyStatus} />
				<span>{currencyStatus ? 'Above 1000' : 'Above 10000'}</span>
			</Button>
		</div>
	);
};
const Rating = () => {
	const rating = useRef();
	const dispatch = useDispatch();
	const [ratingBtn, setRatingBtn] = useState(null);
	const ratingRange = useSelector((state) => state.filter.ratingRange);
	const handleRatingBtn = (e) => {
		const ratingButton = e.target.closest('button');
		if (ratingButton) {
			const rateRange = ratingButton.id;
			if (ratingButton.classList.contains('active')) {
				ratingButton.classList.remove('active');
				dispatch(removeRatingRange(null));
			} else {
				clearActiveClass();
				ratingButton.classList.add('active');
				dispatch(setRatingRange(rateRange));
			}
		}
	};
	function clearActiveClass() {
		if (ratingBtn) {
			ratingBtn.forEach(element => {
				element.classList.remove('active');
			});
		}
	}
	useEffect(() => {
		const ratingButtonList = getAllButtonElement(rating.current);
		setRatingBtn(Array.from(ratingButtonList));
	}, []);
	useEffect(() => {
		if (ratingBtn && ratingRange !== null) {
			const activeBtn = ratingBtn.filter(ele => ele.id === ratingRange);
			if (activeBtn) {
				activeBtn[0].classList.add('active');
			}
		}
	}, [ratingBtn]);
	return (
		<div ref={rating} onClick={handleRatingBtn}>
			<Button isLabel={false} label="1" buttonType='filterButton'>
				<span>⭐1 & Above</span>
			</Button>

			<Button isLabel={false} label="2" buttonType='filterButton'>
				<span>⭐⭐2 & Above</span>
			</Button>
			<Button isLabel={false} label="3" buttonType='filterButton'>
				<span>⭐⭐⭐ 3 & Above</span>
			</Button>
			<Button isLabel={false} label="4" buttonType='filterButton'>
				<span>⭐⭐⭐⭐ 4 & Above</span>
			</Button>
		</div>
	);
};
export { Category, Price, Rating };