import {createActions} from 'redux-actions';

export const PRODUCTS_LOAD = 'PRODUCTS_LOAD';
export const PRODUCTS_LOAD_OK = 'PRODUCTS_LOAD_OK';

export const PRODUCT_LOAD = 'PRODUCT_LOAD';
export const PRODUCT_LOAD_OK = 'PRODUCT_LOAD_OK';

export const PRODUCT_SAVE = 'PRODUCT_SAVE';
export const PRODUCT_SAVE_OK = 'PRODUCT_SAVE_OK';

export const PRODUCT_UPDATE = 'PRODUCT_UPDATE';
export const PRODUCT_UPDATE_OK = 'PRODUCT_UPDATE_OK';
export const PRODUCT_DELETE = 'PRODUCT_DELETE';
export const PRODUCT_DELETE_OK = 'PRODUCT_DELETE_OK';

const actionsCreator = createActions(
	{},
	PRODUCTS_LOAD,
	PRODUCTS_LOAD_OK,
	PRODUCT_SAVE,
	PRODUCT_SAVE_OK,
	PRODUCT_UPDATE,
	PRODUCT_UPDATE_OK,
	PRODUCT_LOAD,
	PRODUCT_LOAD_OK,
	PRODUCT_DELETE,
	PRODUCT_DELETE_OK
);
export const {
	productsLoad,
	productsLoadOk,
	productSave,
	productSaveOk,
	productUpdate,
	productUpdateOk,
	productLoad,
	productLoadOk,
	productDelete,
	productDeleteOk
} = actionsCreator;