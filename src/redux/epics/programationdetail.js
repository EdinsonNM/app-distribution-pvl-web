import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { forkJoin, of, empty } from 'rxjs';
import ProgramationApi from '../../api/programation';
import {
    programationdetailSaveOk,
    PROGRAMATIONDETAILS_SAVE, 
	PROGRAMATIONDETAIL_SAVE,
    programationdetailSave
} from '../actions/programation-detail';
import store from '../../app/store';

class ProgramationDetailEpic{
	static saveAll = (action$) =>  action$.pipe(
		ofType(PROGRAMATIONDETAILS_SAVE),
		mergeMap(({payload}) => {
            payload.details.forEach(element => {
                let item = {
                    committeeId: payload.programation.committeeId,
                    programationId: payload.programation.id,
                    periodId: payload.programation.periodId,
                    ...element
                }
                store.dispatch(programationdetailSave(item))
            });
			
			return empty();
		})
    );
    static save = (action$) =>  action$.pipe(
		ofType(PROGRAMATIONDETAIL_SAVE),
        mergeMap(({payload}) => 
            ProgramationApi.postDetail(payload).pipe(
                map(response => programationdetailSaveOk(response.response)),
                catchError(error => of(programationdetailSaveOk(error)))
            )
        )
	);

}
export default function ProgramationDetailEpics(action$){
	return Observable.merge(
        ProgramationDetailEpic.saveAll(action$),
        ProgramationDetailEpic.save(action$),
	);
}