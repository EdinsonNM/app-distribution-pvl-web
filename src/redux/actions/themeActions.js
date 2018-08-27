import {createActions} from 'redux-actions';

export const CHANGE_THEME_TO_DARK = 'CHANGE_THEME_TO_DARK';
export const CHANGE_THEME_TO_LIGHT = 'CHANGE_THEME_TO_LIGHT';

const actionsCreator = createActions(
  {},
  CHANGE_THEME_TO_DARK,
  CHANGE_THEME_TO_LIGHT
);

export const {
  changeThemeToDark,
  changeThemeToLight
} = actionsCreator;