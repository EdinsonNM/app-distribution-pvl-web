import { handleActions } from 'redux-actions';
import { months } from '../../contants/months';
const initialState = {
	committees: [],
	error:{},
	programationsGroup: {}
};
const reducer = handleActions({
	PROGRAMATION_COMMITTEES_LOAD: (state, action) => ({
		...state, committeeBenefLoaded:0
	}),
	PROGRAMATION_COMMITTEES_LOAD_OK: {
		next: (state, action) => ({
			...state, committees: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	PROGRAMATION_LOAD_BENEFICIARIES_COUNT_OK: {
		next: (state, action) => {
			let committees = state.committees;
			let committee = committees.find(c => action.payload.committee === c.id)
			let committeeBenefLoaded = state.committeeBenefLoaded + 1
			committee.beneficiaries =  action.payload.count
			return {
				...state, committees, committeeBenefLoaded
			}
		},
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	PROGRAMATIONS_LOAD_OK: {
		next: (state, action) => {
			let programationsGroup = {}
			months.forEach((month, index) => {
				programationsGroup[index] = {
					monthIndex: index,
					month,
					programations : []
				}
			})
			action.payload.forEach(item => {
				programationsGroup[item.month].programations.push(item); 
			})
			return {
				...state, programationsGroup
			}
		},
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	}
}, initialState);


export default reducer;