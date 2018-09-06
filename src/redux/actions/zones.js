import {createActions} from 'redux-actions';


export const ZONES_LOAD = 'ZONES_LOAD';
export const ZONES_LOAD_OK = 'ZONES_LOAD_OK';
export const ZONE_LOAD = 'ZONE_LOAD';
export const ZONE_LOAD_OK = 'ZONE_LOAD_OK';
export const ZONE_SAVE = 'ZONE_SAVE';
export const ZONE_SAVE_OK = 'ZONE_SAVE_OK';
export const ZONE_UPDATE = 'ZONE_UPDATE';
export const ZONE_UPDATE_OK = 'ZONE_UPDATE_OK';


export const ZONE_COMMITTEES_LOAD = 'ZONE_COMMITTEES_LOAD';
export const ZONE_COMMITTEES_LOAD_OK = 'ZONE_COMMITTEES_LOAD_OK';

const actionsCreator = createActions(
	{
	},
	ZONES_LOAD,
	ZONES_LOAD_OK,
	ZONE_LOAD,
	ZONE_LOAD_OK,
	ZONE_SAVE,
	ZONE_SAVE_OK,
	ZONE_UPDATE,
	ZONE_UPDATE_OK,
	ZONE_COMMITTEES_LOAD,
	ZONE_COMMITTEES_LOAD_OK
);
export const {
	zonesLoad,
	zonesLoadOk,
	zoneLoad,
	zoneLoadOk,
	zoneSave,
	zoneSaveOk,
	zoneUpdate,
	zoneUpdateOk,
	zoneCommitteesLoad,
	zoneCommitteesLoadOk
} = actionsCreator;