import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map, mergeMap, tap, finalize } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, concat, forkJoin, empty, from } from 'rxjs';
import {
    ZONES_LOAD,
    ZONE_SAVE,
    ZONE_UPDATE,
    ZONE_COMMITTEES_LOAD,
    zonesLoad,
    zonesLoadOk,
    zoneSaveOk,
	zoneUpdateOk,
	zoneLoadOk,
	zoneCommitteesLoadOk,
	zoneCommitteesLoad

} from '../actions/zones';
import ZoneApi from '../../api/zone';
import CommitteeApi from '../../api/committee';

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
	static zonesUpdate= (action$) =>  action$.pipe(
		ofType(ZONE_UPDATE),
		switchMap(({payload}) => ZoneApi.put(payload).pipe(
			mergeMap(response => concat(
				of(zoneUpdateOk(response.response)),
				of(zoneCommitteesLoad(response.response.committees))
			)),
			catchError(error => of(zoneUpdateOk(error)))
		
		))
	);
	
	static CommitteesLoad = (action$) =>  action$.pipe(
		ofType(ZONE_COMMITTEES_LOAD),
		switchMap(({payload}) => {
			const data = forkJoin(...payload.map(c => CommitteeApi.get(c)));
			const request = data.pipe(
				map(r => zoneCommitteesLoadOk(r))
			)
			return request;
		}));
}
export default function ZonesEpics(action$){
	return Observable.merge(
			ZonesEpic.zonesLoad(action$),
			ZonesEpic.zonesSave(action$),
			ZonesEpic.zonesUpdate(action$),
			ZonesEpic.CommitteesLoad(action$),
	);
}