import qs from 'qs';
import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import {
	ROUTE_PROGRAMATION_DETAIL
} from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';

class ProgramationDetailApi {
	static getAll = (filter) => {
        let url = CustomUrl.getURL(ROUTE_PROGRAMATION_DETAIL, {}) + `${qs.stringify({filter}, { encodeValuesOnly: true })}`;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
	}
	static post = (payload) => {
        let url = CustomUrl.getURL(ROUTE_PROGRAMATION_DETAIL, {});
        return ajax.post(url, payload, HeaderRequest.getPublicRequestHeader());
    }
    static put = (payload) => {
        let url = CustomUrl.getURL(`${ROUTE_PROGRAMATION_DETAIL}/:id`, {id: payload.id});
        return ajax.put(url, payload, HeaderRequest.getPublicRequestHeader());
    }
    static updateWhere = (payload, where) => {
        let url = CustomUrl.getURL(`${ROUTE_PROGRAMATION_DETAIL}/update`, {}) + `${qs.stringify({where}, {  indices: false, encodeValuesOnly: true })}`;
        return ajax.post(url, payload, HeaderRequest.getPublicRequestHeader());
    }
    static delete = (payload) => {
        let url = CustomUrl.getURL(`${ROUTE_PROGRAMATION_DETAIL}/:id`, {id: payload});
        return ajax.delete(url,  HeaderRequest.getPublicRequestHeader());
    }
}
export default ProgramationDetailApi;