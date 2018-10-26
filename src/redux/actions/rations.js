import {createActions} from 'redux-actions';


export const PERIOD_RATIONS_LOAD = 'PERIOD_RATIONS_LOAD';
export const PERIOD_RATIONS_LOAD_OK = 'PERIOD_RATIONS_LOAD_OK';
export const PERIOD_RATIONS_LOAD_RATIONS_OK = 'PERIOD_RATIONS_LOAD_RATIONS_OK';
export const RATIONS_LOAD = 'RATIONS_LOAD';
export const RATIONS_LOAD_OK = 'RATIONS_LOAD_OK';
export const PERIOD_RATIONS_LOAD_SEARCH = 'PERIOD_RATIONS_LOAD_SEARCH';
export const PERIOD_RATIONS_LOAD_PAGEBACK = 'PERIOD_RATIONS_LOAD_PAGEBACK';
export const PERIOD_RATIONS_LOAD_PAGENEXT = 'PERIOD_RATIONS_LOAD_PAGENEXT';
export const RATION_SAVE = 'RATION_SAVE';
export const RATION_SAVE_OK = 'RATION_SAVE_OK';

export const RATIONS_DELETE = 'RATIONS_DELETE';
export const RATIONS_DELETE_OK = 'RATIONS_DELETE_OK';


const actionsCreator = createActions(
	{
		PERIOD_RATIONS_LOAD: (page = 0, query = '') => ({ page, query: query.toUpperCase() }),
		PERIOD_RATIONS_LOAD_SEARCH: (query = '') => ({query, page: 0}),
	},
	PERIOD_RATIONS_LOAD_PAGEBACK,
	PERIOD_RATIONS_LOAD_PAGENEXT,
	PERIOD_RATIONS_LOAD_OK,
	PERIOD_RATIONS_LOAD_RATIONS_OK,
	RATIONS_LOAD,
	RATIONS_LOAD_OK,
	RATION_SAVE,
	RATION_SAVE_OK,
	RATIONS_DELETE,
	RATIONS_DELETE_OK
);
export const {
	periodRationsLoad,
	periodRationsLoadOk,
	rationsLoad,
	rationsLoadOk,
	periodRationsLoadRationsOk,
	periodRationsLoadSearch,
	rationSave,
	rationSaveOk,
	rationsDelete,
	rationsDeleteOk
} = actionsCreator;