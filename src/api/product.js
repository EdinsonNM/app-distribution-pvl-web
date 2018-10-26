import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import {ROUTE_PRODUCTS} from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';
import qs from 'qs';

class ProductApi{
    static getAll = (filter = {}) => {
        let url = CustomUrl.getURL(ROUTE_PRODUCTS, {})+ `?filter=${JSON.stringify(filter)}`;;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    static get = (id) => {
        let url = CustomUrl.getURL(`${ROUTE_PRODUCTS}/:id`, {id});
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    static post = (payload) => {
        let url = CustomUrl.getURL(ROUTE_PRODUCTS, {});
        return ajax.post(url, payload, HeaderRequest.getPublicRequestHeader());
    }
    static put = (payload) => {
        let url = CustomUrl.getURL(`${ROUTE_PRODUCTS}/:id`, {id: payload.id});
        return ajax.put(url, payload, HeaderRequest.getPublicRequestHeader());
    }
    static delete = (id) => {
        let url = CustomUrl.getURL(`${ROUTE_PRODUCTS}/:id`, {id});
        return ajax.delete(url, HeaderRequest.getPublicRequestHeader());
    }
}

export default ProductApi;