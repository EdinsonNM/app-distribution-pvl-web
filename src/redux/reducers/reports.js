import { handleActions } from 'redux-actions';
const initialState = {
	input_output_data: [],
	error:{}
};
const reducer = handleActions({
	INPUTS_LOAD_OK: {
		next: (state, action) => ({
			...state, input_output_data: action.payload
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
    },
    OUTPUTS_LOAD_OK: {
		next: (state, action) => ({
			...state, input_output_data: state.input_output_data.concat(action.payload).sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
            }).reverse()
		}),
		throw: (state, action) => ({
			...state, error: {message: action.payload.message, status: action.payload.status}
		}),
	},
	
}, initialState);


export default reducer;