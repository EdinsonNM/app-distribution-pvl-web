import { Observable } from 'rxjs-compat';
import {
    COMMITTEES_LOAD,
	committeesLoadOk,
	committeesLoad,
    COMMITTEES_LOAD_SEARCH,
    COMMITTEES_LOAD_PAGENEXT, 
	COMMITTEES_LOAD_PAGEBACK
} from '../actions/committees';
import CommitteeApi from '../../api/committee';
import { switchMap, catchError, map, debounceTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of , empty} from 'rxjs';
import store from '../../app/store';
import UserApi from '../../api/user';
import { USER_LOGIN, userLoginOk , USER_LOGIN_OK} from '../actions/users';
import AuthToken from '../../lib/auth-token';
class UsersEpic{
	static login = (action$) =>  action$.pipe(
		ofType(USER_LOGIN),
		switchMap(({payload}) => UserApi.login(payload).pipe(
			map(response => userLoginOk(response.response, true)),
			catchError(error =>of(userLoginOk(error, false)))
		))
	);
	static loginOk = (action$) =>  action$.pipe(
		ofType(USER_LOGIN_OK),
		switchMap(({payload}) => {
			if(payload.id){
				AuthToken.setToken(payload);
				document.location = '/pages/one';
			}
			return empty();
		})
	);
}
export default function UsersEpics (action$, store, deps){
	return Observable.merge(
		UsersEpic.login(action$, store, deps),
		UsersEpic.loginOk(action$, store, deps)
	);
}
