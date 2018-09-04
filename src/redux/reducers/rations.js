import { handleActions } from 'redux-actions';
const initialState = {
	periods: [],
	data: [],
	error:{}
};
const reducer = handleActions({
	PERIOD_RATIONS_LOAD: (state, action) => ({
		...state, queryRations: action.payload.query, pageRations: action.payload.page
	}),
	PERIOD_RATIONS_LOAD_OK: {
		next: (state, action) => ({
			...state, periods: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	PERIOD_RATIONS_LOAD_RATIONS_OK: {
		next: (state, action) => {
			let periods = action.payload.map((item, index) => ({
				...state.periods[index],
				rations: item
			}));
			return {
				...state,
				periods
			}
		},
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	RATIONS_LOAD_OK: {
		next: (state, action) => ({
			...state, data: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	RATIONS_SAVE_OK: {
		next: (state, action) => ({
			...state, ration: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
}, initialState);


export default reducer;