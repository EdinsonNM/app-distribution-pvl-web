import { handleActions } from 'redux-actions';
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
	}
}, initialState);


export default reducer;