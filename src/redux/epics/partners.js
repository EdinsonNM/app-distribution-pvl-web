import { Observable } from 'rxjs-compat';
import CommitteeApi from '../../api/committee';
import { switchMap, catchError, map, mergeMap, debounceTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, forkJoin } from 'rxjs';
import {
    COMMITTEES_PARTNERS_LOAD,
    committeesPartnersLoadOk,
    committeesPartnersLoadCountOk,
    COMMITTEES_PARTNERS_LOAD_SEARCH,
    COMMITTEES_PARTNERS_LOAD_PAGENEXT,
    COMMITTEES_PARTNERS_LOAD_PAGEBACK,
    committeesPartnersLoad,
    PARTNERS_LOAD,
	partnersLoadOk
} from '../actions/partners';
import store from '../../app/store';
import PartnerApi from '../../api/partner';
class PartnerEpic{
	static CommitteesSearch = (action$) =>  action$.pipe(
		ofType(COMMITTEES_PARTNERS_LOAD_SEARCH),
		debounceTime(1000),
		switchMap(({payload}) => {
			return of(committeesPartnersLoad(0, payload.query))
		})
	);
	static CommitteesChangePageNext = (action$) =>  action$.pipe(
		ofType(COMMITTEES_PARTNERS_LOAD_PAGENEXT),
		switchMap(({payload}) => {
			const page = store.getState().partners.pageCommittees + 1;
            const query = store.getState().partners.queryCommittees;
            return of(committeesPartnersLoad(page, query))
		})
	);
	static CommitteesChangePageBack = (action$) =>  action$.pipe(
		ofType(COMMITTEES_PARTNERS_LOAD_PAGEBACK),
		switchMap(({payload}) => {
			const page = store.getState().partners.pageCommittees;
			const query = store.getState().partners.queryCommittees;
			let newPage = page - 1;
			if(newPage < 0){
				newPage = 0
			}
			return of(committeesPartnersLoad(newPage, query))
		})
	);
	static CommitteesLoad = (action$) =>  action$.pipe(
		ofType(COMMITTEES_PARTNERS_LOAD),
		switchMap(({payload}) => {
				let skip = payload.page * 10;
				let filter = { limit:10, skip, where: {name: {like: payload.query}, periodId: store.getState().periods.periodDefault}};
				return CommitteeApi.getAll({filter}).pipe(
					map(response => {
						store.dispatch(committeesPartnersLoadOk(response));
						return response;
					}),
					mergeMap(response => forkJoin(
						...response.map(c => CommitteeApi.getPartnersCount({id: c.id}).pipe(map(response => response))
					))),
					map(response => committeesPartnersLoadCountOk(response)),
					catchError(error => of(committeesPartnersLoadOk(error)))
				);
		})
	);
	static partnersLoad = (action$) =>  action$.pipe(
		ofType(PARTNERS_LOAD),
		switchMap(({payload}) => CommitteeApi.getPartners({id: payload}).pipe(
			map(response => partnersLoadOk(response)),
			catchError(error => of(partnersLoadOk(error)))
		))
	);
}
export default function PartnerEpics (action$, store, deps){
	return Observable.merge(
		PartnerEpic.CommitteesLoad(action$, store, deps),
		PartnerEpic.CommitteesSearch(action$, store, deps),
		PartnerEpic.CommitteesChangePageNext(action$, store, deps),
		PartnerEpic.CommitteesChangePageBack(action$, store, deps),
		PartnerEpic.partnersLoad(action$, store, deps),
	);
}
