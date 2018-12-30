import {createActions} from 'redux-actions';

export const DOCUMENTTYPE_LOAD = 'DOCUMENTTYPE_LOAD';
export const DOCUMENTTYPE_LOAD_OK = 'DOCUMENTTYPE_LOAD_OK';


const actionsCreator = createActions(
	{},
	DOCUMENTTYPE_LOAD,
	DOCUMENTTYPE_LOAD_OK
);
export const {
	documenttypeLoad,
	documenttypeLoadOk
} = actionsCreator;