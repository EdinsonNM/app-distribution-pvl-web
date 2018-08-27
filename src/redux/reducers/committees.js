import { handleActions } from 'redux-actions';
const initialState = {
	committees: [],
	error:{}
};
const reducer = handleActions({
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