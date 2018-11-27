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
    programationdetailsLoad,
    programationdetailTotalForSave,
    programationdetailConfirmDistributionOk,
    PROGRAMATIONDETAIL_SAVE_OK,
    PROGRAMATIONDETAIL_CONFIRM_DISTRIBUTION,
    PROGRAMATIONDETAIL_REMOVE_DISTRIBUTION,
    programationdetailRemoveDistributionOk
} from '../actions/programation-detail';
import store from '../../app/store';
import ProgramationDetailApi from '../../api/programaciondetail';
import { toast } from 'react-toastify';

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
			store.dispatch(programationdetailTotalForSave(payload.details.length))
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
    static saveOk = (action$) =>  action$.pipe(
		ofType(PROGRAMATIONDETAIL_SAVE_OK),
        mergeMap(({payload}) => {
            const total = store.getState().programationdetail.totalForSave;
            const progress = store.getState().programationdetail.totalSaved;
            if(progress === total){
                toast("Programación registrada satosfactoriamente!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                document.location = '#/pages/programacion';
            }
            return empty();
        })
    );
    static ActiveDistributionMultiple = (action$) =>  action$.pipe(
		ofType(PROGRAMATIONDETAILS_UPDATEDISTRIBUTION),
		mergeMap(({payload}) => {
            let where;
            if(payload.committees.length > 1){
                where = { committeeId: {inq: payload.committees }, programationId: payload.programationId};
            }else {
                where = { committeeId: payload.committees[0], programationId: payload.programationId};
            }
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
            let filter = {where: {programationId: payload, isDistributed: true }}
			return ProgramationDetailApi.getAll(filter).pipe(
				map(response => programationdetailsLoadOk(response)),
				catchError(error => of(programationdetailsLoadOk(error)))
			)
		})
    );
    
    static confirmDistribution = (action$) =>  action$.pipe(
		ofType(PROGRAMATIONDETAIL_CONFIRM_DISTRIBUTION),
		switchMap(({payload}) => {
			return ProgramationDetailApi.confirmDistribution(payload.id).pipe(
                tap(response => store.dispatch(programationdetailsLoad(payload.programationId))),
				map(response => programationdetailConfirmDistributionOk(response)),
				catchError(error => of(programationdetailConfirmDistributionOk(error)))
			)
		})
    );
    static removeDistribution = (action$) =>  action$.pipe(
		ofType(PROGRAMATIONDETAIL_REMOVE_DISTRIBUTION),
		switchMap(({payload}) => {
			return ProgramationDetailApi.removeDistribution(payload.id).pipe(
                tap(response => store.dispatch(programationdetailsLoad(payload.programationId))),
				map(response => programationdetailRemoveDistributionOk(response)),
				catchError(error => of(programationdetailRemoveDistributionOk(error)))
			)
		})
	);

}
export default function ProgramationDetailEpics(action$){
	return Observable.merge(
        ProgramationDetailEpic.saveAll(action$),
        ProgramationDetailEpic.save(action$),
        ProgramationDetailEpic.saveOk(action$),
        ProgramationDetailEpic.ActiveDistributionMultiple(action$),
        ProgramationDetailEpic.loadAllDistribution(action$),
        ProgramationDetailEpic.confirmDistribution(action$),
        ProgramationDetailEpic.removeDistribution(action$),
    );
    
}