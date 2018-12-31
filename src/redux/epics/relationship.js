import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import {RELATIONSHIPS_LOAD, relationshipsLoadOk} from '../actions/relationship';
import RelationShipApi from '../../api/relationship';

class RelationshipEpic{
	static load = (action$) =>  action$.pipe(
		ofType(RELATIONSHIPS_LOAD),
		switchMap(() => RelationShipApi.getAll().pipe(
			map(response => relationshipsLoadOk(response)),
			catchError(error => of(relationshipsLoadOk(error)))
		))
	);
}
export default function RelationshipEpics (action$, store, deps){
	return Observable.merge(
		RelationshipEpic.load(action$, store, deps),
	);
}