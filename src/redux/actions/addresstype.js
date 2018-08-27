import {createActions} from 'redux-actions';

export const ADDRESSTYPE_LOAD = 'ADDRESSTYPE_LOAD';
export const ADDRESSTYPE_LOAD_OK = 'ADDRESSTYPE_LOAD_OK';


const actionsCreator = createActions(
	{},
	ADDRESSTYPE_LOAD,
	ADDRESSTYPE_LOAD_OK
);
export const {
	addresstypeLoad,
	addresstypeLoadOk
} = actionsCreator;