import { Observable } from 'rxjs-compat';
import{empty} from 'rxjs';
import {
    COMMITTEES_LOAD,
	committeesLoadOk,
	committeesLoad,
	COMMITTEES_LOAD_SEARCH,
    COMMITTEES_LOAD_PAGENEXT, 
	COMMITTEES_LOAD_PAGEBACK,
	COMMITTEES_SAVE,
	committeesSaveOk,
    COMMITTEES_SAVE_OK,
	COMMITTEES_DELETE,	
	committeesDeleteOk
} from '../actions/committees';
import CommitteeApi from '../../api/committee';
import { of, concat } from 'rxjs';
import { switchMap, catchError, map, debounceTime,flatMap} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import store from '../../app/store';
import { POPULATED_CENTER } from '../../contants/data';
import { mergeMap } from 'rxjs-compat/operator/mergeMap';
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
				filter = { limit: payload.limit, skip, where: {name: {like: payload.query}, periodId: {like: store.getState().periods.periodDefault}}};
			}else {
				filter = { where: {name: {like: payload.query}, periodId: {like: store.getState().periods.periodDefault}}};
			}
			
			let committ=CommitteeApi.getAll({filter}).pipe(
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
			);
			console.log('ak');
			return committ;
		})
	);
	static delete= (action$) =>  action$.pipe(		
		ofType(COMMITTEES_DELETE),		
		switchMap(({payload}) => CommitteeApi.delete(payload).pipe(
			map(response => committeesDeleteOk(payload)),
			catchError(error => of(committeesDeleteOk(error)))
		))
	);
	static save = (action$) =>  action$.pipe(
		ofType(COMMITTEES_SAVE),
		switchMap(({payload}) => {
			return CommitteeApi.post(payload).pipe(
				map(response => committeesSaveOk(response)),
				catchError(error => of(committeesSaveOk(error)))
			)
		})
	);
	static saveOk = (action$) =>  action$.pipe(
		ofType(COMMITTEES_SAVE_OK),
		switchMap(() => {
			document.location = '#/pages/comites';
			return empty();
		})
	);	
}
export default function CommitteeEpics (action$, store, deps){
	return Observable.merge(
		CommitteeEpic.load(action$, store, deps),
		CommitteeEpic.save(action$, store, deps),
		CommitteeEpic.saveOk(action$, store, deps),
		CommitteeEpic.search(action$, store, deps),
		CommitteeEpic.changePageBack(action$, store, deps),
		CommitteeEpic.changePageNext(action$, store, deps),
		CommitteeEpic.delete(action$, store, deps)
	);
}
