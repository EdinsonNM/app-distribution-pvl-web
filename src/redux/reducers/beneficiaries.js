import { handleActions } from 'redux-actions';

const initialState = {
	committees: [],
	data: [],
	error:{},
	committeeSelected: null
};
const reducer = handleActions({
	COMMITTEES_BENEFICIARIES_LOAD: (state, action) => ({
		...state, queryCommittees: action.payload.query, pageCommittees: action.payload.page
	}),
	COMMITTEES_BENEFICIARIES_LOAD_OK: {
		next: (state, action) => ({
			...state, committees: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	COMMITTEES_BENEFICIARIES_LOAD_COUNT_OK: {
		next: (state, action) => {
			let committees = action.payload.map((item, index) => ({
				...state.committees[index],
				beneficiaries: item.count
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
	BENEFICIARIES_LOAD_OK: {
		next: (state, action) => ({
			...state, data: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	COMMITTEES_BENEFICIARIES_TOTAL_COUNT_OK: {
		next: (state, action) => ({
			...state, totalCommittees: action.payload.count
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	COMMITTEE_SELECTED: (state, action) => ({
		...state, committeeSelected: action.payload
	}),
}, initialState);


export default reducer;