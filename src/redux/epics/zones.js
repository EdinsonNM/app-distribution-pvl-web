import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, concat } from 'rxjs';
import { ZONES_LOAD , ZONE_SAVE, zonesLoad, zonesLoadOk, zoneSaveOk} from '../actions/zones';
import ZoneApi from '../../api/zone';

class ZonesEpic{
	static zonesLoad = (action$) =>  action$.pipe(
		ofType(ZONES_LOAD),
		switchMap(({payload}) => ZoneApi.getAll({}).pipe(
			map(response => zonesLoadOk(response)),
			catchError(error => of(zonesLoadOk(error)))
		))
	);
	static zonesSave= (action$) =>  action$.pipe(
		ofType(ZONE_SAVE),
		switchMap(({payload}) => ZoneApi.post(payload).pipe(
			mergeMap(response => concat(
				of(zoneSaveOk(response.response)),
				of(zonesLoad())
			)),
			catchError(error => of(zoneSaveOk(error)))
		))
	);
}
export default function ZonesEpics (action$, store, deps){
	return Observable.merge(
			ZonesEpic.zonesLoad(action$, store, deps),
			ZonesEpic.zonesSave(action$, store, deps),
	);
}