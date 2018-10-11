import {createActions} from 'redux-actions';


export const COMMITTEES_PARTNERS_LOAD = 'COMMITTEES_PARTNERS_LOAD';
export const COMMITTEES_PARTNERS_LOAD_OK = 'COMMITTEES_PARTNERS_LOAD_OK';
export const COMMITTEES_PARTNERS_LOAD_COUNT_OK = 'COMMITTEES_PARTNERS_LOAD_COUNT_OK';
export const PARTNERS_LOAD = 'PARTNERS_LOAD';
export const PARTNERS_LOAD_OK = 'PARTNERS_LOAD_OK';
export const PARTNERS_LOAD_SEARCH = 'PARTNERS_LOAD_SEARCH';
export const PARTNERS_LOAD_PAGEBACK = 'PARTNERS_LOAD_PAGEBACK';
export const PARTNERS_LOAD_PAGENEXT = 'PARTNERS_LOAD_PAGENEXT';
export const PARTNERS_LOAD_COUNT_OK = 'PARTNERS_LOAD_COUNT_OK';

export const COMMITTEES_PARTNERS_LOAD_SEARCH = 'COMMITTEES_PARTNERS_LOAD_SEARCH';
export const COMMITTEES_PARTNERS_LOAD_PAGEBACK = 'COMMITTEES_PARTNERS_LOAD_PAGEBACK';
export const COMMITTEES_PARTNERS_LOAD_PAGENEXT = 'COMMITTEES_PARTNERS_LOAD_PAGENEXT';


const actionsCreator = createActions(
	{
		COMMITTEES_PARTNERS_LOAD: (page = 0, query = '') => ({ page, query: query.toUpperCase() }),
		COMMITTEES_PARTNERS_LOAD_SEARCH: (query = '') => ({query, page: 0}),
		PARTNERS_LOAD: (id, page = 0, query = '', column = 'names') => ({ id, page, query: query.toUpperCase(), column }),
		PARTNERS_LOAD_SEARCH: (id, query = '', column= 'names') => ({id, column, query}),
	},
	COMMITTEES_PARTNERS_LOAD_PAGEBACK,
	COMMITTEES_PARTNERS_LOAD_PAGENEXT,
	COMMITTEES_PARTNERS_LOAD_OK,
	COMMITTEES_PARTNERS_LOAD_COUNT_OK,
	PARTNERS_LOAD_OK,
	PARTNERS_LOAD_COUNT_OK
	);
export const {
	committeesPartnersLoad,
	committeesPartnersLoadOk,
	partnersLoad,
	partnersLoadSearch,
	partnersLoadOk,
	committeesPartnersLoadCountOk,
	committeesPartnersLoadSearch,
	partnersLoadCountOk
} = actionsCreator;