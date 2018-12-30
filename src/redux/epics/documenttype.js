import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import DocumentTypeApi from '../../api/documenttype';
import { DOCUMENTTYPE_LOAD, documenttypeLoadOk } from '../actions/documenttype';

class DocumentTypeEpic{
	static load = (action$) =>  action$.pipe(
		ofType(DOCUMENTTYPE_LOAD),
		switchMap(() => DocumentTypeApi.getAll().pipe(
			map(response => documenttypeLoadOk(response)),
			catchError(error => of(documenttypeLoadOk(error)))
		))
	);
}
export default function DocumentTypeEpics (action$, store, deps){
	return Observable.merge(
		DocumentTypeEpic.load(action$, store, deps),
	);
}