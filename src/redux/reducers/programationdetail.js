import { handleActions } from 'redux-actions';
const initialState = {
	data: [],
	error:{}
};
const reducer = handleActions({
	PROGRAMATIONDETAILS_SAVE: (state, action) => ({
        ...state, totalSaved: 0
	}),
	PROGRAMATIONDETAILS_LOAD: (action, state) => ({
		...state, distributions: []
	}),
	PROGRAMATIONDETAIL_SAVE_OK: {
		next: (state, action) => {
            let totalSaved = state.totalSaved + 1;
			return {
                ...state, totalSaved
            }
		},
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	PROGRAMATIONDETAILS_LOAD_OK: {
		next: (state, action) => ({
			...state, distributions: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	}
}, initialState);


export default reducer;