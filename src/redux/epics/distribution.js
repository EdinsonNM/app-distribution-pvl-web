import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map, mergeMap, tap, finalize } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, concat, forkJoin, empty, from } from 'rxjs';
import {
    DISTRIBUTION_COMMITTEES_LOAD,
    distributionCommitteesLoadOk,
    distributionLoadBeneficiariesCount,
    distributionLoadPartnersCount,
    DISTRIBUTION_LOAD_BENEFICIARIES_COUNT,
    DISTRIBUTION_LOAD_PARTNERS_COUNT,
    distributionLoadBeneficiariesCountOk,
    distributionLoadPartnersCountOk,
    DISTRIBUTION_SAVE,
    DISTRIBUTION_SAVE_OK,
    distributionSaveOk,
    distributionsLoad,
    distributionsLoadOk,
    DISTRIBUTIONS_LOAD
} from '../actions/distribution';
import CommitteeApi from '../../api/committee';
import store from '../../app/store';
import DistributionApi from '../../api/distribution';

class DistributionEpic{
	static CommitteesLoad = (action$) =>  action$.pipe(
		ofType(DISTRIBUTION_COMMITTEES_LOAD),
		switchMap(({payload}) => {
			const data = forkJoin(...payload.map(c => 
				CommitteeApi.get(c).pipe(
					tap(response => {
							store.dispatch(distributionLoadBeneficiariesCount(response));
							store.dispatch(distributionLoadPartnersCount(response))
					})
				)
			));
			const request = data.pipe(
				map(r => distributionCommitteesLoadOk(r))
			)
			return request;
		}));
	static BeneficiariesCount= (action$) =>  action$.pipe(
		ofType(DISTRIBUTION_LOAD_BENEFICIARIES_COUNT),
		mergeMap(({payload}) => {
			return CommitteeApi.getBeneficiariesCount(payload).pipe(
				map(response => distributionLoadBeneficiariesCountOk(payload.id, response.count))
			)
		}))

	static PartnersCount= (action$) =>  action$.pipe(
		ofType(DISTRIBUTION_LOAD_PARTNERS_COUNT),
		mergeMap(({payload}) => {
			return CommitteeApi.getPartnersCount(payload).pipe(
				map(response => distributionLoadPartnersCountOk(payload.id, response.count))
			)
	}))

	static save = (action$) =>  action$.pipe(
		ofType(DISTRIBUTION_SAVE),
		switchMap(({payload}) => {
			return DistributionApi.post(payload).pipe(
				map(response => distributionSaveOk(response)),
				catchError(error => of(distributionSaveOk(error)))
			)
		})
	);
	static saveOk = (action$) =>  action$.pipe(
		ofType(DISTRIBUTION_SAVE_OK),
		switchMap(({payload}) => {
			debugger;
			document.location = '/pages/programacion';
			return empty();
		})
	);
	static load = (action$) =>  action$.pipe(
		ofType(DISTRIBUTIONS_LOAD),
		switchMap(() => {
			return DistributionApi.getAll({}).pipe(
				map(response => distributionsLoadOk(response)),
				catchError(error => of(distributionsLoadOk(error)))
			)
		})
	);
}
export default function DistributionEpics(action$){
	return Observable.merge(
		DistributionEpic.CommitteesLoad(action$),
		DistributionEpic.BeneficiariesCount(action$),
		DistributionEpic.PartnersCount(action$),
		DistributionEpic.save(action$),
		DistributionEpic.saveOk(action$),
		DistributionEpic.load(action$),
	);
}