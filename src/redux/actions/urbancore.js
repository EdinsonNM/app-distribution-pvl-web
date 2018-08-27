import {createActions} from 'redux-actions';

export const URBANCORE_LOAD = 'URBANCORE_LOAD';
export const URBANCORE_LOAD_OK = 'URBANCORE_LOAD_OK';


const actionsCreator = createActions(
	{},
	URBANCORE_LOAD,
	URBANCORE_LOAD_OK
);
export const {
	urbancoreLoad,
	urbancoreLoadOk
} = actionsCreator;