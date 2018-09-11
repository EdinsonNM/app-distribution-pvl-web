import { handleActions } from 'redux-actions';
import {UNIT_MEASURENMENT} from '../../contants/unit_of _measurement';
const initialState = {
	data: [],
	error:{}
};
const reducer = handleActions({
	PRODUCTS_LOAD_OK: {
		next: (state, action) => ({
			...state, data: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	PRODUCT_LOAD_OK: {
		next: (state, action) => {
			let product = {
				name: action.payload.name,
				unitOfMeasure: {value: action.payload.unitOfMeasure, label: UNIT_MEASURENMENT[action.payload.unitOfMeasure]},
				unitOfMeasureConversion: {value: action.payload.unitOfMeasureConversion, label: UNIT_MEASURENMENT[action.payload.unitOfMeasureConversion]},
				quantityConversion: action.payload.quantityConversion,
			}
			return {
				...state, product
			}
		},
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	}
}, initialState);


export default reducer;