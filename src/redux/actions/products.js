import {createActions} from 'redux-actions';

export const PRODUCTS_LOAD = 'PRODUCTS_LOAD';
export const PRODUCTS_LOAD_OK = 'PRODUCTS_LOAD_OK';


const actionsCreator = createActions(
	{},
	PRODUCTS_LOAD,
	PRODUCTS_LOAD_OK
);
export const {
	productsLoad,
	productsLoadOk
} = actionsCreator;