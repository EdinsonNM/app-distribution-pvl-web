import { handleActions } from 'redux-actions';
const initialState = {
	committees: [],
	error:{},
	page: 0,
	limit: 0
};
const reducer = handleActions({
	COMMITTEES_LOAD: (state, action) => ({
		...state, committees: []
	}),
	COMMITTEES_LOAD_OK: {
		next: (state, action) => ({
			...state, committees: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	}
}, initialState);


export default reducer;