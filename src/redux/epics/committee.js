import { Observable } from 'rxjs-compat';
import {COMMITTEES_LOAD, committeesLoadOk} from '../actions/committees';
import CommitteeApi from '../../api/committee';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import store from '../../app/store';
import { POPULATED_CENTER } from '../../contants/data';
class CommitteeEpic{
	static load = (action$) =>  action$.pipe(
		ofType(COMMITTEES_LOAD),
		switchMap(() => CommitteeApi.getAll().pipe(
			map(response => {
				let urbancore = store.getState().urbancore.data;
				let addresstype = store.getState().addresstype.data;
				return response.map(r =>({
					...r,
					urbancoreType: (urbancore.find(u => u.id === r.urbancoreId) || {}).name,
					addresstype: (addresstype.find(u => u.id === r.addresstypeId) || {}).name,
					populatedCenterType: POPULATED_CENTER[r.populatedCenter]
				}))
			}),
			map(response => committeesLoadOk(response)),
			catchError(error => of(committeesLoadOk(error)))
		))
	);
}
export default function CommitteeEpics (action$, store, deps){
	return Observable.merge(
		CommitteeEpic.load(action$, store, deps),
	);
}
