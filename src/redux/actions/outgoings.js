import {createActions} from 'redux-actions';

export const OUTGOINGS_LOAD = 'OUTGOINGS_LOAD';
export const OUTGOINGS_LOAD_OK = 'OUTGOINGS_LOAD_OK';

export const OUTGOINGS_LOAD_SEARCH = 'OUTGOINGS_LOAD_SEARCH';
export const OUTGOINGS_LOAD_PAGEBACK = 'OUTGOINGS_LOAD_PAGEBACK';
export const OUTGOINGS_LOAD_PAGENEXT = 'OUTGOINGS_LOAD_PAGENEXT';

export const OUTGOING_SAVE = 'OUTGOING_SAVE';
export const OUTGOING_SAVE_OK = 'OUTGOING_SAVE_OK';

export const OUTGOING_UPDATE = 'OUTGOING_UPDATE';
export const OUTGOING_UPDATE_OK = 'OUTGOING_UPDATE_OK';

export const OUTGOING_DELETE = 'OUTGOING_DELETE';
export const OUTGOING_DELETE_OK = 'OUTGOING_DELETE_OK';

const actionsCreator = createActions(
	{
		OUTGOINGS_LOAD: (query = '', page = 0, limit = 10) => ({ query: query.toUpperCase(), page, limit }),
	},
	OUTGOINGS_LOAD_OK,
	OUTGOINGS_LOAD_SEARCH,
	OUTGOINGS_LOAD_PAGEBACK,
	OUTGOINGS_LOAD_PAGENEXT,
	OUTGOING_SAVE,
	OUTGOING_SAVE_OK,
	OUTGOING_UPDATE,
	OUTGOING_UPDATE_OK,
	OUTGOING_DELETE,
	OUTGOING_DELETE_OK
);
export const {
	outgoingsLoad,
	outgoingsLoadOk,
	outgoingsLoadSearch,
	outgoingsLoadPageback,
	outgoingsLoadPageNext,
	outgoingSave,
	outgoingSaveOk,
	outgoingUpdate,
	outgoingUpdateOk,
	outgoingDetlete,
	outgoingDeleteOk,
} = actionsCreator;