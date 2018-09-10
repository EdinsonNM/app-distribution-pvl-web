import { handleActions } from 'redux-actions';
import { months } from '../../contants/months';
const initialState = {
	committees: [],
	error:{}
};
const reducer = handleActions({
	DISTRIBUTION_COMMITTEES_LOAD_OK: {
		next: (state, action) => ({
			...state, committees: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	DISTRIBUTION_LOAD_BENEFICIARIES_COUNT_OK: {
		next: (state, action) => {
			let committees = state.committees;
			let committee = committees.find(c => action.payload.committee === c.id)
			committee.beneficiaries =  action.payload.count
			return {
				...state, committees
			}
		},
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	DISTRIBUTIONS_LOAD_OK: {
		next: (state, action) => {
			let distributionsGroup = {}
			months.forEach((month, index) => {
				distributionsGroup[index] = {
					monthIndex: index,
					month,
					distributions : []
				}
			})
			action.payload.forEach(item => {
				distributionsGroup[item.month].distributions.push(item); 
			})
			return {
				...state, distributionsGroup
			}
		},
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	}
}, initialState);


export default reducer;