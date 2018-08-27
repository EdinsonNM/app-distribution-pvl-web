import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ADDRESSTYPE_LOAD, addresstypeLoadOk } from '../actions/addresstype';
import AddressTypeApi from '../../api/addresstype';

class AddressTypeEpic{
	static load = (action$) =>  action$.pipe(
		ofType(ADDRESSTYPE_LOAD),
		switchMap(() => AddressTypeApi.getAll().pipe(
			map(response => addresstypeLoadOk(response)),
			catchError(error => of(addresstypeLoadOk(error)))
		))
	);
}
export default function AddressTypeEpics (action$, store, deps){
	return Observable.merge(
		AddressTypeEpic.load(action$, store, deps),
	);
}