import {createActions} from 'redux-actions';

export const PRODUCTS_LOAD = 'PRODUCTS_LOAD';
export const PRODUCTS_LOAD_OK = 'PRODUCTS_LOAD_OK';

export const PRODUCT_SAVE = 'PRODUCT_SAVE';
export const PRODUCT_SAVE_OK = 'PRODUCT_SAVE_OK';

const actionsCreator = createActions(
	{},
	PRODUCTS_LOAD,
	PRODUCTS_LOAD_OK,
	PRODUCT_SAVE,
	PRODUCT_SAVE_OK
);
export const {
	productsLoad,
	productsLoadOk,
	productSave,
	productSaveOk
} = actionsCreator;