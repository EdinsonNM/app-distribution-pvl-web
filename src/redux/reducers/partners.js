import { handleActions } from 'redux-actions';
import { COMMITTEES_PARTNERS_TOTAL_COUNT_OK } from '../actions/partners';
const initialState = {
	committees: [],
	data: [],
	error:{}
};
const reducer = handleActions({
	COMMITTEES_PARTNERS_LOAD: (state, action) => ({
		...state, queryCommittees: action.payload.query, pageCommittees: action.payload.page
	}),
	COMMITTEES_PARTNERS_LOAD_OK: {
		next: (state, action) => ({
			...state, committees: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	COMMITTEES_PARTNERS_LOAD_COUNT_OK: {
		next: (state, action) => {
			let committees = action.payload.map((item, index) => ({
				...state.committees[index],
				partners: item.count
			}));
			return {
				...state,
				committees
			}
		},
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	PARTNERS_LOAD_OK: {
		next: (state, action) => ({
			...state, data: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	PARTNERS_LOAD_COUNT_OK: {
		next: (state, action) => ({
			...state, totalPartners: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	COMMITTEES_PARTNERS_TOTAL_COUNT_OK: {
		next: (state, action) => ({
			...state, totalCommittees: action.payload.count
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	}
}, initialState);


export default reducer;