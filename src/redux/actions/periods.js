import {createActions} from 'redux-actions';

export const PERIODS_LOAD = 'PERIODS_LOAD';
export const PERIODS_LOAD_OK = 'PERIODS_LOAD_OK';

export const PERIOD_LOAD = 'PERIOD_LOAD';
export const PERIOD_LOAD_OK = 'PERIOD_LOAD_OK';

export const PERIOD_DEFAULT_SELECT = 'PERIOD_DEFAULT_SELECT';

const actionsCreator = createActions(
	{},
	PERIODS_LOAD,
	PERIODS_LOAD_OK,
	PERIOD_LOAD,
	PERIOD_LOAD_OK,
	PERIOD_DEFAULT_SELECT
);
export const {
	periodsLoad,
	periodsLoadOk,
	periodLoad,
	periodLoadOk,
	periodDefaultSelect
} = actionsCreator;