import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map, mergeMap, tap, finalize } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, concat, forkJoin, empty, from } from 'rxjs';
import {
	programationCommitteesLoadOk,
    programationLoadBeneficiariesCount,
    programationLoadPartnersCount,
    programationLoadBeneficiariesCountOk,
    programationLoadPartnersCountOk,
    PROGRAMATION_COMMITTEES_LOAD,
    PROGRAMATION_LOAD_BENEFICIARIES_COUNT,
    PROGRAMATION_LOAD_PARTNERS_COUNT,
    PROGRAMATION_SAVE,
    PROGRAMATION_SAVE_OK,
	PROGRAMATIONS_LOAD,
    programationSaveOk,
	programationsLoadOk,
} from '../actions/programation';
import CommitteeApi from '../../api/committee';
import store from '../../app/store';
import ProgramationApi from '../../api/programation';
import { programationdetailsSave } from '../actions/programation-detail';
import { delay } from 'rxjs-compat/operator/delay';

class ProgramationEpic{
	static CommitteesLoad = (action$) =>  action$.pipe(
		ofType(PROGRAMATION_COMMITTEES_LOAD),
		switchMap(({payload}) => {
			const data = forkJoin(...payload.map(c => 
				CommitteeApi.get(c).pipe(
					tap(response => {
							store.dispatch(programationLoadBeneficiariesCount(response));
							store.dispatch(programationLoadPartnersCount(response))
					})
				)
			));
			const request = data.pipe(
				map(r => programationCommitteesLoadOk(r))
			)
			return request;
		}));
	static BeneficiariesCount= (action$) =>  action$.pipe(
		ofType(PROGRAMATION_LOAD_BENEFICIARIES_COUNT),
		mergeMap(({payload}) => {
			return CommitteeApi.getBeneficiariesCount(payload).pipe(
				map(response => programationLoadBeneficiariesCountOk(payload.id, response.count))
			)
		}))

	static PartnersCount= (action$) =>  action$.pipe(
		ofType(PROGRAMATION_LOAD_PARTNERS_COUNT),
		mergeMap(({payload}) => {
			return CommitteeApi.getPartnersCount(payload).pipe(
				map(response => programationLoadPartnersCountOk(payload.id, response.count))
			)
	}))

	static save = (action$) =>  action$.pipe(
		ofType(PROGRAMATION_SAVE),
		switchMap(({payload}) => {
			return ProgramationApi.post(payload.programation).pipe(
				tap(response => programationSaveOk(response.response)),
				map(response => programationdetailsSave(response.response, payload.details)),
				catchError(error => of(programationSaveOk(error)))
			)
		})
	);
	static saveOk = (action$) =>  action$.pipe(
		ofType(PROGRAMATION_SAVE_OK),
		switchMap(({payload}) => {
			// document.location = '/pages/programacion';
			return empty();
		})
	);
	static load = (action$) =>  action$.pipe(
		ofType(PROGRAMATIONS_LOAD),
		switchMap(() => {
			return ProgramationApi.getAll({where: {periodId: store.getState().periods.periodDefault}}).pipe(
				map(response => programationsLoadOk(response)),
				catchError(error => of(programationsLoadOk(error)))
			)
		})
	);
}
export default function ProgramationEpics(action$){
	return Observable.merge(
		ProgramationEpic.CommitteesLoad(action$),
		ProgramationEpic.BeneficiariesCount(action$),
		ProgramationEpic.PartnersCount(action$),
		ProgramationEpic.save(action$),
		ProgramationEpic.saveOk(action$),
		ProgramationEpic.load(action$),
	);
}