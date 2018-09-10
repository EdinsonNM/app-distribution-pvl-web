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
import { of } from 'rxjs';
import store from '../../app/store';
import { POPULATED_CENTER } from '../../contants/data';
class CommitteeEpic{
	static search = (action$) =>  action$.pipe(
		ofType(COMMITTEES_LOAD_SEARCH),
		debounceTime(1000),
		switchMap(({payload}) => {
			return of(committeesLoad(payload))
		})
	);
	static changePageNext = (action$) =>  action$.pipe(
		ofType(COMMITTEES_LOAD_PAGENEXT),
		switchMap(({payload}) => {
			const page = store.getState().partners.pageCommittees + 1;
            const query = store.getState().partners.queryCommittees;
            return of(committeesLoad(query, page))
		})
	);
	static changePageBack = (action$) =>  action$.pipe(
		ofType(COMMITTEES_LOAD_PAGEBACK),
		switchMap(({payload}) => {
			const page = store.getState().partners.pageCommittees;
			const query = store.getState().partners.queryCommittees;
			let newPage = page - 1;
			if(newPage < 0){
				newPage = 0
			}
			return of(committeesLoad(query, newPage))
		})
	);
	static load = (action$) =>  action$.pipe(
		ofType(COMMITTEES_LOAD),
		switchMap(({payload}) => {
			let filter;
			if(payload.limit !== 0){
				let skip = payload.page * payload.limit;
				filter = { limit: payload.limit, skip, where: {name: {like: payload.query}}};
			}else {
				filter = { where: {name: {like: payload.query}}};
			}
			return CommitteeApi.getAll({filter}).pipe(
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
			)
		})
	);
}
export default function CommitteeEpics (action$, store, deps){
	return Observable.merge(
		CommitteeEpic.load(action$, store, deps),
		CommitteeEpic.search(action$, store, deps),
		CommitteeEpic.changePageBack(action$, store, deps),
		CommitteeEpic.changePageNext(action$, store, deps),
	);
}
