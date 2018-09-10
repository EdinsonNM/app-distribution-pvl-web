import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import {
    ROUTE_INCOME
} from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';
import qs from 'qs';


class IncomeApi {
	static getAll = ({filter, ...payload}) => {
        let url = CustomUrl.getURL(ROUTE_INCOME, payload) + `?${qs.stringify({filter}, { encodeValuesOnly: true })}`;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
	}
	static get = (id) => {
        let url = CustomUrl.getURL(`${ROUTE_INCOME}/:id`, {id});
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
	static post = (payload) => {
        let url = CustomUrl.getURL(ROUTE_INCOME, {});
        return ajax.post(url, payload, HeaderRequest.getPublicRequestHeader());
    }
    static put = (payload) => {
        let url = CustomUrl.getURL(`${ROUTE_INCOME}/:id`, {id: payload.id});
        return ajax.put(url, payload, HeaderRequest.getPublicRequestHeader());
    }
    static delete = (payload) => {
        let url = CustomUrl.getURL(`${ROUTE_INCOME}/:id`, {id: payload});
        return ajax.delete(url,  HeaderRequest.getPublicRequestHeader());
    }
}
export default IncomeApi;