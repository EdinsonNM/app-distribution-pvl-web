import qs from 'qs';
import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import {
	ROUTE_DISTRIBUTION
} from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';

class DistributionApi {
	static getAll = (filter) => {
        let url = CustomUrl.getURL(ROUTE_DISTRIBUTION, {}) + `?${qs.stringify({filter}, { encodeValuesOnly: true })}`;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
	}
	static post = (payload) => {
        let url = CustomUrl.getURL(ROUTE_DISTRIBUTION, {});
        return ajax.post(url, payload, HeaderRequest.getPublicRequestHeader());
    }
    static put = (payload) => {
        let url = CustomUrl.getURL(`${ROUTE_DISTRIBUTION}/:id`, {id: payload.id});
        return ajax.put(url, payload, HeaderRequest.getPublicRequestHeader());
    }
    static delete = (payload) => {
        let url = CustomUrl.getURL(`${ROUTE_DISTRIBUTION}/:id`, {id: payload});
        return ajax.delete(url,  HeaderRequest.getPublicRequestHeader());
    }
}
export default DistributionApi;