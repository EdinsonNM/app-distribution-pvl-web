import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import {PRODUCTS_LOAD, productsLoadOk} from '../actions/products';
import ProductApi from '../../api/product';

class ProductsEpic{
	static load = (action$) =>  action$.pipe(
		ofType(PRODUCTS_LOAD),
		switchMap(() => ProductApi.getAll().pipe(
			map(response => productsLoadOk(response)),
			catchError(error => of(productsLoadOk(error)))
		))
	);
}
export default function ProductsEpics (action$, store, deps){
	return Observable.merge(
		ProductsEpic.load(action$, store, deps),
	);
}