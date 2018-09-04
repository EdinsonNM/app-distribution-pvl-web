import {createActions} from 'redux-actions';

export const COMMITTEES_LOAD = 'COMMITTEES_LOAD';
export const COMMITTEES_LOAD_OK = 'COMMITTEES_LOAD_OK';

export const COMMITTEES_LOAD_SEARCH = 'COMMITTEES_LOAD_SEARCH';
export const COMMITTEES_LOAD_PAGEBACK = 'COMMITTEES_LOAD_PAGEBACK';
export const COMMITTEES_LOAD_PAGENEXT = 'COMMITTEES_LOAD_PAGENEXT';


const actionsCreator = createActions(
	{
		COMMITTEES_LOAD: (query = '', page = 0, limit = 10) => ({ query: query.toUpperCase(), page, limit }),
	},
	COMMITTEES_LOAD_OK,
	COMMITTEES_LOAD_SEARCH,
	COMMITTEES_LOAD_PAGEBACK,
	COMMITTEES_LOAD_PAGENEXT
);
export const {
	committeesLoad,
	committeesLoadOk,
	committeesLoadSearch,
	committeesLoadPageback,
	committeesLoadPageNext,
} = actionsCreator;