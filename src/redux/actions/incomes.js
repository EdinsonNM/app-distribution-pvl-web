import {createActions} from 'redux-actions';

export const INCOMES_LOAD = 'INCOMES_LOAD';
export const INCOMES_LOAD_OK = 'INCOMES_LOAD_OK';
export const INCOMES_LOAD_PRODUCTS_OK = 'INCOMES_LOAD_PRODUCTS_OK';

export const INCOMES_LOAD_SEARCH = 'INCOMES_LOAD_SEARCH';
export const INCOMES_LOAD_PAGEBACK = 'INCOMES_LOAD_PAGEBACK';
export const INCOMES_LOAD_PAGENEXT = 'INCOMES_LOAD_PAGENEXT';

export const INCOME_SAVE = 'INCOME_SAVE';
export const INCOME_SAVE_OK = 'INCOME_SAVE_OK';

export const INCOME_UPDATE = 'INCOME_UPDATE';
export const INCOME_UPDATE_OK = 'INCOME_UPDATE_OK';

export const INCOME_DELETE = 'INCOME_DELETE';
export const INCOME_DELETE_OK = 'INCOME_DELETE_OK';

const actionsCreator = createActions(
	{
		INCOMES_LOAD: (query = '', page = 0, limit = 10) => ({ query: query.toUpperCase(), page, limit }),
	},
	INCOMES_LOAD_OK,
	INCOMES_LOAD_SEARCH,
	INCOMES_LOAD_PAGEBACK,
	INCOMES_LOAD_PAGENEXT,
	INCOME_SAVE,
	INCOME_SAVE_OK,
	INCOME_UPDATE,
	INCOME_UPDATE_OK,
	INCOME_DELETE,
	INCOME_DELETE_OK,
	INCOMES_LOAD_PRODUCTS_OK
);
export const {
	incomesLoad,
	incomesLoadOk,
	incomesLoadSearch,
	incomesLoadPageback,
	incomesLoadPageNext,
	incomeSave,
	incomeSaveOk,
	incomeUpdate,
	incomeUpdateOk,
	incomeDetlete,
	incomeDeleteOk,
	incomesLoadProductsOk
} = actionsCreator;