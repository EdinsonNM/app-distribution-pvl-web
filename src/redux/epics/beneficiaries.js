import { Observable } from 'rxjs-compat';
import CommitteeApi from '../../api/committee';
import { switchMap, catchError, map, mergeMap, debounceTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, forkJoin, concat, empty } from 'rxjs';
import {
    COMMITTEES_BENEFICIARIES_LOAD,
    COMMITTEES_BENEFICIARIES_LOAD_SEARCH,
    COMMITTEES_BENEFICIARIES_LOAD_PAGENEXT,
    COMMITTEES_BENEFICIARIES_LOAD_PAGEBACK,
    BENEFICIARIES_LOAD,
    committeesBeneficiariesLoadCountOk,
    committeesBeneficiariesLoad,
    committeesBeneficiariesLoadOk,
    beneficiariesLoadOk,
    beneficiariesLoad,
    committeesBeneficiariesTotalCountOk,
    BENEFICIARIES_LOAD_SEARCH,
    BENEFICIARY_SAVE,
    BENEFICIARY_SAVE_OK,
	beneficiarySaveOk
} from '../actions/beneficiaries';
import store from '../../app/store';
import BeneficiaryApi from '../../api/beneficiary';
class BeneficiaryEpic{
	static CommitteesSearch = (action$) =>  action$.pipe(
		ofType(COMMITTEES_BENEFICIARIES_LOAD_SEARCH),
		debounceTime(1000),
		switchMap(({payload}) => {
			return of(committeesBeneficiariesLoad(0, payload.query))
		})
	);
	static CommitteesChangePageNext = (action$) =>  action$.pipe(
		ofType(COMMITTEES_BENEFICIARIES_LOAD_PAGENEXT),
		switchMap(({payload}) => {
			const page = store.getState().beneficiaries.pageCommittees + 1;
            const query = store.getState().beneficiaries.queryCommittees;
            return of(committeesBeneficiariesLoad(page, query))
		})
	);
	static CommitteesChangePageBack = (action$) =>  action$.pipe(
		ofType(COMMITTEES_BENEFICIARIES_LOAD_PAGEBACK),
		switchMap(({payload}) => {
			const page = store.getState().beneficiaries.pageCommittees;
			const query = store.getState().beneficiaries.queryCommittees;
			let newPage = page - 1;
			if(newPage < 0){
				newPage = 0
			}
			return of(committeesBeneficiariesLoad(newPage, query))
		})
	);
	static CommitteesLoad = (action$) =>  action$.pipe(
		ofType(COMMITTEES_BENEFICIARIES_LOAD),
		switchMap(({payload}) => {
				let skip = payload.page * 10;
				let filter = { limit:10, skip, where: {name: {like: payload.query}, periodId: store.getState().periods.periodDefault}};
				let obsCount = CommitteeApi.getCount({name: {like: payload.query}, periodId: store.getState().periods.periodDefault}).pipe(
					map(count => committeesBeneficiariesTotalCountOk(count))
				)
				let committees =   CommitteeApi.getAll({filter}).pipe(
					map(response => {
						store.dispatch(committeesBeneficiariesLoadOk(response));
						return response;
					}),
					mergeMap(response => forkJoin(
						...response.map(c => CommitteeApi.getBeneficiariesCount(c.id).pipe(map(response => response))
					))),
					map(response => committeesBeneficiariesLoadCountOk(response)),
					catchError(error => of(committeesBeneficiariesLoadOk(error)))
				);
				return concat(
					obsCount,
					committees
				)
		})
	);
	static beneficiariesLoadSearch = (action$) =>  action$.pipe(
		ofType(BENEFICIARIES_LOAD_SEARCH),
		debounceTime(1000),
		switchMap(({payload}) => {
			return of(beneficiariesLoad(payload.id, 0, payload.query, payload.column))
		})
	);
	static beneficiariesLoad = (action$) =>  action$.pipe(
		ofType(BENEFICIARIES_LOAD),
		switchMap(({payload}) => {
			let skip = payload.page * 10;
			let filter = { limit:9999, skip, where: {[payload.column]: {like: payload.query}}};
			return CommitteeApi.getBeneficiaries(payload.id, filter).pipe(
				map(response => beneficiariesLoadOk(response)),
				catchError(error => of(beneficiariesLoadOk(error)))
			)
		})
	);
	static save = (action$) =>  action$.pipe(
		ofType(BENEFICIARY_SAVE),
		switchMap(({payload}) => {
			return BeneficiaryApi.post(payload).pipe(
				map(response => beneficiarySaveOk(response)),
				catchError(error => of(beneficiarySaveOk(error)))
			)
		})
	);
	static saveOk = (action$) =>  action$.pipe(
		ofType(BENEFICIARY_SAVE_OK),
		switchMap(() => {
			document.location = `#/pages/beneficiarios/lista/${store.getState().beneficiaries.committeeSelected}`;
			return empty();
		})
	);
}
export default function BeneficiaryEpics (action$, store, deps){
	return Observable.merge(
		BeneficiaryEpic.CommitteesLoad(action$, store, deps),
		BeneficiaryEpic.CommitteesSearch(action$, store, deps),
		BeneficiaryEpic.CommitteesChangePageNext(action$, store, deps),
		BeneficiaryEpic.CommitteesChangePageBack(action$, store, deps),
		BeneficiaryEpic.beneficiariesLoad(action$, store, deps),
		BeneficiaryEpic.beneficiariesLoadSearch(action$, store, deps),
		BeneficiaryEpic.save(action$, store, deps),
		BeneficiaryEpic.saveOk(action$, store, deps),
	);
}
