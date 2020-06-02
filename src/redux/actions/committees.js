import {createActions} from 'redux-actions';

export const COMMITTEES_LOAD = 'COMMITTEES_LOAD';
export const COMMITTEES_LOAD_OK = 'COMMITTEES_LOAD_OK';

export const COMMITTEES_SAVE = 'COMMITTEES_SAVE';
export const COMMITTEES_SAVE_OK = 'COMMITTEES_SAVE_OK';

export const COMMITTEES_LOAD_SEARCH = 'COMMITTEES_LOAD_SEARCH';
export const COMMITTEES_LOAD_PAGEBACK = 'COMMITTEES_LOAD_PAGEBACK';
export const COMMITTEES_LOAD_PAGENEXT = 'COMMITTEES_LOAD_PAGENEXT';

export const COMMITTEES_DELETE = 'COMMITTEES_DELETE';
export const COMMITTEES_DELETE_OK = 'COMMITTEES_DELETE_OK';

const actionsCreator = createActions(
	{
		COMMITTEES_LOAD: (query = '', page = 0, limit = 10) => ({ query: query.toUpperCase(), page, limit }),
	},
	COMMITTEES_LOAD_OK,
	COMMITTEES_LOAD_SEARCH,
	COMMITTEES_LOAD_PAGEBACK,
	COMMITTEES_LOAD_PAGENEXT,
	COMMITTEES_SAVE,
	COMMITTEES_SAVE_OK,
	COMMITTEES_DELETE,
	COMMITTEES_DELETE_OK
);
export const {
	committeesLoad,
	committeesLoadOk,
	committeesLoadSearch,
	committeesLoadPageback,
	committeesLoadPageNext,
	committeesSave,
	committeesSaveOk,
	committeesDelete,
	committeesDeleteOk
} = actionsCreator;