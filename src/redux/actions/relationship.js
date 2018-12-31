import {createActions} from 'redux-actions';

export const RELATIONSHIPS_LOAD = 'RELATIONSHIPS_LOAD';
export const RELATIONSHIPS_LOAD_OK = 'RELATIONSHIPS_LOAD_OK';


const actionsCreator = createActions(
	{},
	RELATIONSHIPS_LOAD,
	RELATIONSHIPS_LOAD_OK
);
export const {
	relationshipsLoad,
	relationshipsLoadOk
} = actionsCreator;