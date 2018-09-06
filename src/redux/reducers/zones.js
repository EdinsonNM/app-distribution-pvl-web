import { handleActions } from 'redux-actions';
const initialState = {
	data: [],
	error:{}
};
const reducer = handleActions({
	ZONES_LOAD_OK: {
		next: (state, action) => ({
			...state, data: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	ZONE_SAVE_OK: {
		next: (state, action) => ({
			...state, zone: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	ZONE_COMMITTEES_LOAD: (state, action) => ({
			...state, committees: []
	}),
	ZONE_COMMITTEES_LOAD_OK: {
		next: (state, action) => ({
			...state, committees: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
}, initialState);


export default reducer;