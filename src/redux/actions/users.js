import {createActions} from 'redux-actions';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_OK = 'USER_LOGIN_OK';
export const USER_LOGOUT = 'USER_LOGOUT';

const actionsCreator = createActions(
	{
	},
	USER_LOGIN,
	USER_LOGIN_OK,
	USER_LOGOUT,
);
export const {
	userLogin,
	userLoginOk,
	userLogout,
} = actionsCreator;