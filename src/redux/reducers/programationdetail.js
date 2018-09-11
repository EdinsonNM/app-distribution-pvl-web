import { handleActions } from 'redux-actions';
const initialState = {
	data: [],
	error:{}
};
const reducer = handleActions({
	PROGRAMATIONDETAILS_SAVE: (state, action) => ({
        ...state, totalSaved: 0
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
	}
}, initialState);


export default reducer;