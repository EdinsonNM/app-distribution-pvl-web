import {createActions} from 'redux-actions';

export const COMMITTEES_LOAD = 'COMMITTEES_LOAD';
export const COMMITTEES_LOAD_OK = 'COMMITTEES_LOAD_OK';


const actionsCreator = createActions(
	{},
	COMMITTEES_LOAD,
	COMMITTEES_LOAD_OK
);
export const {
	committeesLoad,
	committeesLoadOk
} = actionsCreator;