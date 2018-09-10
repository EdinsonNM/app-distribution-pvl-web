import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map, mergeMap, tap, finalize } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, concat, forkJoin, empty, from } from 'rxjs';
import {
    INCOMES_LOAD,
    incomesLoadOk,
    INCOME_SAVE,
	incomeSaveOk,
	incomesLoad,
	INCOME_UPDATE,
	incomeUpdateOk,
	INCOME_DELETE,
	incomeDeleteOk,
	incomesLoadProductsOk
} from '../actions/incomes';
import IncomeApi from '../../api/income';
import ProductApi from '../../api/product';
import store from '../../app/store';

class IncomesEpic{
	static incomesLoad = (action$) =>  action$.pipe(
		ofType(INCOMES_LOAD),
		switchMap(({payload}) => IncomeApi.getAll({}).pipe(
			tap(response => store.dispatch(incomesLoadOk(response))),
			mergeMap(response =>
				forkJoin(...response.map(item => 
					ProductApi.get(item.productId)
				))
			),
			map(response => incomesLoadProductsOk(response)),
			catchError(error => of(incomesLoadOk(error)))
		))
	);
	static incomesSave= (action$) =>  action$.pipe(
		ofType(INCOME_SAVE),
		switchMap(({payload}) => IncomeApi.post(payload).pipe(
			mergeMap(response => concat(
				of(incomeSaveOk(response.response)),
				of(incomesLoad())
			)),
			catchError(error => of(incomeSaveOk(error)))
		
		))
	);
	static incomesUpdate= (action$) =>  action$.pipe(
		ofType(INCOME_UPDATE),
		switchMap(({payload}) => IncomeApi.put(payload).pipe(
			mergeMap(response => concat(
				of(incomeUpdateOk(response.response)),
				of(incomesLoad())
			)),
			catchError(error => of(incomeUpdateOk(error)))
		
		))
	);
	static incomesDelete= (action$) =>  action$.pipe(
		ofType(INCOME_DELETE),
		switchMap(({payload}) => IncomeApi.delete(payload).pipe(
			mergeMap(response => concat(
				of(incomeDeleteOk(response.response)),
				of(incomesLoad())
			)),
			catchError(error => of(incomeDeleteOk(error)))
		
		))
	);

}
export default function IncomesEpics(action$){
	return Observable.merge(
			IncomesEpic.incomesLoad(action$),
			IncomesEpic.incomesSave(action$),
			IncomesEpic.incomesUpdate(action$),
			IncomesEpic.incomesDelete(action$),
	);
}