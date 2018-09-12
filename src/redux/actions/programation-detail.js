import {createActions} from 'redux-actions';

export const PROGRAMATIONDETAILS_LOAD = 'PROGRAMATIONDETAILS_LOAD';
export const PROGRAMATIONDETAILS_LOAD_OK = 'PROGRAMATIONDETAILS_LOAD_OK';

export const PROGRAMATIONDETAIL_LOAD = 'PROGRAMATIONDETAIL_LOAD';
export const PROGRAMATIONDETAIL_LOAD_OK = 'PROGRAMATIONDETAIL_LOAD_OK';


export const PROGRAMATIONDETAILS_SAVE = 'PROGRAMATIONDETAILS_SAVE';
export const PROGRAMATIONDETAIL_SAVE = 'PROGRAMATIONDETAIL_SAVE';
export const PROGRAMATIONDETAIL_SAVE_OK = 'PROGRAMATIONDETAIL_SAVE_OK';

export const PROGRAMATIONDETAILS_UPDATEDISTRIBUTION = 'PROGRAMATIONDETAILS_UPDATEDISTRIBUTION';
export const PROGRAMATIONDETAILS_UPDATEDISTRIBUTION_OK = 'PROGRAMATIONDETAILS_UPDATEDISTRIBUTION_OK';

export const PROGRAMATIONDETAIL_UPDATEDISTRIBUTION = 'PROGRAMATIONDETAIL_UPDATEDISTRIBUTION';

const actionsCreator = createActions(
	{
        PROGRAMATIONDETAILS_SAVE: (programation, details) => ({programation, details}),
        PROGRAMATIONDETAILS_UPDATEDISTRIBUTION: (programationId, committees) => ({programationId, committees}),
    },
	PROGRAMATIONDETAILS_LOAD,
	PROGRAMATIONDETAILS_LOAD_OK,
	PROGRAMATIONDETAIL_LOAD,
    PROGRAMATIONDETAIL_LOAD_OK,
    PROGRAMATIONDETAIL_SAVE,
    PROGRAMATIONDETAIL_SAVE_OK,

    PROGRAMATIONDETAILS_UPDATEDISTRIBUTION_OK,
    PROGRAMATIONDETAIL_UPDATEDISTRIBUTION
);
export const {
	programationdetailsLoad,
	programationdetailsLoadOk,
	programationdetailLoad,
    programationdetailLoadOk,
    programationdetailsSave,
    programationdetailSave,
    programationdetailSaveOk,
    programationdetailsUpdatedistribution,
    programationdetailsUpdatedistributionOk,
    programationdetailUpdatedistribution
} = actionsCreator;