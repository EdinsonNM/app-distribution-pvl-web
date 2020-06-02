import { Observable } from 'rxjs-compat';
import CommitteeApi from '../../api/committee';
import { switchMap, catchError, map, mergeMap, debounceTime,tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, forkJoin, concat, empty } from 'rxjs';
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
    committeesPartnersTotalCountOk,
    PARTNER_SAVE,
    PARTNER_SAVE_OK,
	partnerSaveOk,
	partnerUpdateOk,
    PARTNER_UPDATE,
    PARTNER_UPDATE_OK, 
	PARTNER_DELETE,	
	partnerDeleteOk,
	partnerLoad
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
				let obsCount = CommitteeApi.getCount({name: {like: payload.query}, periodId: store.getState().periods.periodDefault}).pipe(
					map(count => committeesPartnersTotalCountOk(count))
				)
				console.log(obsCount);
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

	static save = (action$) =>  action$.pipe(
		ofType(PARTNER_SAVE),
		switchMap(({payload}) => {
			return PartnerApi.post(payload).pipe(
				map(response => partnerSaveOk(response)),
				catchError(error => of(partnerSaveOk(error)))
			)
		})
	);
	static saveOk = (action$) =>  action$.pipe(
		ofType(PARTNER_SAVE_OK),
		switchMap(() => {
			document.location = `#/pages/socios/lista/${store.getState().partners.committeeSelected}`;
			return empty();
		})
	);
	static update = (action$) =>  action$.pipe(
		ofType(PARTNER_UPDATE),
		switchMap(({payload}) => {
			return PartnerApi.put(payload).pipe(
				map(response => partnerUpdateOk(response.response)),
				catchError(error => of(partnerUpdateOk(error)))
			)
		})
	);
	static updateOk = (action$) =>  action$.pipe(
		ofType(PARTNER_UPDATE_OK),
		switchMap(({payload}) => {
			if(payload.id){
				document.location = '#/pages/partners';
			}
			return empty();
		})
	);	
	static delete= (action$) =>  action$.pipe(		
		ofType(PARTNER_DELETE),
		switchMap(({payload}) => PartnerApi.delete(payload).pipe(
			tap(() => store.dispatch(partnersLoad(store.getState().partners.committeeSelected))),
			map(response => partnerDeleteOk(response.response)),
			catchError(error => of(partnerDeleteOk(error)))
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
		PartnerEpic.partnersLoadSearch(action$, store, deps),
		PartnerEpic.save(action$, store, deps),
		PartnerEpic.saveOk(action$, store, deps),
		PartnerEpic.update(action$, store, deps),
		PartnerEpic.updateOk(action$, store, deps),
		//PartnerEpic.loadPartner(action$, store, deps),
		PartnerEpic.delete(action$, store, deps),
	);
}
