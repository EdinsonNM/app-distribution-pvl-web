import {createActions} from 'redux-actions';


export const COMMITTEES_BENEFICIARIES_LOAD = 'COMMITTEES_BENEFICIARIES_LOAD';
export const COMMITTEES_BENEFICIARIES_LOAD_OK = 'COMMITTEES_BENEFICIARIES_LOAD_OK';
export const COMMITTEES_BENEFICIARIES_LOAD_COUNT_OK = 'COMMITTEES_BENEFICIARIES_LOAD_COUNT_OK';
export const COMMITTEES_BENEFICIARIES_TOTAL_COUNT_OK = 'COMMITTEES_BENEFICIARIES_TOTAL_COUNT_OK';

export const BENEFICIARIES_LOAD = 'BENEFICIARIES_LOAD';
export const BENEFICIARIES_LOAD_SEARCH = 'BENEFICIARIES_LOAD_SEARCH';

export const BENEFICIARIES_LOAD_OK = 'BENEFICIARIES_LOAD_OK';
export const COMMITTEES_BENEFICIARIES_LOAD_SEARCH = 'COMMITTEES_BENEFICIARIES_LOAD_SEARCH';
export const COMMITTEES_BENEFICIARIES_LOAD_PAGEBACK = 'COMMITTEES_BENEFICIARIES_LOAD_PAGEBACK';
export const COMMITTEES_BENEFICIARIES_LOAD_PAGENEXT = 'COMMITTEES_BENEFICIARIES_LOAD_PAGENEXT';


const actionsCreator = createActions(
	{
		COMMITTEES_BENEFICIARIES_LOAD: (page = 0, query = '') => ({ page, query: query.toUpperCase() }),
		COMMITTEES_BENEFICIARIES_LOAD_SEARCH: (query = '') => ({query, page: 0}),

		BENEFICIARIES_LOAD: (id, page = 0, query = '', column = 'names') => ({ id, page, query: query.toUpperCase(), column }),
		BENEFICIARIES_LOAD_SEARCH: (id, query = '', column= 'names') => ({id, column, query}),
	},
	COMMITTEES_BENEFICIARIES_LOAD_PAGEBACK,
	COMMITTEES_BENEFICIARIES_LOAD_PAGENEXT,
	COMMITTEES_BENEFICIARIES_LOAD_OK,
	COMMITTEES_BENEFICIARIES_LOAD_COUNT_OK,
	COMMITTEES_BENEFICIARIES_TOTAL_COUNT_OK,
	BENEFICIARIES_LOAD_OK
);
export const {
	committeesBeneficiariesLoad,
	committeesBeneficiariesLoadOk,
	beneficiariesLoad,
	beneficiariesLoadOk,
	beneficiariesLoadSearch,
	committeesBeneficiariesLoadCountOk,
	committeesBeneficiariesLoadSearch,
	committeesBeneficiariesTotalCountOk,
	committeesBeneficiariesLoadPageback,
	committeesBeneficiariesLoadPagenext
} = actionsCreator;