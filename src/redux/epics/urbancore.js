import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { URBANCORE_LOAD, urbancoreLoadOk } from '../actions/urbancore';
import UrbanCoreApi from '../../api/urbancore';

class UrbanCoresEpic{
	static load = (action$) =>  action$.pipe(
		ofType(URBANCORE_LOAD),
		switchMap(() => UrbanCoreApi.getAll().pipe(
			map(response => urbancoreLoadOk(response)),
			catchError(error => of(urbancoreLoadOk(error)))
		))
	);
}
export default function UrbanCoresEpics (action$, store, deps){
	return Observable.merge(
		UrbanCoresEpic.load(action$, store, deps),
	);
}