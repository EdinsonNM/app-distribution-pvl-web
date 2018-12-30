import {createActions} from 'redux-actions';

export const INPUTS_OUTPUTS_LOAD = 'INPUTS_OUTPUTS_LOAD';
export const INPUTS_LOAD_OK = 'INPUTS_LOAD_OK';
export const OUTPUTS_LOAD_OK = 'OUTPUTS_LOAD_OK';


const actionsCreator = createActions(
	{
        INPUTS_OUTPUTS_LOAD: (year, month, productId) => ({year, month, productId}),
    },
    INPUTS_LOAD_OK,
    OUTPUTS_LOAD_OK
);
export const {
	inputsOutputsLoad,
    inputsLoadOk,
    outputsLoadOk
} = actionsCreator;