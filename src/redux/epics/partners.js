import { Observable } from 'rxjs-compat';
import CommitteeApi from '../../api/committee';
import { switchMap, catchError, map, mergeMap, debounceTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, forkJoin, concat } from 'rxjs';
import {
    COMMITTEES_PARTNERS_LOAD,
    committeesPartnersLoadOk,
    committeesPartnersLoadCountOk,
    COMMITTEES_PARTNERS_LOAD_SEARCH,
    COMMITTEES_PARTNERS_LOAD_PAGENEXT,
    COMMITTEES_PARTNERS_LOAD_PAGEBACK,
    committeesPartnersLoad,
	PARTNERS_LOAD,
	partnersLoad,
	partnersLoadOk, 
	partnersLoadCountOk,
	PARTNERS_LOAD_SEARCH,
	committeesPartnersTotalCountOk
} from '../actions/partners';
import store from '../../app/store';
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
				let obsCount = CommitteeApi.getCount({name: {like: payload.query}, periodId: store.getState().periods.periodDefault}).pipe(
					map(count => committeesPartnersTotalCountOk(count))
				)
				let committees =  CommitteeApi.getAll({filter}).pipe(
					map(response => {
						store.dispatch(committeesPartnersLoadOk(response));
						return response;
					}),
					mergeMap(response => forkJoin(
						...response.map(c => CommitteeApi.getPartnersCount(c.id).pipe(map(response => response))
					))),
					map(response => committeesPartnersLoadCountOk(response)),
					catchError(error => of(committeesPartnersLoadOk(error)))
				);
				return concat(
					obsCount,
					committees
				)
		})
	);
	static partnersLoadSearch = (action$) =>  action$.pipe(
		ofType(PARTNERS_LOAD_SEARCH),
		debounceTime(1000),
		switchMap(({payload}) => {
			return of(partnersLoad(payload.id, 0, payload.query, payload.column))
		})
	);
	static partnersLoad = (action$) =>  action$.pipe(
		ofType(PARTNERS_LOAD),
		switchMap(({payload}) => {
			let skip = payload.page * 10;
			let filter = { limit:9999, skip, where: {[payload.column]: {like: payload.query}}};
			let partners = CommitteeApi.getPartners(payload.id, filter).pipe(
				map(response => partnersLoadOk(response)),
				catchError(error => of(partnersLoadOk(error)))
				);
			let total = CommitteeApi.getPartnersCount(payload.id, {where: {[payload.column]: {like: payload.query}}}).pipe(
				map(response => partnersLoadCountOk(response)),
				catchError(error => of(partnersLoadCountOk(error)))
			)
			return concat(
				partners,
				total
			)

		})
	);
}
export default function PartnerEpics (action$, store, deps){
	return Observable.merge(
		PartnerEpic.CommitteesLoad(action$, store, deps),
		PartnerEpic.CommitteesSearch(action$, store, deps),
		PartnerEpic.CommitteesChangePageNext(action$, store, deps),
		PartnerEpic.CommitteesChangePageBack(action$, store, deps),
		PartnerEpic.partnersLoad(action$, store, deps),
		PartnerEpic.partnersLoadSearch(action$, store, deps),
	);
}
