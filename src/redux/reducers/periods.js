import { handleActions } from 'redux-actions';
const initialState = {
	data: [],
	error:{}
};
const reducer = handleActions({
	PERIODS_LOAD_OK: {
		next: (state, action) => ({
			...state, data: action.payload, periodDefault: action.payload[0].id
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	PERIOD_LOAD_OK: {
		next: (state, action) => ({
			...state, period: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	PERIOD_DEFAULT_SELECT: (state, action) => ({
		...state, periodDefault: action.payload
	})
}, initialState);


export default reducer;