import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map, mergeMap, tap, finalize } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, concat, forkJoin, empty, from } from 'rxjs';
import {
    OUTGOINGS_LOAD,
    OUTGOING_SAVE,
	OUTGOING_UPDATE,
	OUTGOING_DELETE,
	outgoingsLoad,
    outgoingsLoadOk,
	outgoingSaveOk,
	outgoingUpdateOk,
	outgoingDeleteOk
} from '../actions/outgoings';
import OutgoingApi from '../../api/outgoing';

class OutgoingsEpic{
	static outgoingsLoad = (action$) =>  action$.pipe(
		ofType(OUTGOINGS_LOAD),
		switchMap(({payload}) => OutgoingApi.getAll({}).pipe(
			map(response => outgoingsLoadOk(response)),
			catchError(error => of(outgoingsLoadOk(error)))
		))
	);
	static outgoingSave= (action$) =>  action$.pipe(
		ofType(OUTGOING_SAVE),
		switchMap(({payload}) => OutgoingApi.post(payload).pipe(
			mergeMap(response => concat(
				of(outgoingSaveOk(response.response)),
				of(outgoingsLoad())
			)),
			catchError(error => of(outgoingSaveOk(error)))
		
		))
	);
	static outgoingUpdate= (action$) =>  action$.pipe(
		ofType(OUTGOING_UPDATE),
		switchMap(({payload}) => OutgoingApi.put(payload).pipe(
			mergeMap(response => concat(
				of(outgoingUpdateOk(response.response)),
				of(outgoingsLoad())
			)),
			catchError(error => of(outgoingUpdateOk(error)))
		
		))
	);
	static outgoingDelete= (action$) =>  action$.pipe(
		ofType(OUTGOING_DELETE),
		switchMap(({payload}) => OutgoingApi.delete(payload).pipe(
			mergeMap(response => concat(
				of(outgoingDeleteOk(response.response)),
				of(outgoingsLoad())
			)),
			catchError(error => of(outgoingDeleteOk(error)))
		
		))
	);

}
export default function OutgoingsEpics(action$){
	return Observable.merge(
			OutgoingsEpic.outgoingsLoad(action$),
			OutgoingsEpic.outgoingSave(action$),
			OutgoingsEpic.outgoingUpdate(action$),
			OutgoingsEpic.outgoingDelete(action$),
	);
}