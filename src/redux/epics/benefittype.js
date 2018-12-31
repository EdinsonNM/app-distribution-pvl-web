import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { BENEFITTYPE_LOAD, benefittypeLoadOk } from '../actions/benefittype';
import BenefitTypeApi from '../../api/benefittype';

class BenefitTypeEpic{
	static load = (action$) =>  action$.pipe(
		ofType(BENEFITTYPE_LOAD),
		switchMap(() => BenefitTypeApi.getAll().pipe(
			map(response => benefittypeLoadOk(response)),
			catchError(error => of(benefittypeLoadOk(error)))
		))
	);
}
export default function BenefitTypeEpics (action$, store, deps){
	return Observable.merge(
		BenefitTypeEpic.load(action$, store, deps),
	);
}