import { Observable } from 'rxjs-compat';
import CommitteeApi from '../../api/committee';
import { switchMap, catchError, map, mergeMap, debounceTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, forkJoin } from 'rxjs';
import {
    COMMITTEES_BENEFICIARIES_LOAD,
    COMMITTEES_BENEFICIARIES_LOAD_SEARCH,
    COMMITTEES_BENEFICIARIES_LOAD_PAGENEXT,
    COMMITTEES_BENEFICIARIES_LOAD_PAGEBACK,
    BENEFICIARIES_LOAD,
    committeesBeneficiariesLoadCountOk,
    committeesBeneficiariesLoad,
    committeesBeneficiariesLoadOk,
	beneficiariesLoadOk
} from '../actions/beneficiaries';
import store from '../../app/store';
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
				let limit = 20
				let skip = payload.page * limit;
				let filter = { limit, skip, where: {name: {like: payload.query}, periodId: store.getState().periods.periodDefault}};
				return CommitteeApi.getAll({filter}).pipe(
					map(response => {
						store.dispatch(committeesBeneficiariesLoadOk(response));
						return response;
					}),
					mergeMap(response => forkJoin(
						...response.map(c => CommitteeApi.getBeneficiariesCount({id: c.id}).pipe(map(response => response))
					))),
					map(response => committeesBeneficiariesLoadCountOk(response)),
					catchError(error => of(committeesBeneficiariesLoadOk(error)))
				);
		})
	);
	static beneficiariesLoad = (action$) =>  action$.pipe(
		ofType(BENEFICIARIES_LOAD),
		switchMap(({payload}) => CommitteeApi.getBeneficiaries({id: payload}).pipe(
			map(response => beneficiariesLoadOk(response)),
			catchError(error => of(beneficiariesLoadOk(error)))
		))
	);
}
export default function BeneficiaryEpics (action$, store, deps){
	return Observable.merge(
		BeneficiaryEpic.CommitteesLoad(action$, store, deps),
		BeneficiaryEpic.CommitteesSearch(action$, store, deps),
		BeneficiaryEpic.CommitteesChangePageNext(action$, store, deps),
		BeneficiaryEpic.CommitteesChangePageBack(action$, store, deps),
		BeneficiaryEpic.beneficiariesLoad(action$, store, deps),
	);
}
