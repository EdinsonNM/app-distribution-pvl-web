import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { forkJoin, of, empty } from 'rxjs';
import ProgramationApi from '../../api/programation';
import {
    programationdetailSaveOk,
    PROGRAMATIONDETAILS_SAVE,
    PROGRAMATIONDETAIL_SAVE,
    programationdetailSave,
    PROGRAMATIONDETAILS_UPDATEDISTRIBUTION,
    programationdetailsUpdatedistributionOk,
    PROGRAMATIONDETAILS_LOAD,
    programationdetailsLoadOk,
    programationdetailsLoad
} from '../actions/programation-detail';
import store from '../../app/store';
import ProgramationDetailApi from '../../api/programaciondetail';

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
    static ActiveDistributionMultiple = (action$) =>  action$.pipe(
		ofType(PROGRAMATIONDETAILS_UPDATEDISTRIBUTION),
		mergeMap(({payload}) => {
            let where = { committeeId: {inq: payload.committees }, programationId: payload.programationId};
            let data = {isDistributed: true}
            return ProgramationDetailApi.updateWhere(data, where).pipe(
                tap(response => store.dispatch(programationdetailsLoad(payload.programationId))),
                map(response => programationdetailsUpdatedistributionOk(response.response)),
                catchError(error => of(programationdetailsUpdatedistributionOk(error)))
            )
		})
    );
    static loadAllDistribution = (action$) =>  action$.pipe(
		ofType(PROGRAMATIONDETAILS_LOAD),
		switchMap(({payload}) => {
            let filter = {where: {programationId: payload.programationId, isDistributed: true }}
			return ProgramationDetailApi.getAll(filter).pipe(
				map(response => programationdetailsLoadOk(response)),
				catchError(error => of(programationdetailsLoadOk(error)))
			)
		})
	);

}
export default function ProgramationDetailEpics(action$){
	return Observable.merge(
        ProgramationDetailEpic.saveAll(action$),
        ProgramationDetailEpic.save(action$),
        ProgramationDetailEpic.ActiveDistributionMultiple(action$),
        ProgramationDetailEpic.loadAllDistribution(action$),
    );
    
}