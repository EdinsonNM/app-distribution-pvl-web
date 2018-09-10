import { handleActions } from 'redux-actions';
const initialState = {
	data: [],
	error:{}
};
const reducer = handleActions({
	INCOMES_LOAD_OK: {
		next: (state, action) => ({
			...state, data: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	INCOME_SAVE_OK: {
		next: (state, action) => ({
			...state, income: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	INCOME_COMMITTEES_LOAD: (state, action) => ({
			...state, committees: []
	}),
	INCOME_COMMITTEES_LOAD_OK: {
		next: (state, action) => ({
			...state, committees: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	INCOMES_LOAD_PRODUCTS_OK:{
		next: (state, action) => {
			let data = state.data.map((item, index) => ({
				...item,
				product: action.payload[index].name
			}))
			return {
				...state,
				data
			}
		},
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
}, initialState);


export default reducer;