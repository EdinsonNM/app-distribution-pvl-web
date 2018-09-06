import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { PERIODS_LOAD, periodsLoadOk, PERIOD_LOAD, periodLoadOk } from '../actions/periods';
import PeriodApi from '../../api/period';

class PeriodsEpic{
	static loadPeriods = (action$) =>  action$.pipe(
		ofType(PERIODS_LOAD),
		switchMap(() => PeriodApi.getAll({}).pipe(
			map(response => periodsLoadOk(response)),
			catchError(error => of(periodsLoadOk(error)))
		))
	);
	static loadPeriod = (action$) =>  action$.pipe(
		ofType(PERIOD_LOAD),
		switchMap(({payload}) => PeriodApi.get({id: payload}).pipe(
			map(response => periodLoadOk(response)),
			catchError(error => of(periodLoadOk(error)))
		))
	);
}
export default function PeriodsEpics (action$, store, deps){
	return Observable.merge(
		PeriodsEpic.loadPeriods(action$, store, deps),
		PeriodsEpic.loadPeriod(action$, store, deps),
	);
}