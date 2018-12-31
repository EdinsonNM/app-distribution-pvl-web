import {createActions} from 'redux-actions';

export const BENEFITTYPE_LOAD = 'BENEFITTYPE_LOAD';
export const BENEFITTYPE_LOAD_OK = 'BENEFITTYPE_LOAD_OK';


const actionsCreator = createActions(
	{},
	BENEFITTYPE_LOAD,
	BENEFITTYPE_LOAD_OK
);
export const {
	benefittypeLoad,
	benefittypeLoadOk
} = actionsCreator;