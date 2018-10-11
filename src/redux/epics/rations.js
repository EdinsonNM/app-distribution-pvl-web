import { Observable } from 'rxjs-compat';
import CommitteeApi from '../../api/committee';
import { switchMap, catchError, map, mergeMap, debounceTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, forkJoin, empty } from 'rxjs';

import store from '../../app/store';
import {
    PERIOD_RATIONS_LOAD_SEARCH,
    PERIOD_RATIONS_LOAD_PAGENEXT,
    PERIOD_RATIONS_LOAD_PAGEBACK,
    PERIOD_RATIONS_LOAD,
    RATIONS_LOAD,
    periodRationsLoad,
    periodRationsLoadOk,
    rationsLoadOk,
	periodRationsLoadRationsOk,
	rationSaveOk,
    RATION_SAVE, 
	RATION_SAVE_OK
} from '../actions/rations';
import PeriodApi from '../../api/period';
import RationApi from '../../api/ration';
class RationsEpic{
	static PeriodsSearch = (action$) =>  action$.pipe(
		ofType(PERIOD_RATIONS_LOAD_SEARCH),
		debounceTime(1000),
		switchMap(({payload}) => {
			return of(periodRationsLoad(0, payload.query))
		})
	);
	static PeriodsChangePageNext = (action$) =>  action$.pipe(
		ofType(PERIOD_RATIONS_LOAD_PAGENEXT),
		switchMap(({payload}) => {
			const page = store.getState().partners.pageCommittees + 1;
            const query = store.getState().partners.queryCommittees;
            return of(periodRationsLoad(page, query))
		})
	);
	static PeriodsChangePageBack = (action$) =>  action$.pipe(
		ofType(PERIOD_RATIONS_LOAD_PAGEBACK),
		switchMap(({payload}) => {
			const page = store.getState().partners.pageCommittees;
			const query = store.getState().partners.queryCommittees;
			let newPage = page - 1;
			if(newPage < 0){
				newPage = 0
			}
			return of(periodRationsLoad(newPage, query))
		})
	);
	static PeriodsWithRationsLoad = (action$) =>  action$.pipe(
		ofType(PERIOD_RATIONS_LOAD),
		switchMap(({payload}) => {
				let skip = payload.page * 10;
				let filter = { limit:10, skip, where: {name: {like: payload.query}}};
				return PeriodApi.getAll({filter}).pipe(
					map(response => {
						store.dispatch(periodRationsLoadOk(response));
						return response;
					}),
					map(response => response.slice(0, 20)),
					mergeMap(response => forkJoin(
						...response.map(c => PeriodApi.getRations({id: c.id}).pipe(
							map(response => response.map(r => ({
								...r,
								product: store.getState().products.data.find(p => p.id === r.productId)
							})))
						)
					))),
					map(response => periodRationsLoadRationsOk(response)),
					catchError(error => of(periodRationsLoadRationsOk(error)))
				);
		})
	);
	static rationsLoad = (action$) =>  action$.pipe(
		ofType(RATIONS_LOAD),
		switchMap(({payload}) => PeriodApi.getRations({id: payload}).pipe(
			map(response => response.map(r => ({
				...r,
				product: store.getState().products.data.find(p => p.id === r.productId)
			}))),
			map(response => rationsLoadOk(response)),
			catchError(error => of(rationsLoadOk(error)))
		))
	);
	static rationsSave= (action$) =>  action$.pipe(
		ofType(RATION_SAVE),
		switchMap(({payload}) => RationApi.post(payload).pipe(
			map(response => rationSaveOk(response.response)),
			catchError(error => of(rationSaveOk(error)))
		))
	);
	static rationsSaveOk= (action$) =>  action$.pipe(
		ofType(RATION_SAVE_OK),
		switchMap(({payload}) => {
			if(payload.id){
				document.location = '#/pages/raciones/periodo';
			}
			return empty();
		})
	);
}
export default function RationsEpics (action$, store, deps){
	return Observable.merge(
		RationsEpic.rationsLoad(action$, store, deps),
		RationsEpic.PeriodsSearch(action$, store, deps),
		RationsEpic.PeriodsChangePageNext(action$, store, deps),
		RationsEpic.PeriodsChangePageBack(action$, store, deps),
		RationsEpic.PeriodsWithRationsLoad(action$, store, deps),
		RationsEpic.rationsSave(action$, store, deps),
		RationsEpic.rationsSaveOk(action$, store, deps),
	);
}
