import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of , empty} from 'rxjs';
import { PRODUCTS_LOAD, productsLoadOk, PRODUCT_SAVE, productSaveOk , PRODUCT_SAVE_OK} from '../actions/products';
import ProductApi from '../../api/product';

class ProductsEpic{
	static load = (action$) =>  action$.pipe(
		ofType(PRODUCTS_LOAD),
		switchMap(() => {
			let filter = {skip:0, where:{active: true}};
			return ProductApi.getAll(filter).pipe(
				map(response => productsLoadOk(response)),
				catchError(error => of(productsLoadOk(error)))
			)
		})
	);
	static save = (action$) =>  action$.pipe(
		ofType(PRODUCT_SAVE),
		switchMap(({payload}) => {
			return ProductApi.post(payload).pipe(
				map(response => productSaveOk(response)),
				catchError(error => of(productSaveOk(error)))
			)
		})
	);
	static saveOk = (action$) =>  action$.pipe(
		ofType(PRODUCT_SAVE_OK),
		switchMap(() => {
			document.location = '/pages/productos';
			return empty();
		})
	);
}
export default function ProductsEpics (action$, store, deps){
	return Observable.merge(
		ProductsEpic.load(action$, store, deps),
		ProductsEpic.save(action$, store, deps),
		ProductsEpic.saveOk(action$, store, deps),
	);
}