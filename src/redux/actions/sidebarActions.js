import {createActions} from 'redux-actions';

export const CHANGE_SIDEBAR_VISIBILITY = 'CHANGE_SIDEBAR_VISIBILITY';
export const CHANGE_MOBILE_SIDEBAR_VISIBILITY = 'CHANGE_MOBILE_SIDEBAR_VISIBILITY';


const actionsCreator = createActions(
  {},
  CHANGE_SIDEBAR_VISIBILITY,
  CHANGE_MOBILE_SIDEBAR_VISIBILITY
);
export const {
  changeSidebarVisibility,
  changeMobileSidebarVisibility
} = actionsCreator;