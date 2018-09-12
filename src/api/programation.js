import qs from 'qs';
import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import {
	ROUTE_PROGRAMATION
} from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';

class ProgramationApi {
	static getAll = (filter) => {
        let url = CustomUrl.getURL(ROUTE_PROGRAMATION, {}) + `${qs.stringify({filter}, { encodeValuesOnly: true })}`;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
	}
	static post = (payload) => {
        let url = CustomUrl.getURL(ROUTE_PROGRAMATION, {});
        return ajax.post(url, payload, HeaderRequest.getPublicRequestHeader());
    }
    static put = (payload) => {
        let url = CustomUrl.getURL(`${ROUTE_PROGRAMATION}/:id`, {id: payload.id});
        return ajax.put(url, payload, HeaderRequest.getPublicRequestHeader());
    }
    static delete = (payload) => {
        let url = CustomUrl.getURL(`${ROUTE_PROGRAMATION}/:id`, {id: payload});
        return ajax.delete(url,  HeaderRequest.getPublicRequestHeader());
    }
    static postDetail = (payload) => {
        let url = CustomUrl.getURL(`${ROUTE_PROGRAMATION}/:programationId/programationdetails`, {programationId: payload.programationId});
        return ajax.post(url, payload, HeaderRequest.getPublicRequestHeader());
    }
    static getDetails = (programationId, filter = {}) => {
        let url = CustomUrl.getURL(`${ROUTE_PROGRAMATION}/:programationId/programationdetails`, {programationId})+ `?${qs.stringify({filter}, { encodeValuesOnly: true })}`;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
}
export default ProgramationApi;